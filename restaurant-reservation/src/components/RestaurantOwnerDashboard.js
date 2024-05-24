import React, { useEffect, useState } from 'react';
import {
  deleteReservation,
  deleteRestaurant,
  getAllReservations,
  getAllRestaurants
} from '../services/api';


import 'bootstrap/dist/css/bootstrap.min.css';
const RestaurantOwnerDashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedReservation, setSelectedReservation] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = () => {
    getAllRestaurants().then(response => setRestaurants(response.data));
    getAllReservations().then(response => setReservations(response.data));
  };

  return (
    <div>
      <h1>Restaurant Owner Dashboard</h1>

      <h2>Restaurants</h2>
      <RestaurantForm
        restaurantId={selectedRestaurant}
        onSave={fetchAllData}
        onCancel={() => setSelectedRestaurant(null)}
      />
      <ul>
        {restaurants.map(restaurant => (
          <li key={restaurant.id}>
            {restaurant.name} - {restaurant.location}
            <button onClick={() => setSelectedRestaurant(restaurant.id)}>Edit</button>
            <button onClick={() => deleteRestaurant(restaurant.id).then(fetchAllData)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Reservations</h2>
      <ReservationForm
        reservationId={selectedReservation}
        onSave={fetchAllData}
        onCancel={() => setSelectedReservation(null)}
      />
      <ul>
        {reservations.map(reservation => (
          <li key={reservation.id}>
            {reservation.customerName} - {reservation.reservationTime}
            <button onClick={() => setSelectedReservation(reservation.id)}>Edit</button>
            <button onClick={() => deleteReservation(reservation.id).then(fetchAllData)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantOwnerDashboard;
