import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { getReservationById } from '../services/api';
import './ReservationForm.css';

const ReservationForm = ({ reservationId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    reservationTime: '',
    partySize: '',
  });

  useEffect(() => {
    if (reservationId) {
      getReservationById(reservationId)
        .then(response => {
          const { customerName, customerEmail, reservationTime, partySize } = response.data;
          setFormData({
            customerName,
            customerEmail,
            reservationTime,
            partySize,
          });
        })
        .catch(error => console.error('Error fetching reservation details:', error));
    } else {
      setFormData({
        customerName: '',
        customerEmail: '',
        reservationTime: '',
        partySize: '',
      });
    }
  }, [reservationId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { customerName, customerEmail, reservationTime, partySize } = formData;
    const reservationData = {
      customerName,
      customerEmail,
      reservationTime,
      partySize,
    };
    onSave(reservationData);
  };

  const { customerName, customerEmail, reservationTime, partySize } = formData;

  return (
    <form onSubmit={handleSubmit} className="reservation-form">
      <div className="form-group">
        <label htmlFor="customerName">Customer Name:</label>
        <input
          type="text"
          className="form-control custom-input"
          id="customerName"
          name="customerName"
          value={customerName}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="customerEmail">Customer Email:</label>
        <input
          type="email"
          className="form-control custom-input"
          id="customerEmail"
          name="customerEmail"
          value={customerEmail}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="reservationTime">Reservation Time:</label>
        <input
          type="datetime-local"
          className="form-control custom-input"
          id="reservationTime"
          name="reservationTime"
          value={reservationTime}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="partySize">Party Size:</label>
        <input
          type="number"
          className="form-control custom-input"
          id="partySize"
          name="partySize"
          value={partySize}
          onChange={handleChange}
          required
        />
      </div>
 
      <button type="submit" className="btn btn-primary custom-button">Save</button>
      <button type="button" className="btn btn-secondary custom-button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default ReservationForm;
