import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/NavbarD';
import ReservationManagement from './components/ReservationManagement';
import RestaurantManagement from './components/RestaurantManagement';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TwoFactorAuth from './components/TwoFactorAuth';
import Users from './components/users';
import './styles/App.css';

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/SignIn' && location.pathname !== '/signup';
  const navbarPosition = 'top'; // Always position the navbar at the top

  return (
    <>
      {showNavbar && <Navbar />} {/* Render Navbar at the top */}
      <div className={`content-container ${navbarPosition === 'top' ? 'with-top-nav' : ''}`}>
        <Routes>
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/Users" element={<Users />} />
          <Route path="/ReservationManagement" element={<ReservationManagement />} />
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/restaurant" element={<RestaurantManagement />} />
          <Route path="/2fa" element={<TwoFactorAuth />} />
        </Routes>
      </div>
    </>
  );
};


export default App;
