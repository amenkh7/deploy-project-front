import React from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "wheat",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>Settings</h2>
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          width: "300px",
          textAlign: "center",
        }}
      >
        <p 
          style={{ fontSize: "18px", margin: "10px 0", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/updateInfo")}
        >
          Update User Info
        </p>
        <p 
          style={{ fontSize: "18px", margin: "10px 0", fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/changePassword")}
        >
          Change Password
        </p>
      </div>
    </div>
  );
};

export default Settings;