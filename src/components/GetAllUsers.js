import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userService";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const GetAllUsers = ({ onDelete }) => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("fullName");
  const navigate = useNavigate();

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await onDelete(id);
      alert("user deleted");
      fetchUsers();
    }
  };

  const filteredUsers = users.filter((user) => {
    const value = user[searchBy]?.toString().toLowerCase();
    return value?.includes(searchTerm.toLowerCase());
  });

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#1e1e1e", // Dark background
        padding: "20px",
        fontFamily: "'Inter', sans-serif",
        color: "#e0e0e0",
      }}
    >
      <div
        style={{
          background: "#2a2a2a", // Darker container
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{
            fontWeight: "600",
            fontSize: "24px",
            color: "#ffffff",
          }}
        >
          Users List
        </h2>

        {/* Search and Filter */}
        <div className="mb-4 d-flex align-items-center">
          <input
            type="text"
            placeholder={`Search by ${searchBy}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #3a3a3a",
              flex: 1,
              marginRight: "10px",
              background: "#1e1e1e",
              color: "#e0e0e0",
            }}
          />
          <select
            value={searchBy}
            onChange={(e) => setSearchBy(e.target.value)}
            style={{
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #3a3a3a",
              backgroundColor: "#1e1e1e",
              color: "#e0e0e0",
            }}
          >
            <option value="fullName">Full Name</option>
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
            <option value="role">Role</option>
            <option value="address">Address</option>
          </select>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                <th>Role</th>
                <th>Creation Date</th>
                <th>Updating Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.address}</td>
                  <td>{user.role}</td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td>{new Date(user.updatedAt).toLocaleDateString()}</td>
                  <td>
                    {/* View Button */}
                    <button
                      className="btn btn-sm me-2"
                      style={{
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        fontSize: "14px",
                        transition: "0.3s",
                      }}
                      onClick={() => navigate(`/users/details/${user._id}`)}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#45a049")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#4CAF50")
                      }
                    >
                      👁 View
                    </button>

                    {/* Edit Button */}
                    <button
                      className="btn btn-sm me-2"
                      style={{
                        backgroundColor: "#FFA500",
                        color: "#fff",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        fontSize: "14px",
                        transition: "0.3s",
                      }}
                      onClick={() => navigate(`updateUser/${user._id}`)}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#e69500")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#FFA500")
                      }
                    >
                      ✏️ Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      className="btn btn-sm"
                      style={{
                        backgroundColor: "#d9534f",
                        color: "#fff",
                        borderRadius: "6px",
                        padding: "6px 12px",
                        fontSize: "14px",
                        transition: "0.3s",
                      }}
                      onClick={() => handleDelete(user._id)}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = "#c9302c")
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "#d9534f")
                      }
                    >
                      ❌ Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllUsers;
