// components/CategorySidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
const CategorySidebar = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { id: 'all', name: 'All Books' },
    { id: 'adult', name: 'Adult' },
    { id: 'kids', name: 'Kids' }
  ];

  return (
    <div className="category-sidebar">
      <h3 className='h-fix'>Categories</h3>
      <ul className='h-fix'>
        {categories.map(category => (
          <li 
            key={category.id}
            className={selectedCategory === category.id ? 'active' : ''}
            onClick={() => onSelectCategory(category.id)}
          >
            {category.name}
          </li>
        ))}
      
        {/**this link for addmin setting 
        <li>
          <Link to="/admin/books" className="admin-link">
            Manage Books (Admin)
          </Link>
        </li>*/}
      </ul>
    </div>
  );
};

export default CategorySidebar;