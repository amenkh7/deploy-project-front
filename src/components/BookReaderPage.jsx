import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

// Configure PDF.js worker path
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const BookReaderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);

  if (!book) {
    return <div className="text-center py-5 no-book-found">Book not found</div>;
  }
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset) => {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  };

  const zoomIn = () => {
    setScale(prevScale => Math.min(prevScale + 0.25, 3.0));
  };

  const zoomOut = () => {
    setScale(prevScale => Math.max(prevScale - 0.25, 0.5));
  };
  console.log("rima pdf ",book.livre);
  return (
    <div className="book-reader-container">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-outline-secondary mb-4 back-button"
      >
        ← Back to Book
      </button>
      
      <div className="reader-header">
        <h1 className="reader-title">{book.title}</h1>
        <h3 className="reader-author">by {book.author}</h3>
      </div>
      
      <div className="reader-content">
        <div className="pdf-controls mb-3">
        <button 
          onClick={() => changePage(-1)} 
          disabled={pageNumber <= 1}
          className="btn btn-sm btn-outline-primary me-2"
        >
          Previous
        </button>
        <span className="me-2">
          Page {pageNumber} of {numPages || '--'}
        </span>
        <button 
          onClick={() => changePage(1)} 
          disabled={pageNumber >= (numPages || 0)}
          className="btn btn-sm btn-outline-primary me-2"
        >
          Next
        </button>
        <button 
          onClick={zoomOut}
          disabled={scale <= 0.5}
          className="btn btn-sm btn-outline-secondary me-2"
        >
          Zoom Out
        </button>
        <button 
          onClick={zoomIn}
          disabled={scale >= 1.2}
          className="btn btn-sm btn-outline-secondary me-2"
        >
          Zoom In
        </button>
        {/*pour le livre dans le pdf alors meme lieu de backend */}
        <a 
    href={`https://deploy-project-back.onrender.com/${book.livre}`} 
    download 
    target="_blank" 
    rel="noopener noreferrer"
    className="btn btn-sm btn-success"
  >
    📥 
  </a>
      </div>
        {book.livre ? (
          <div className="pdf-viewer-container">
            <Document
              file={`https://deploy-project-back.onrender.com/${book.livre}`}             
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<div>Loading PDF...</div>}
              error={<div>Failed to load PDF.</div>}
            >
              <Page 
                pageNumber={pageNumber} 
                scale={scale}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          </div>
        ) : (
          <div className="no-content">
            <p>No PDF content available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookReaderPage;