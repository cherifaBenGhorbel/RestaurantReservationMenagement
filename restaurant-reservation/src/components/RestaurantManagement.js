import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import {
    createRestaurant,
    deleteRestaurant,
    getAllRestaurants,
    updateRestaurant
} from '../services/api';
import RestaurantForm from './RestaurantForm';

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const response = await getAllRestaurants();
      setRestaurants(response.data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError('Error fetching restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveRestaurant = async (restaurantData) => {
    try {
      setLoading(true);
      if (selectedRestaurant) {
        await updateRestaurant(selectedRestaurant, restaurantData);
      } else {
        await createRestaurant(restaurantData);
      }
      setSelectedRestaurant(null);
      fetchAllData();
    } catch (error) {
      console.error('Error saving restaurant:', error);
      setError('Error saving restaurant');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRestaurant = async (id) => {
    try {
      setLoading(true);
      // Consider using a confirmation modal for delete operations
      await deleteRestaurant(id);
      fetchAllData();
    } catch (error) {
      console.error('Error deleting restaurant:', error);
      setError('Error deleting restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Restaurant Management</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <h2>Restaurants</h2>
      <RestaurantForm
        restaurantId={selectedRestaurant}
        onSave={handleSaveRestaurant}
        onCancel={() => setSelectedRestaurant(null)}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-group mt-3">
          {restaurants.map(restaurant => (
            <li key={restaurant.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>{restaurant.name}</strong> - {restaurant.location}
              </div>
              <div>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => setSelectedRestaurant(restaurant.id)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteRestaurant(restaurant.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantManagement;
