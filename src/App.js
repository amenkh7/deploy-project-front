import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Register from "./components/Register";
import VerifyUser from "./components/VerifyUser";
import Login from "./components/Login";
import GetAllUsers from "./components/GetAllUsers";
import Home from "./components/Home";
import Navbar from "./NavBar";
import Navbar1 from "./NavBar1";
import UpdateUser from "./components/UpdateUser"; //admin
import UpdateUser1 from "./components/UpdateUser1"; //user
import { deleteUser } from "./api/userService";
import UserDetails from "./components/UsersDetails";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";
import Settings from "./components/Settings";
import UpdateInfo from "./components/UpdateInfo";
import UpdatePassword from "./components/UpdatePassword";
//importation books(me)
import { getAllBooks } from "./services/bookService";
import CategorySidebar from "./components/CategorySidebar";
import BookList from "./components/BookList";
import FilterSidebar from "./components/FilterSidebar";
import SearchBar from "./components/SearchBar";
import BookDetail from "./components/BookDetail";
import BookReaderPage from "./components/BookReaderPage";
//admin config(add,get,update and delete)
import AdminBooksPage from "./components/AdminBooksPage";
import AddBookForm from "./components/AddBookForm";
import EditBookForm from "./components/EditBookForm";
//end here imoport for admin config
function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
  });
  const navigate = useNavigate();
  // Initialize state from localStorage
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

  // Save to localStorage when state changes
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

  // Fetch books and merge with saved status
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getAllBooks();
        const booksWithStatus = data.map((book) => ({
          ...book,
          read: readBooks.includes(book._id), // Make sure we're using the correct ID field
          favorite: favoriteBooks.includes(book._id), // Make sure we're using the correct ID field
        }));
        setBooks(booksWithStatus);
        setFilteredBooks(booksWithStatus);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, [readBooks, favoriteBooks]);

  // Filter books based on category, filters and search term
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

  const handleBackToList = () => {
    setSelectedBook(null);
    navigate("/");
  };

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

  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState(
    !JSON.parse(sessionStorage.getItem("user"))
      ? "visitor"
      : JSON.parse(sessionStorage.getItem("user")).role
  );

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!loading)
    //change le deffirent pour affichier le fenetre login
    return <div className="text-light text-center mt-5">Loading books...</div>;
  if (error)
    return <div className="text-light text-center mt-5">Error: {error}</div>;
  //pdf

  return (
    <div>
      {role === "admin" ? <Navbar /> : <Navbar1 />}

      <Routes>
        <Route
          path="/register"
          element={<Register setUserEmail={setUserEmail} />}
        />
        <Route path="/login" element={<Login setRole={setRole} />} />
        <Route path="/verify" element={<VerifyUser email={userEmail} />} />
        <Route path="/home1" element={<Home />} />
        <Route
          path="/"
          element={
            <>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
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
                  onSelectBook={(book) =>
                    navigate(`/book/${book.id}`, { state: { book } })
                  }
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
          }
        />
        <Route
          path="/home"
          element={
            <>
            <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
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
                    onSelectBook={(book) =>
                      navigate(`/book/${book.id}`, { state: { book } })
                    }
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
          }
        />
        <Route
          path="/users"
          element={<GetAllUsers onDelete={handleDelete} />}
        />
        <Route path="/users/updateUser/:userId" element={<UpdateUser />} />
        <Route path="/users/details/:userId" element={<UserDetails />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/updateInfo" element={<UpdateInfo />} />
        <Route path="/changePassword" element={<UpdatePassword />} />
        <Route path="/login/updateUser1/:userId" element={<UpdateUser1 />} />
      </Routes>
      {/*pour affichier le meun de user
      {role === "admin" ? (
        <></>
      ) : ( */}

      <Routes>
        <Route
          path="/reader"
          element={
            <>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
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
          }
        />
        {/**admin routes for config */}
        <Route path="/Book" element={<AdminBooksPage />} />
        <Route path="/admin/add-book" element={<AddBookForm />} />
        <Route path="/admin/edit-book" element={<EditBookForm />} />

        <Route
          path="/book/:id"
          element={
            <>
              <button
                onClick={toggleTheme}
                className="theme-toggle"
                aria-label={`Switch to ${
                  theme === "light" ? "dark" : "light"
                } mode`}
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
          }
        />

        <Route
          path="/Book1"
          element={
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
                  onSelectBook={(book) =>
                    navigate(`/book/${book.id}`, { state: { book } })
                  }
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
          }
        />
      </Routes>
    </div>
  );
}

export default App;
