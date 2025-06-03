// components/BookList.jsx
import React from 'react';
import BookCard from './BookCard';

const BookList = ({ books, onSelectBook, onToggleRead, onToggleFavorite }) => {
  return (
    <div className="book-list">
      {books.length > 0 ? (
        books.map(book => (
          <BookCard 
            key={book._id} 
            book={book} 
            onSelectBook={onSelectBook}
            onToggleRead={onToggleRead}
            onToggleFavorite={onToggleFavorite}
          />
        ))
      ) : (
        <p>No books found matching your criteria.</p>
      )}
    </div>
  );
};

export default BookList;