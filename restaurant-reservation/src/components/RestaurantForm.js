import React, { useState, useEffect } from 'react';
import { getRestaurantById } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

const RestaurantForm = ({ restaurantId, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (restaurantId) {
      getRestaurantById(restaurantId)
        .then(response => {
          const { name, location } = response.data;
          setFormData({ name, location });
        })
        .catch(error => {
          console.error('Error fetching restaurant details:', error);
          setError('Error fetching restaurant details');
        });
    } else {
      setFormData({ name: '', location: '' });
    }
  }, [restaurantId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const { name, location } = formData;

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          className="form-control"
          id="location"
          name="location"
          value={location}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
      <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default RestaurantForm;
