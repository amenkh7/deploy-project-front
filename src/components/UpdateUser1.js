import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStById,
  updateUser,
  updateUserRole,
  updatePassword,
} from "../api/userService";

export const UpdateUser = () => {
  const { userId } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [image, setImage] = useState("");
  const [fakeImage, setFakeImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getStById(userId);
        if (user) {
          setFullName(user.fullName || "");
          setEmail(user.email || "");
          setMobile(user.mobile || "");
          setAddress(user.address || "");
          setImage(user.profileImage || "");
          setRole(user.role || "user");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    if (userId) fetchUser();
  }, [userId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, GIF).");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5 MB.");
      return;
    }
    setImage(file);
    setFakeImage(URL.createObjectURL(file));
    setError("");
  };

  const handleUpload = async () => {
    if (!image || typeof image === "string") return;
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
      if (!res.ok) throw new Error(data.message || "Upload failed.");
      setMessage(`✅ ${data.message}`);
      return data.updatedImage || "";
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Error uploading image.");
      throw err;
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !mobile || !address || !role) {
      alert("All fields including role are required.");
      return;
    }

    setLoading(true);
    setMessage("");
    setError("");

    try {
      let imageName = image;
      if (typeof image !== "string") {
        imageName = await handleUpload();
      }

      const updatedUser = {
        fullName,
        email,
        mobile,
        address,
        image:
          imageName && typeof imageName === "string" ? imageName : undefined,
      };

      await updateUser(userId, updatedUser);
      await updateUserRole(email, role);

      // ✅ Mettre à jour le mot de passe uniquement si un nouveau est saisi
      if (newPassword) {
        if (!currentPassword) {
          setError("Current password is required to update to a new one.");
          setLoading(false);
          return;
        }

        await updatePassword(email, currentPassword, newPassword);
        setMessage((msg) => msg + "\n✅ Password updated successfully!");
      }

      setMessage((msg) => msg + "\n✅ User updated successfully!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(`❌ ${error.message || error}`);
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
        minHeight: "89vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={updateSubmit} style={formStyle}>
        <h2 style={{ ...titleStyle, color: "#000000" }}>Update User Info</h2>
        {(message || error) && (
          <div style={alertStyle(error ? error : message)}>
            {error
              ? error
              : message.split("\n").map((m, i) => <div key={i}>{m}</div>)}
          </div>
        )}

        <img
          src={
            image
              ? fakeImage.startsWith("blob:")
                ? fakeImage
                : `http://localhost:5000/${image}`
              : "https://i.pravatar.cc/120"
          }
          alt="Preview"
          style={{
            width: 150,
            height: 150,
            borderRadius: "50%",
            objectFit: "cover",
            boxShadow: "0 2px 16px rgba(0,0,0,0.12)",
            marginBottom: 10,
            border: "4px solid #eee",
            marginLeft: "120px",
          }}
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Mobile"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          style={inputStyle}
        />

        <div style={{ position: "relative" }}>
          <input
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              userSelect: "none",
            }}
            aria-label={
              showCurrentPassword
                ? "Masquer le mot de passe courant"
                : "Afficher le mot de passe courant"
            }
          >
            {showCurrentPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <div style={{ position: "relative" }}>
          <input
            type={showNewPassword ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{ ...inputStyle, paddingRight: "40px" }}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              fontSize: "18px",
              userSelect: "none",
            }}
            aria-label={
              showNewPassword
                ? "Masquer le nouveau mot de passe"
                : "Afficher le nouveau mot de passe"
            }
          >
            {showNewPassword ? "🙈" : "👁️"}
          </button>
        </div>

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

// Styles
const formStyle = {
  maxWidth: "500px",
  width: "100%",
  padding: "30px",
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const titleStyle = {
  textAlign: "center",
  color: "wheat",
  fontSize: "28px",
  fontWeight: "700",
};

const inputStyle = {
  padding: "12px 16px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  backgroundColor: "rgba(255, 255, 255, 0.8)",
  width: "100%",
  boxSizing: "border-box",
};

const buttonStyle = {
  padding: "14px",
  borderRadius: "10px",
  backgroundColor: "#007bff",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  cursor: "pointer",
  marginLeft: "130px",
  width: "150px",
};

const alertStyle = (msg) => ({
  whiteSpace: "pre-line",
  color: msg.startsWith("❌") ? "#721c24" : "#155724",
  backgroundColor: msg.startsWith("❌") ? "#f8d7da" : "#d4edda",
  border: msg.startsWith("❌") ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
});

export default UpdateUser;
