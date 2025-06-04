import React from "react";
//import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  //const { user } = useContext(AuthContext); // Optionnel si non utilisé
const navigate = useNavigate();
  return (
    <div style={{ position: "relative", height: "100vh", overflow: "hidden" }}>
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      >
        <source src="/Lofi Girl Study 4k desktop live wallpaper.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Foreground content */}
      <div style={{ 
        position: "relative", 
        zIndex: 1, 
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        padding: "0 20px",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(3px)"
      }}>
        <div style={{ maxWidth: "800px" }}>
          <h1 style={{ 
            fontSize: "3rem",
            fontWeight: "700",
            marginBottom: "1.5rem",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)"
          }}>
            Discover Your Next Favorite Book
          </h1>
          <p style={{
            fontSize: "1.5rem",
            lineHeight: "1.6",
            marginBottom: "2rem",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)"
          }}>
            Explore our vast collection of books across all genres. 
            From thrilling mysteries to heartwarming romances, 
            we have something for every reader.
          </p>
        </div>
        <button
  onClick={() => navigate("/home")}
  style={{
    marginTop: "20px",
    padding: "12px 30px",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#fff",
    backgroundColor: "#E94560",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
    transition: "background-color 0.3s ease",
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#ff5678")}
  onMouseOut={(e) => (e.target.style.backgroundColor = "#E94560")}
>
  Browse Books
</button>

      </div>
    </div>
  );
};

export default Home;