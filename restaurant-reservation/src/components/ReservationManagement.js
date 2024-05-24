import React, { useEffect, useState } from 'react';
import {
    createReservation,
    deleteReservation,
    getAllReservations,
    updateReservation
} from '../services/api';
import ReservationForm from './ReservationForm';

import 'bootstrap/dist/css/bootstrap.min.css';

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await getAllReservations();
      setReservations(response.data);
    } catch (err) {
      setError('Error fetching reservations');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReservation = async (reservationData) => {
    try {
      if (selectedReservation) {
        await updateReservation(selectedReservation, reservationData);
      } else {
        await createReservation(reservationData);
      }
      setSelectedReservation(null);
      fetchAllData();
    } catch (error) {
      console.error('Error saving reservation:', error);
      setError('Error saving reservation');
    }
  };

  const handleDeleteReservation = async (id) => {
    try {
      await deleteReservation(id);
      fetchAllData();
    } catch (error) {
      console.error('Error deleting reservation:', error);
      setError('Error deleting reservation');
    }
  };

  return (
    <div className="container mt-5">
      <h1>Reservation Management</h1>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <ReservationForm
        reservationId={selectedReservation}
        onSave={handleSaveReservation}
        onCancel={() => setSelectedReservation(null)}
      />
      
      {loading ? (
        <p>Loading...</p>
      ) : (
        
        <ul className="list-group mt-3">
          {reservations.map(reservation => (
            <li key={reservation.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{reservation.customerName}</strong> - {new Date(reservation.reservationTime).toLocaleString()}
              </div>
              <div>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => setSelectedReservation(reservation.id)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteReservation(reservation.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReservationManagement;
