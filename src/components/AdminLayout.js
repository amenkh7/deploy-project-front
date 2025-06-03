import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import GetAllUsers from './GetAllUsers';
import UpdateUser from './UpdateUser';
import UserDetails from './UserDetails';
import ForgetPassword from './ForgetPassword';
import ResetPassword from './ResetPassword';
import Settings from './Settings';
import UpdateInfo from './UpdateInfo';
import UpdatePassword from './UpdatePassword';
import './AdminDashboard.css'; // Import your CSS file for styling

const AdminDashboard = () => {
  const handleDelete = (userId) => {
    // Handle delete logic here
    console.log(`Deleting user with ID: ${userId}`);
  };

  return (
    <Router>
      <div className="admin-dashboard">
        {/* Navbar */}
        <nav className="navbar">
          <h1>Admin Dashboard</h1>
        </nav>

        {/* Sidebar and Main Content */}
        <div className="content-container">
          {/* Sidebar */}
          <aside className="sidebar">
            <ul>
              <li><Link to="/admin/home">Home</Link></li>
              <li><Link to="/admin/users">Users</Link></li>
              <li><Link to="/admin/settings">Settings</Link></li>
              <li><Link to="/admin/updateInfo">Update Info</Link></li>
              <li><Link to="/admin/changePassword">Change Password</Link></li>
            </ul>
          </aside>

          {/* Main Content */}
          <main className="main-content">
            <Routes>
              <Route path="/admin/home" element={<Home />} />
              <Route path="/admin/users" element={<GetAllUsers onDelete={handleDelete} />} />
              <Route path="/admin/users/updateUser/:userId" element={<UpdateUser />} />
              <Route path="/admin/users/details/:userId" element={<UserDetails />} />
              <Route path="/admin/forgetpassword" element={<ForgetPassword />} />
              <Route path="/admin/resetpassword/:token" element={<ResetPassword />} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/updateInfo" element={<UpdateInfo />} />
              <Route path="/admin/changePassword" element={<UpdatePassword />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
};



export default AdminDashboard;