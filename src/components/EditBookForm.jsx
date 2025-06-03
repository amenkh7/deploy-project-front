import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { updateBook } from '../services/bookService';

const EditBookForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const book = state?.book;

  const [formDataState, setFormDataState] = useState({
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
  const generationOptions = ['action', 'documentary', 'anime'];

  useEffect(() => {
    if (book) {
      setFormDataState({
        title: book.title || '',
        description: book.description || '',
        author: book.author || '',
        category: book.category || '',
        generation: book.generation || '',
        year: book.year || ''
      });
    } else {
      navigate('/admin/books');
    }
  }, [book, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataState(prev => ({ ...prev, [name]: value }));
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
      // Création du FormData à envoyer
      const data = new FormData();

      // Append form fields
      for (const key in formDataState) {
        data.append(key, formDataState[key]);
      }

      // Append old cover and livre paths so backend can keep if no new files uploaded
      data.append('oldCover', book.cover);
      data.append('oldLivre', book.livre);

      // Append files if exist
      if (files.cover) data.append('cover', files.cover);
      if (files.livre) data.append('livre', files.livre);

      // Appel API
      await updateBook(book._id, data);

      // Après mise à jour, retour à la liste
      navigate('/book');
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Erreur inconnue');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!book) return null;

  return (
    <div className="bg-dark min-vh-100">
    <div className="container py-4 text-light">
      <h1 className="mb-4">Edit Book</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control bg-secondary text-light border-dark"
              name="title"
              value={formDataState.title}
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
              value={formDataState.author}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label className="form-label">Description</label>
            <textarea
              className="form-control bg-secondary text-light border-dark"
              name="description"
              value={formDataState.description}
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
              value={formDataState.category}
              onChange={handleChange}
              required
            >
              <option value="adult">Adult</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Generation</label>
            <select
              className="form-select bg-secondary text-light border-dark"
              name="generation"
              value={formDataState.generation}
              onChange={handleChange}
              required
            >
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
              value={formDataState.year}
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
            />
            <small className="text-muted">Current: {book.cover.split('/').pop()}</small>
          </div>

          <div className="col-md-6">
            <label className="form-label">Book File (PDF)</label>
            <input
              type="file"
              className="form-control bg-secondary text-light border-dark"
              name="livre"
              onChange={handleFileChange}
              accept=".pdf"
            />
            <small className="text-muted">Current: {book.livre.split('/').pop()}</small>
          </div>

          <div className="col-12 mt-4">
            <button
              type="submit"
              className="btn btn-primary me-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Updating...' : 'Update Book'}
            </button>
            <button
              type="button"
              className="btn btn-outline-light"
              onClick={() => navigate(-1)}
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

export default EditBookForm;
