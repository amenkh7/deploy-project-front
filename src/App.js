import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Auth Components
import Register from "./components/Register";
import VerifyUser from "./components/VerifyUser";
import Login from "./components/Login";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

// User Components
import GetAllUsers from "./components/GetAllUsers";
import UserDetails from "./components/UsersDetails";
import UpdateUser from "./components/UpdateUser"; // admin
import UpdateUser1 from "./components/UpdateUser1"; // user
import Settings from "./components/Settings";
import UpdateInfo from "./components/UpdateInfo";
import UpdatePassword from "./components/UpdatePassword";

// Book Components
import { getAllBooks } from "./services/bookService";
import CategorySidebar from "./components/CategorySidebar";
import BookList from "./components/BookList";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import BookDetail from "./components/BookDetail";
import BookReaderPage from "./components/BookReaderPage";

// Admin Book Components
import AdminBooksPage from "./components/AdminBooksPage";
import AddBookForm from "./components/AddBookForm";
import EditBookForm from "./components/EditBookForm";

// Layout Components
import Navbar from "./NavBar";
import Navbar1 from "./NavBar1";
import Home from "./components/Home";
import { deleteUser } from "./api/userService";

function App() {
  const navigate = useNavigate();
  
  // Book states
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
  });

  // Theme and user preferences
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  const [readBooks, setReadBooks] = useState(() => {
    const saved = localStorage.getItem("readBooks");
    return saved ? JSON.parse(saved) : [];
  });
  const [favoriteBooks, setFavoriteBooks] = useState(() => {
    const saved = localStorage.getItem("favoriteBooks");
    return saved ? JSON.parse(saved) : [];
  });

  // User states
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState(
    !JSON.parse(sessionStorage.getItem("user"))
      ? "visitor"
      : JSON.parse(sessionStorage.getItem("user")).role
  );

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("readBooks", JSON.stringify(readBooks));
  }, [readBooks]);

  useEffect(() => {
    localStorage.setItem("favoriteBooks", JSON.stringify(favoriteBooks));
  }, [favoriteBooks]);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        const booksWithStatus = data.map((book) => ({
          ...book,
          read: readBooks.includes(book._id),
          favorite: favoriteBooks.includes(book._id),
        }));
        setBooks(booksWithStatus);
        setFilteredBooks(booksWithStatus);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [readBooks, favoriteBooks]);

  // Filter books
  useEffect(() => {
    let result = books;

    if (selectedCategory !== "all") {
      result = result.filter(
        (book) => book.category.toLowerCase() === selectedCategory
      );
    }

    if (filters.genre) {
      result = result.filter(
        (book) => book.generation.toLowerCase() === filters.genre.toLowerCase()
      );
    }

    if (filters.year) {
      result = result.filter((book) => book.year.toString() === filters.year);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.description.toLowerCase().includes(term)
      );
    }

    setFilteredBooks(result);
  }, [books, selectedCategory, filters, searchTerm]);

  // Helper functions
  const handleBackToList = () => navigate("/");
  
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const toggleReadStatus = (bookId) => {
    setReadBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const toggleFavoriteStatus = (bookId) => {
    setFavoriteBooks((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Main render
  return (
    <div className={`app ${theme}`}>
      {role === "admin" ? <Navbar /> : <Navbar1 />}

      <Routes>
        {/* Auth Routes */}
        <Route path="/register" element={<Register setUserEmail={setUserEmail} />} />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/verify" element={<VerifyUser email={userEmail} />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        {/* User Routes */}
        <Route path="/users" element={<GetAllUsers onDelete={handleDelete} />} />
        <Route path="/users/updateUser/:userId" element={<UpdateUser />} />
        <Route path="/users/details/:userId" element={<UserDetails />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/updateInfo" element={<UpdateInfo />} />
        <Route path="/changePassword" element={<UpdatePassword />} />
        <Route path="/login/updateUser1/:userId" element={<UpdateUser1 />} />

        {/* Book Routes */}
        <Route path="/" element={
          <BookLayout 
            theme={theme}
            toggleTheme={toggleTheme}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredBooks={filteredBooks}
            navigate={navigate}
            toggleReadStatus={toggleReadStatus}
            toggleFavoriteStatus={toggleFavoriteStatus}
            filters={filters}
            setFilters={setFilters}
            readBooks={readBooks}
            favoriteBooks={favoriteBooks}
            books={books}
          />
        } />
        <Route path="/home" element={<Home />} />
        <Route path="/home1" element={<Home />} />
        
        <Route path="/book/:id" element={
          <BookDetailLayout 
            theme={theme}
            toggleTheme={toggleTheme}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            handleBackToList={handleBackToList}
            filters={filters}
            setFilters={setFilters}
            readBooks={readBooks}
            favoriteBooks={favoriteBooks}
            books={books}
          />
        } />

        <Route path="/reader" element={
          <ReaderLayout 
            theme={theme}
            toggleTheme={toggleTheme}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            handleBackToList={handleBackToList}
            filters={filters}
            setFilters={setFilters}
            readBooks={readBooks}
            favoriteBooks={favoriteBooks}
            books={books}
          />
        } />

        {/* Admin Routes */}
        <Route path="/Book" element={<AdminBooksPage />} />
        <Route path="/admin/add-book" element={<AddBookForm />} />
        <Route path="/admin/edit-book" element={<EditBookForm />} />
      </Routes>
    </div>
  );
}

// Layout components for better organization
const BookLayout = ({
  theme,
  toggleTheme,
  selectedCategory,
  setSelectedCategory,
  searchTerm,
  setSearchTerm,
  filteredBooks,
  navigate,
  toggleReadStatus,
  toggleFavoriteStatus,
  filters,
  setFilters,
  readBooks,
  favoriteBooks,
  books
}) => (
  <>
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
    <div className="app-container">
      <div className="sidebar left">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="main-content">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <BookList
          books={filteredBooks}
          onSelectBook={(book) => navigate(`/book/${book.id}`, { state: { book } })}
          onToggleRead={toggleReadStatus}
          onToggleFavorite={toggleFavoriteStatus}
        />
      </div>
      <div className="sidebar right">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          readBooks={readBooks}
          favoriteBooks={favoriteBooks}
          books={books}
        />
      </div>
    </div>
  </>
);

const BookDetailLayout = ({
  theme,
  toggleTheme,
  selectedCategory,
  setSelectedCategory,
  handleBackToList,
  filters,
  setFilters,
  readBooks,
  favoriteBooks,
  books
}) => (
  <>
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
    <div className="app-container">
      <div className="sidebar left">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="main-content">
        <BookDetail onBack={handleBackToList} />
      </div>
      <div className="sidebar right">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          readBooks={readBooks}
          favoriteBooks={favoriteBooks}
          books={books}
        />
      </div>
    </div>
  </>
);

const ReaderLayout = ({
  theme,
  toggleTheme,
  selectedCategory,
  setSelectedCategory,
  handleBackToList,
  filters,
  setFilters,
  readBooks,
  favoriteBooks,
  books
}) => (
  <>
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
    <div className="app-container">
      <div className="sidebar left">
        <CategorySidebar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>
      <div className="main-content">
        <BookReaderPage onBack={handleBackToList} />
      </div>
      <div className="sidebar right">
        <FilterSidebar
          filters={filters}
          onFilterChange={setFilters}
          readBooks={readBooks}
          favoriteBooks={favoriteBooks}
          books={books}
        />
      </div>
    </div>
  </>
);

export default App;