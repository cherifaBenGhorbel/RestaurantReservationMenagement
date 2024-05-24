import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="Container">
      <div className="Card">
        <h1 className="Title">Welcome, Admin!</h1>
        <div className="ListGroup">
          <Link to="/ReservationManagement" className="ListGroupItem">
            Manage Reservations
          </Link>
          <Link to="/users" className="ListGroupItem">
            View Users
          </Link>
          <Link to="/restaurant" className="ListGroupItem">
            View Restaurants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
