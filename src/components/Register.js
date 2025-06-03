import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register({ setUserEmail }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    address: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userId, setUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        setError("Please upload a valid image file (JPEG, PNG, GIF).");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("File size exceeds 5 MB limit.");
        return;
      }
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { fullName, email, password, confirmPassword, mobile, address } =
      formData;

    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !mobile ||
      !address
    ) {
      setError("All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );
      setMessage("Registration successful. Now upload your profile image.");
      setUserId(res.data.user._id);
      setUserEmail(email);
      setShowModal(true); // Afficher le modal
    } catch (err) {
      setError(err.response?.data?.error || "Error during registration.");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setMessage("Please select an image first.");
      return;
    }

    const formDataImg = new FormData();
    formDataImg.append("profileImage", image);

    try {
      const res = await fetch(
        `http://localhost:5000/api/users/uploadImage/${userId}`,
        {
          method: "POST",
          body: formDataImg,
        }
      );

      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${data.message}`);
        setShowModal(false); // Fermer le modal après succès
        navigate("/verify");
      } else {
        setMessage(`❌ ${data.error || "Upload failed."}`);
      }
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ An error occurred while uploading the image.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/11111.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        overflow: "hidden",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "450px",
          padding: "30px",
          borderRadius: "15px",
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2 style={{ textAlign: "center", color: "wheat" }}>
          Create Your Account
        </h2>

        {(error || message) && (
          <div
            style={{
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
              color: error ? "#721c24" : "#155724",
              backgroundColor: error ? "#f8d7da" : "#d4edda",
              border: `1px solid ${error ? "#f5c6cb" : "#c3e6cb"}`,
            }}
          >
            {error || message}
          </div>
        )}

        {["fullName", "email", "mobile", "address"].map((field) => (
          <input
            key={field}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            value={formData[field]}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        ))}

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={iconStyle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div style={{ position: "relative" }}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />
          <span
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            style={iconStyle}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" style={buttonStyle}>
          Register
        </button>
      </form>

      {/* 🔽 Modal Bootstrap pour l’upload d’image */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "center" }}>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {imagePreview && (
            <div style={{ marginTop: "1rem" }}>
              <img src={imagePreview} alt="Preview" width="150" />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const inputStyle = {
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  outline: "none",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "10px",
  border: "none",
  backgroundColor: "#007bff",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

const iconStyle = {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  color: "#007bff",
  fontSize: "20px",
};
