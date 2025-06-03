import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getStById, updateUser, updateUserRole } from "../api/userService";

export const UpdateUser = () => {
  const { userId } = useParams();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState(""); // Nouveau champ role
  const [image, setImage] = useState("");
  const [fakeImage, setFakeImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
    console.log("This is the file :", file);
    setImage(file);
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
    } catch (err) {
      console.error("Upload error:", err);
      setMessage("❌ Error uploading image.");
    }
  };

  const updateSubmit = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !mobile || !address || !role) {
      alert("All fields including role are required.");
      return;
    }

    setLoading(true);

    try {
      await handleUpload();

      const updatedUser = {
        fullName,
        email,
        mobile,
        address,
        image: typeof image === "string" ? image : undefined,
      };

      await updateUser(userId, updatedUser);
      await updateUserRole(email, role); // Ajout MAJ du rôle

      setMessage("✅ User updated successfully!");
      setTimeout(() => navigate("/users"), 2000);
    } catch (error) {
      setMessage(`❌ ${error.message}`);
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

        {message && <div style={alertStyle(message)}>{message}</div>}
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            handleImageChange(e);
            setFakeImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          style={inputStyle}
        >
          <option value="">Select Role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
        </select>

        {/* {image && (
          <img
            src={`http://localhost:5000/${image}`}
            alt="User"
            style={imageStyle}
          />
        )} */}

        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

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

const imageStyle = {
  width: "100px",
  height: "100px",
  borderRadius: "50%",
  marginBottom: "10px",
};

const alertStyle = (msg) => ({
  color: msg.startsWith("❌") ? "#721c24" : "#155724",
  backgroundColor: msg.startsWith("❌") ? "#f8d7da" : "#d4edda",
  border: msg.startsWith("❌") ? "1px solid #f5c6cb" : "1px solid #c3e6cb",
  padding: "10px",
  borderRadius: "8px",
  textAlign: "center",
});

export default UpdateUser;
