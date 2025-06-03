import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStById } from "../api/userService";

const UserDetails = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({}); // pour change nulle
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const data = await getStById(userId);
      setUser(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  console.log("admin :", user.role);

  if (!user) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: "#141e30",
        }}
      >
        <p style={{ color: "wheat", fontSize: "20px", fontWeight: "bold" }}>
          Loading...
        </p>
      </div>
    );
  }

  console.log("image from detail :", user.profileImage);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #141e30, #243b55)",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
          color: "wheat",
          maxWidth: "400px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h2
          style={{ fontSize: "24px", marginBottom: "15px", fontWeight: "700" }}
        >
          User Details
        </h2>
        <div
          style={{
            fontSize: "16px",
            marginBottom: "10px",
            padding: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <img
              src={`http://localhost:5000/${user.profileImage}`} // pas de "uploads" en dur
              alt="Profile"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "15px",
                border: "2px solid #ffcc70",
              }}
            />
          </div>

          <span
            style={{ fontWeight: "bold", color: "#ffcc70", marginRight: "5px" }}
          >
            Name:
          </span>
          {user.fullName}
        </div>
        <div
          style={{
            fontSize: "16px",
            marginBottom: "10px",
            padding: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span
            style={{ fontWeight: "bold", color: "#ffcc70", marginRight: "5px" }}
          >
            Email:
          </span>
          {user.email}
        </div>
        <div
          style={{
            fontSize: "16px",
            marginBottom: "10px",
            padding: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span
            style={{ fontWeight: "bold", color: "#ffcc70", marginRight: "5px" }}
          >
            Mobile:
          </span>
          {user.mobile}
        </div>
        <div
          style={{
            fontSize: "16px",
            marginBottom: "10px",
            padding: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span
            style={{ fontWeight: "bold", color: "#ffcc70", marginRight: "5px" }}
          >
            Address:
          </span>
          {user.address}
        </div>
        <div
          style={{
            fontSize: "16px",
            marginBottom: "10px",
            padding: "8px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <span
            style={{ fontWeight: "bold", color: "#ffcc70", marginRight: "5px" }}
          >
            Role:
          </span>
          {user.role}
        </div>
        <button
          onClick={() => navigate("/users")}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#45a049")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4CAF50")}
        >
          Back
        </button>{" "}
      </div>
    </div>
  );
};

export default UserDetails;
