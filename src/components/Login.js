import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userService";
import { AuthContext } from "./AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = ({ setRole }) => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await login(identifier, password);
      setUser(data.user);
      console.log("user from login :", data.user);
      setRole(data.user.role);
      sessionStorage.setItem("token", data.token); // Save token to sessionStorage
      sessionStorage.setItem("user", JSON.stringify(data.user)); // Save user data to sessionStorage
      navigate("/home1");
      //another option for this fixxx
      /*if (data.user.role === "client") {
      navigate("/home1"); // Home page with video background for clients
    } else {
      navigate("/home"); // Default home page for other roles
    }*/
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
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
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={handleLogin}
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
            // color: "wheat",
            color: "#000000",
            fontSize: "28px",
            fontWeight: "700",
          }}
        >
          Login to Your Account
        </h2>

        {error && (
          <div
            style={{
              color: "#721c24",
              backgroundColor: "#f8d7da",
              padding: "12px",
              borderRadius: "8px",
              textAlign: "center",
              fontSize: "14px",
              border: "1px solid #f5c6cb",
            }}
          >
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Email or Mobile"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          required
          style={{
            padding: "12px 16px",
            borderRadius: "10px",
            border: "1px solid #ddd",
            fontSize: "16px",
          }}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "12px 16px",
              borderRadius: "10px",
              border: "1px solid #ddd",
              fontSize: "16px",
              width: "100%",
            }}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#007bff",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          style={{
            padding: "14px",
            borderRadius: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            fontSize: "16px",
            marginLeft: "110px",
            width: "150px",
          }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <a
          href="/forgetpassword"
          style={{ color: "#007bff", marginTop: "10px", textAlign: "center" }}
        >
          Forgot Password?
        </a>

        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#007bff" }}>
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
