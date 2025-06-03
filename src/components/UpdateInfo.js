import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUser, getCurrentUser } from "../api/userService"; // Ensure `getCurrentUser` is imported
import { AuthContext } from "./AuthContext";

const UpdateInfo = () => {
  const { user, setUser, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    const fetchUserData = async () => {
      try {
        const currentUser = await getCurrentUser(user._id);
        if (currentUser) {
          setUser(currentUser);
          setFullName(currentUser.fullName || "");
          setEmail(currentUser.email || "");
          setMobile(currentUser.mobile || "");
          setAddress(currentUser.address || "");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user && user._id) {
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setMobile(user.mobile || "");
      setAddress(user.address || "");
    } else {
      fetchUserData();
    }
  }, [isLoggedIn, navigate, user, setUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = {
      fullName,
      email,
      mobile,
      address,
    };

    try {
      setLoading(true);
      const response = await updateUser(user._id, updatedUser);

      setUser(response);

      setMessage("User updated successfully!");
      setTimeout(() => {
        navigate("/settings");
      }, 1000);
    } catch (error) {
      setMessage("Error updating user.");
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headerStyle}>Update Your Information</h2>

        {message && <div style={messageStyle}>{message}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={inputStyle}
        />

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Updating..." : "Update"}
        </button>
        <button
          type="button"
          onClick={() => navigate("/settings")}
          style={backButtonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#ff6347")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4500")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  background: "linear-gradient(to right, #141e30, #243b55)",
  padding: "20px",
};

const formStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  padding: "30px",
  borderRadius: "15px",
  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
  color: "wheat",
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const headerStyle = {
  fontSize: "24px",
  marginBottom: "15px",
  fontWeight: "700",
};

const inputStyle = {
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  fontSize: "16px",
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "wheat",
  width: "100%",
  textAlign: "center",
};

const buttonStyle = {
  backgroundColor: "#4CAF50",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

const messageStyle = {
  color: "#28a745",
  backgroundColor: "#d4edda",
  padding: "12px",
  borderRadius: "8px",
  textAlign: "center",
  fontSize: "14px",
  border: "1px solid #c3e6cb",
};
const backButtonStyle = {
  backgroundColor: "#ff4500",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};
export default UpdateInfo;
