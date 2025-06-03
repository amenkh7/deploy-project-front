import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/bookService';

const AddBookForm = () => {
  const generationOptions = ['action', 'documentary', 'anime'];
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: '',
    category: '',
    generation: '',
    year: ''
  });
  const [files, setFiles] = useState({
    cover: null,
    livre: null
  });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files: fileList } = e.target;
    setFiles(prev => ({ ...prev, [name]: fileList[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await addBook(formData, files);
      navigate('/book');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark min-vh-100">
      <div className="container py-4 text-light">
        <h1 className="mb-4">Add New Book</h1>
        
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control bg-secondary text-light border-dark"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Author</label>
              <input
                type="text"
                className="form-control bg-secondary text-light border-dark"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea
                className="form-control bg-secondary text-light border-dark"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
              />
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Category</label>
              <select
                className="form-select bg-secondary text-light border-dark"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="adult">Adult</option>
                <option value="kids">Kids</option>
              </select>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Generation</label>
              <select
                className="form-select bg-secondary text-light border-dark"
                name="generation"
                value={formData.generation}
                onChange={handleChange}
                required
              >
                <option value="">Select Generation</option>
                {generationOptions.map(option => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="col-md-4">
              <label className="form-label">Year</label>
              <input
                type="number"
                className="form-control bg-secondary text-light border-dark"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Cover Image</label>
              <input
                type="file"
                className="form-control bg-secondary text-light border-dark"
                name="cover"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
            </div>
            
            <div className="col-md-6">
              <label className="form-label">Book File (PDF)</label>
              <input
                type="file"
                className="form-control bg-secondary text-light border-dark"
                name="livre"
                onChange={handleFileChange}
                accept=".pdf"
                required
              />
            </div>
            
            <div className="col-12 mt-4">
              <button 
                type="submit" 
                className="btn btn-primary me-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add Book'}
              </button>
              <button 
                type="button" 
                className="btn btn-outline-light"
                onClick={() => navigate('/book')}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookForm;