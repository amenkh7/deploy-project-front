// components/BookCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaRegStar, FaStar } from 'react-icons/fa';

const BookCard = ({ book, onSelectBook, onToggleRead, onToggleFavorite }) => {
  const navigate = useNavigate();
  
  const handleReadClick = (e) => {
    e.stopPropagation();
    navigate('/reader', { state: { book } });
  };

  const handleImageClick = (e) => {
    e.stopPropagation();
    onSelectBook(book);
  };
  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/50x75?text=No+Cover';
    if (path.startsWith('http')) return path;
    return `${process.env.REACT_APP_API_BASE_URL || 'https://deploy-project-back.onrender.com/'}/${path}`;
  };

  return (
    <div className="book-card">
      <div className="book-image-container" onClick={handleImageClick}>
        <img 
          src={getImageUrl(book.cover)} 
          alt={book.title} 
          className="book-image w-100"
          style={{ backgroundColor: 'var(--card-bg)' }}
        />
      </div>
      
      <div className="book-info p-3">
        <h3 className="h5">{book.title}</h3>
        <p className="author small mb-2">{book.author}</p>
        <p className="description small mb-2">
          {book.description ? 
            (book.description.length > 30 ? 
              `${book.description.substring(0, 30)}...` : 
              book.description
            ) : 
            'No description available'
          }
        </p>
      </div>
      
      <div className="meta d-flex justify-content-between small mb-2 px-3">
        <span className="genre">{book.genre}</span>
        <span className="year">{book.year}</span>
      </div>
      
      <div className="d-flex gap-2 px-3 pb-2">
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleRead(book._id);
          }}
          className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center ${
            book.read ? 'btn-success' : 'btn-outline-success'
          }`}
          style={{
            width: '40%',
            padding: '0.5rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            minHeight: '38px'
          }}
        >
          <FaEye className="me-1" /> 
          <span>{book.read ? 'Forget' : 'Queue'}</span>
        </button>
        
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(book._id);
          }}
          className={`btn btn-sm flex-grow-1 d-flex align-items-center justify-content-center ${
            book.favorite ? 'btn-warning' : 'btn-outline-secondary'
          }`}
          style={{
            width: '40%',
            padding: '0.5rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            minHeight: '38px'
          }}
        >
          {book.favorite ? <FaStar /> : <FaRegStar />} Favorite
        </button>
      </div>
      
      <div className="d-flex gap-2 px-3 pb-3">
        <button 
          onClick={handleReadClick}
          className="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
          style={{
            width: '40%',
            padding: '0.5rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            minHeight: '38px',
            textDecoration: 'none'
          }}
        >
          Read It
        </button>
        <button 
          href={book.livre} 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-outline-primary btn-sm flex-grow-1 d-flex align-items-center justify-content-center"
          style={{
            width: '40%',
            padding: '0.5rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            minHeight: '38px',
            textDecoration: 'none'
          }}
          onClick={() => window.open(
            book.livre.startsWith('http') 
              ? book.livre 
              : `http://localhost:5000/${encodeURIComponent(book.livre).replace(/%2F/g, '/')}`,
            '_blank'
          )}
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default BookCard;