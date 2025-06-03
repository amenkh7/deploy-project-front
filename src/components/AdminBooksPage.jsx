import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBooks, deleteBook } from '../services/bookService';
import { FaEdit, FaTrash, FaPlus, FaHome } from 'react-icons/fa';

const AdminBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState('title');
  const navigate = useNavigate();

  // Fonction globale pour récupérer les livres
  const fetchBooks = async () => {
    try {
      const data = await getAllBooks();
      setBooks(data);
      setFilteredBooks(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const filtered = books.filter(book =>
        book[searchBy]?.toString().toLowerCase().includes(term)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books, searchBy]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const result = await deleteBook(id);
        if (result.message) {
          await fetchBooks();
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Delete failed');
      }
    }
  };

  const handleEdit = (book) => {
    navigate('/admin/edit-book', { state: { book } });
  };

  const handleAddBook = () => {
    navigate('/admin/add-book');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/50x75?text=No+Cover';
    if (path.startsWith('http')) return path;
    return `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/${path}`;
  };

  if (loading) return <div className="text-center py-5" style={{ color: '#e0e0e0' }}>Loading...</div>;
  if (error) return <div className="text-center py-5 text-danger">Error: {error}</div>;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#1e1e1e",
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
        color: "#e0e0e0",
      }}
    >
      <div
        style={{
          background: "#2a2a2a",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <h2
          style={{
            marginBottom: "40px",
            fontWeight: "600",
            fontSize: "24px",
            color: "#ffffff",
            textAlign: "center",
            flex: 1,
          }}
        >
          Books Management
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <button
            onClick={handleBackToHome}
            style={{
              padding: "8px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#4CAF50",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            <FaHome /> Home
          </button>

          <button
            onClick={handleAddBook}
            style={{
              backgroundColor: "#4CAF50",
              color: "#fff",
              borderRadius: "6px",
              padding: "10px 16px",
              fontSize: "16px",
              transition: "0.3s",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
          >
            <FaPlus /> Add Book
          </button>
        </div>

        <div className="mb-4 d-flex align-items-center">
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #3a3a3a",
              flex: 1,
              marginRight: "10px",
              background: "#1e1e1e",
              color: "#e0e0e0",
            }}
          />
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #3a3a3a",
              backgroundColor: "#1e1e1e",
              color: "#e0e0e0",
            }}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="category">Category</option>
            <option value="generation">Generation</option>
            <option value="year">Year</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Generation</th>
                <th>Year</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length > 0 ? (
                filteredBooks.map(book => (
                  <tr key={book._id}>
                    <td>
                      <img
                        src={getImageUrl(book.cover)}
                        alt={book.title}
                        style={{
                          width: '50px',
                          height: '75px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/50x75?text=No+Cover';
                        }}
                      />
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.generation}</td>
                    <td>{book.year}</td>
                    <td>
                      <button
                        style={{
                          backgroundColor: "#FFA500",
                          color: "#fff",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          fontSize: "14px",
                          transition: "0.3s",
                          border: "none",
                          marginRight: "8px",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                        onClick={() => handleEdit(book)}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#e69500")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#FFA500")}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        style={{
                          backgroundColor: "#d9534f",
                          color: "#fff",
                          borderRadius: "6px",
                          padding: "6px 12px",
                          fontSize: "14px",
                          transition: "0.3s",
                          border: "none",
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                        onClick={() => handleDelete(book._id)}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#c9302c")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#d9534f")}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    {searchTerm ? 'No books match your search' : 'No books available'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBooksPage;
