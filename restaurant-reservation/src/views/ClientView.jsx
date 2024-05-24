// src/views/ClientView.js
import React, { useEffect, useState } from 'react';
import { getAllReservations, deleteReservation, getAllRestaurants, createReservation } from '../services/api';
import ReservationForm from '../components/ReservationForm';

const ClientView = () => {
    const [reservations, setReservations] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = () => {
        getAllReservations().then(response => setReservations(response.data));
        getAllRestaurants().then(response => setRestaurants(response.data));
    };

    return (
        <div>
            <h1>Client Dashboard</h1>
            <h2>Reservations</h2>
            <ReservationForm reservationId={selectedReservation} onSave={fetchAllData} />
            <ul>
                {reservations.map(reservation => (
                    <li key={reservation.id}>
                        {reservation.customerName} - {reservation.reservationTime}
                        <button onClick={() => setSelectedReservation(reservation.id)}>Edit</button>
                        <button onClick={() => deleteReservation(reservation.id).then(fetchAllData)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Restaurants</h2>
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>
                        {restaurant.name} - {restaurant.location}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClientView;
