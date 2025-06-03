import React, { useState } from "react";
import { verifyUser } from "../api/userService";
import { useNavigate } from "react-router-dom";

const VerifyUser = ({ email }) => {
  const [verifyCode, setVerifyCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleVerify = async () => {
    setLoading(true);
    if (!verifyCode) {
      setMessage("Please enter the verification code.");
      setLoading(false);
      return;
    }

    try {
      const response = await verifyUser(verifyCode, email);
      setMessage(response.message);
      navigate("/login");
    } catch (error) {
      setMessage(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/11111.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          maxWidth: "450px",
          width: "100%",
          margin: "20px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "wheat",
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: "700",
            letterSpacing: "-0.5px",
          }}
        >
          Verify Your Account
        </h2>

        {message && (
          <div
            style={{
              color: message.includes("Error") ? "#721c24" : "#28a745",
              backgroundColor: message.includes("Error")
                ? "#f8d7da"
                : "#d4edda",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
              border: message.includes("Error")
                ? "1px solid #f5c6cb"
                : "1px solid #c3e6cb",
            }}
          >
            {message}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verifyCode}
            onChange={(e) => setVerifyCode(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
              outline: "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#007bff";
              e.target.style.boxShadow = "0 0 8px rgba(0, 123, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ddd";
              e.target.style.boxShadow = "none";
            }}
          />
        </div>

        <button
          type="button"
          onClick={handleVerify}
          disabled={loading}
          style={{
            padding: "14px",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "background 0.3s, transform 0.2s",
            marginTop: "10px",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
    </div>
  );
};

export default VerifyUser;
