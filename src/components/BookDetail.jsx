import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BookDetail = ({ onBack }) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;
  
  if (!book) {
    return <div className="text-center py-5">Book not found</div>;
  }
const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/50x75?text=No+Cover';
    if (path.startsWith('http')) return path;
    return `${process.env.REACT_APP_API_BASE_URL || 'https://deploy-project-back.onrender.com/'}/${path}`;
  };
  return (
    <div className="book-detail-container">
      <button 
        onClick={() => navigate(-1)} 
        className="btn btn-outline-secondary mb-4 back-button"
      >
        ← Back to Books
      </button>
      
      <div className="book-detail-card">
        <div className="book-detail-image">
          <img 
            src={getImageUrl(book.cover)} 
            alt={book.title}
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://via.placeholder.com/300x450?text=No+Cover';
            }}
          />
        </div>
        <div className="book-detail-info">
          <h2 className="book-title">{book.title}</h2>
          <h3 className="book-author">{book.author}</h3>
          <div className="book-meta">
            <span className="badge bg-info">{book.genre}</span>
            <span className="book-year">{book.year}</span>
          </div>
          <div className="book-description-container mb-4">
            <p className="book-description" style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              whiteSpace: 'pre-line',
              maxWidth:'700px',
            }}>
              {book.description || 'No description available'}
            </p>
          </div>
          <div className="book-actions">
            <button 
              onClick={() => navigate('/reader', { state: { book } })}
              className="btn btn-success read-button"
            >
              Read Now
            </button>
            
            <button
              href={book.livre} 
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary download-button"
              onClick={() => window.open(
                  book.livre.startsWith('http') 
                    ? book.livre 
                    : `http://localhost:5000/${encodeURIComponent(book.livre).replace(/%2F/g, '/')}`,
                  '_blank'
                )}
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;