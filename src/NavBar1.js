import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "./components/AuthContext";
import logo from "./assets/logo.png";

const Navbar1 = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };
  // b3de modifier clique sur button faire automatique deconnect (ne pas affichier email et image de user)
  const isLoginPage = location.pathname === "/login";

  return (
    <nav
      style={{
        background: user
          ? "linear-gradient(90deg, #1E1E2F, #2A2A40)"
          : "#1E1E2F",
        padding: "15px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div>
        <FaBars
          style={{ color: "#E0E0E0", fontSize: "28px", cursor: "pointer" }}
          onClick={() => setSidebarOpen(true)}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "60px",
            height: "65px",
            objectFit: "contain",
            padding: "10px",
          }}
        />
        <Link
          to="/"
          style={{
            color: "#E0E0E0",
            fontSize: "28px",
            textDecoration: "none",
            fontWeight: "700",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          BookVerse
        </Link>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "10px",marginLeft:"200px",paddingRight:"10px" }}>
        {user && !isLoginPage ? (
          <>
            <img
              src={`https://deploy-project-back.onrender.com/${user.profileImage}`}
              alt="Profile"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #E0E0E0",
              }}
            />
            <span
              style={{
                color: "#E0E0E0",
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              {user.email}
            </span>
            <FaShoppingCart />
            <button
              onClick={handleLogout}
              style={{
                color: "#E0E0E0",
                fontSize: "16px",
                padding: "8px 20px",
                borderRadius: "25px",
                backgroundColor: "transparent",
                border: "2px solid #E94560",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <div style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/login"
              style={{
                color: "#E0E0E0",
                textDecoration: "none",
                fontSize: "16px",
                padding: "8px 20px",
                borderRadius: "25px",
                border: "2px solid #3498DB",
              }}
            >
              Login
            </Link>
            <Link
              to="/register"
              style={{
                color: "#E0E0E0",
                textDecoration: "none",
                fontSize: "16px",
                padding: "8px 20px",
                borderRadius: "25px",
                border: "2px solid #9B59B6",
              }}
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>

      {/* Sidebar */}
      {user && sidebarOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "250px",
            height: "100%",
            backgroundColor: "#2A2A40",
            paddingTop: "60px",
            zIndex: 1001,
          }}
        >
          <FaTimes
            style={{
              color: "#E0E0E0",
              fontSize: "30px",
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
            }}
            onClick={() => setSidebarOpen(false)}
          />

          {["Home", "Book", "Settings"]
            .concat(user?.role === "user" ? ["User Information"] : [])
            .map((item) => {
              const pathMap = {
                Home: "/home1",
                Book: "/book1",
                Settings: "/settings",
                "User Information": `/login/updateUser1/${user.id}`,
              };

              return (
                <Link
                  key={item}
                  to={pathMap[item]}
                  style={{
                    color: "#E0E0E0",
                    textDecoration: "none",
                    fontSize: "18px",
                    padding: "12px 20px",
                    display: "block",
                  }}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item}
                </Link>
              );
            })}

          {/* 🔴 Bouton Déconnexion */}
          {/* <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              color: "#FFFFFF",
              backgroundColor: "transparent",
              border: "2px solid #E94560",
              borderRadius: "25px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              width: "80%",
            }}
          >
            Déconnexion
          </button> */}
          {/* 🔴 Bouton Déconnexion */}
          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            style={{
              marginTop: "20px",
              marginLeft: "20px",
              color: "#E94560",
              backgroundColor: "transparent",
              border: "2px solid #E94560",
              borderRadius: "25px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
              width: "80%",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#E94560";
              e.target.style.color = "#fff";
              e.target.style.borderColor = "#fff";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#E94560";
              e.target.style.borderColor = "#E94560";
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar1;
