import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light CustomNavbar">
    <Link className="navbar-brand CustomNavbarBrand" to="/">My Admin</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link CustomNavLink" to="/ReservationManagement">Reservation Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link CustomNavLink" to="/Users">User Management</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link CustomNavLink" to="/restaurant">Restaurant Management</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
