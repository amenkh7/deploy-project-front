import React, { useState, useContext } from 'react';
import { updatePassword } from '../api/userService';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import the eye icons
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
  const { user } = useContext(AuthContext);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords don't match");
      return;
    }

    try {
      setLoading(true);
      const response = await updatePassword(user.email, currentPassword, newPassword);
      setSuccessMessage(response.message);
      setTimeout(() => {
        navigate('/settings')
      }, 2000);
      
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headerStyle}>Update Password</h2>

        {errorMessage && (
          <div style={messageStyleError}>
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div style={messageStyleSuccess}>
            {successMessage}
          </div>
        )}

        <div style={inputContainerStyle}>
          <input
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={inputStyle}
          />
          <span
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            style={eyeIconStyle}
          >
            {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div style={inputContainerStyle}>
          <input
            type={showNewPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={inputStyle}
          />
          <span
            onClick={() => setShowNewPassword(!showNewPassword)}
            style={eyeIconStyle}
          >
            {showNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div style={inputContainerStyle}>
          <input
            type={showConfirmNewPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            style={inputStyle}
          />
          <span
            onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
            style={eyeIconStyle}
          >
            {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={buttonStyle}
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
        <button
                    type="button"
                    onClick={() => navigate("/settings")}
                    style={backButtonStyle}
                    onMouseOver={(e) => (e.target.style.backgroundColor = "#ff6347")}
                    onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4500")}
                >
                    Cancel
                </button>
      </form>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  background: 'linear-gradient(to right, #141e30, #243b55)',
  padding: '20px',
};

const formStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  padding: '30px',
  borderRadius: '15px',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
  color: 'wheat',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const headerStyle = {
  fontSize: '24px',
  marginBottom: '15px',
  fontWeight: '700',
};

const inputContainerStyle = {
  position: 'relative',
};

const inputStyle = {
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  fontSize: '16px',
  outline: 'none',
  transition: 'border-color 0.3s, box-shadow 0.3s',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  color: 'wheat',
  width: '100%',
  textAlign: 'center',
};

const buttonStyle = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  fontSize: '16px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const eyeIconStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  color: 'wheat',
};

const messageStyleError = {
  color: '#dc3545',
  backgroundColor: '#f8d7da',
  padding: '12px',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '14px',
  border: '1px solid #f5c6cb',
};

const messageStyleSuccess = {
  color: '#28a745',
  backgroundColor: '#d4edda',
  padding: '12px',
  borderRadius: '8px',
  textAlign: 'center',
  fontSize: '14px',
  border: '1px solid #c3e6cb',
};
const backButtonStyle = {
  backgroundColor: "#ff4500",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s ease",
};

export default UpdatePassword;
