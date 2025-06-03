// components/FilterSidebar.jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEye, FaStar } from 'react-icons/fa';

const FilterSidebar = ({ 
  filters, 
  onFilterChange, 
  readBooks, 
  favoriteBooks, 
  books 
}) => {
  const currentYear = new Date().getFullYear();
  const genres = ['all', 'action', 'documentary', 'anime'];

  const readBooksList = books.filter(book => readBooks.includes(book._id)); // Changed from book.id
const favoriteBooksList = books.filter(book => favoriteBooks.includes(book._id)); // Changed from book.id
  return (
    <div className="filter-sidebar">
      <h3 className='h-fix'>Filters</h3>

      {/* Fixed Genre Filter */}
      <div className="filter-group">
        <h4 className='h-fix'>Genre</h4>
        <select 
          className="form-select"
          value={filters.genre || 'all'}
          onChange={(e) => onFilterChange({ 
            ...filters, 
            genre: e.target.value === 'all' ? '' : e.target.value 
          })}
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Year Filter with Slider and "All Years" Button */}
      <div className="filter-group">
        <h4 className='h-fix'>Year: {filters.year || 'all'}</h4>
        <input
          type="range"
          className="form-range"
          min="2000"
          max={currentYear}
          value={filters.year || currentYear}
          onChange={(e) => onFilterChange({ ...filters, year: e.target.value })}
        />
        <button
          className="btn btn-primary w-100 mt-2"
          onClick={() => onFilterChange({ ...filters, year: '' })}
        >
          All Years
        </button>
        {/* Clear All Filters */}
      <button
        className="btn btn-danger w-100 mt-3"
        onClick={() => onFilterChange({ genre: '', year: '' })}
      >
        Clear Filters
      </button>
      </div>

      {/* Read Books Section */}
      <div className="filter-group">
        <h4 className='h-fix'>
          <FaEye /> Queue book ({readBooksList.length})
        </h4>
        <ul className="list-group">
          {readBooksList.map(book => (
            <li key={book.id} className="list-group-item small">
              {book.title}
            </li>
          ))}
          {readBooksList.length === 0 && (
            <li className="list-group-item small text-muted">No books read yet</li>
          )}
        </ul>
      </div>

      {/* Favorite Books Section */}
      <div className="filter-group">
        <h4 className='h-fix'>
          <FaStar /> Favorites ({favoriteBooksList.length})
        </h4>
        <ul className="list-group">
          {favoriteBooksList.map(book => (
            <li key={book.id} className="list-group-item small">
              {book.title}
            </li>
          ))}
          {favoriteBooksList.length === 0 && (
            <li className="list-group-item small text-muted">No favorites yet</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;