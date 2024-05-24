// src/views/AdminView.js
import React, { useEffect, useState } from 'react';
import ReservationForm from '../components/ReservationForm';
import RestaurantForm from '../components/RestaurantForm';
import UserForm from '../components/UserForm';
import { deleteReservation, deleteRestaurant, deleteUser, getAllReservations, getAllRestaurants, getAllUsers } from '../services/api';

const AdminView = () => {
    const [users, setUsers] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [reservations, setReservations] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [selectedReservation, setSelectedReservation] = useState(null);

    useEffect(() => {
        fetchAllData();
    }, []);

    const fetchAllData = () => {
        getAllUsers().then(response => setUsers(response.data));
        getAllRestaurants().then(response => setRestaurants(response.data));
        getAllReservations().then(response => setReservations(response.data));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Users</h2>
            <UserForm userId={selectedUser} onSave={fetchAllData} />
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        <button onClick={() => setSelectedUser(user.id)}>Edit</button>
                        <button onClick={() => deleteUser(user.id).then(fetchAllData)}>Delete</button>
                    </li>
                ))}
            </ul>
            <h2>Restaurants</h2>
            <RestaurantForm restaurantId={selectedRestaurant} onSave={fetchAllData} />
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>
                        {restaurant.name}
                        <button onClick={() => setSelectedRestaurant(restaurant.id)}>Edit</button>
                        <button onClick={() => deleteRestaurant(restaurant.id).then(fetchAllData)}>Delete</button>
                    </li>
                ))}
            </ul>
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
        </div>
    );
};

export default AdminView;
