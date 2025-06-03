import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './Home';
import Settings from './Settings';
import UpdateInfo from './UpdateInfo';
import UpdatePassword from './UpdatePassword';

const UserLayout = () => {
  return (
    <div>
      {/* User Navbar */}
 

      {/* User Routes */}
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/updateInfo" element={<UpdateInfo />} />
          <Route path="/changePassword" element={<UpdatePassword />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default UserLayout;