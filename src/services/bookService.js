// this is where to get data from back_end
import axios from "axios";
const API_URL = "https://deploy-project-back.onrender.com/books";
const API_URL2 = "https://deploy-project-back.onrender.com/mybooks";
//Get All Bokks
export const getAllBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data ? response.data.books : [];
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};
//Get Only One Book
export const getBookById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
};
//first methode
export const addBook = async (bookData, files) => {
  try {
    const formData = new FormData();

    // Append book data to formData
    Object.keys(bookData).forEach((key) => {
      formData.append(key, bookData[key]);
    });

    // Append files to formData
    if (files.cover) {
      formData.append("cover", files.cover);
    }
    if (files.livre) {
      formData.append("livre", files.livre);
    }

    const response = await axios.post(`${API_URL}/addbook`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding book:", error);
    throw error;
  }
};

export const updateBook = async (bookId, formData) => {
  // bookId en paramètre URL, formData en corps (multipart/form-data)
  const response = await axios.post(`${API_URL2}/update/${bookId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete a book - updated to use GET as per your backend route
export const deleteBook = async (id) => {
  try {
    console.log("[DEBUG] Attempting to delete book ID:", id); // Debug log
    const response = await axios.get(`${API_URL2}/delete/${id}`);
    console.log("[DEBUG] Delete response:", response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error("[DEBUG] Delete error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
};
/*
// Add a new book
export const addBook = async (bookData, files) => {
  const formData = new FormData();
  
  // Add text fields
  formData.append('title', bookData.title);
  formData.append('description', bookData.description);
  formData.append('author', bookData.author);
  formData.append('category', bookData.category);
  formData.append('generation', bookData.generation);
  formData.append('year', bookData.year);
  
  // Add files
  formData.append('cover', files.cover);
  formData.append('livre', files.livre);

  try {
    const response = await axios.post(`${API_URL}/addbook`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Update a book
export const updateBook = async (bookId, bookData, files) => {
  const formData = new FormData();
  
  // Add text fields
  formData.append('bookId', bookId);
  formData.append('title', bookData.title);
  formData.append('description', bookData.description);
  formData.append('author', bookData.author);
  formData.append('category', bookData.category);
  formData.append('generation', bookData.generation);
  formData.append('year', bookData.year);
  
  // Add files if they exist
  if (files.cover) formData.append('cover', files.cover);
  if (files.livre) formData.append('livre', files.livre);

  try {
    const response = await axios.post(`${API_URL}/mybooks/update`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete a book
export const deleteBook = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/mybooks/delete/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};*/
