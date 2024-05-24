import React, { useEffect, useState } from 'react';
import api from '../services/api';
import '../styles/Dashboard.css';

import 'bootstrap/dist/css/bootstrap.min.css';
const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState({ username: '', password: '', roles: [] });
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [updateUserId, setUpdateUserId] = useState(null);
  const [updateUserRole, setUpdateUserRole] = useState('');
  const [roleOptions, setRoleOptions] = useState(['ADMIN', 'CLIENT', 'RESTAURANT_OWNER']);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedRoles = checked
      ? [...newUser.roles, value]
      : newUser.roles.filter(role => role !== value);
    setNewUser({ ...newUser, roles: updatedRoles });
  };

  const addUser = async () => {
    try {
      const response = await api.post('/users/', newUser);
      setUsers([...users, response.data]);
      setNewUser({ username: '', password: '', roles: [] });
    } catch (error) {
      console.error("Error adding user:", error);
      setError("Error adding user");
    }
  };

  const updateUserRoles = async () => {
    try {
      await api.put(`/users/${updateUserId}`, { roles: [updateUserRole] });
      const updatedUsers = users.map(user =>
        user.id === updateUserId ? { ...user, roles: [updateUserRole] } : user
      );
      setUsers(updatedUsers);
      setUpdateUserId(null);
      setUpdateUserRole('');
    } catch (error) {
      console.error("Error updating user roles:", error);
      setError("Error updating user roles");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setConfirmDelete(false);
      setDeleteUserId(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user");
    }
  };

  return (
    <div className="dashboard">
      <h1>Menage Users</h1>
      <div className="error">{error}</div>
      <div className="users-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <h2>{user.username}</h2>
            <p>{user.roles ? user.roles.join(', ') : ""}</p>
            <button onClick={() => { setUpdateUserId(user.id); setUpdateUserRole(user.roles[0]); }}>Modify Roles</button>
            <button onClick={() => { setConfirmDelete(true); setDeleteUserId(user.id); }}>Delete</button>
          </div>
        ))}
      </div>
      <div className="add-user">
        <h2>Add New User</h2>
        <input type="text" name="username" value={newUser.username} onChange={handleInputChange} placeholder="Username" />
        <input type="password" name="password" value={newUser.password} onChange={handleInputChange} placeholder="Password" />
        <label>
          Select Role:
          <select name="role" onChange={(e) => setNewUser({ ...newUser, roles: [e.target.value] })} value={newUser.roles[0] || ''}>
            <option value="">Select Role</option>
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </label>
        <button onClick={addUser}>Add User</button>
      </div>
      {updateUserId && (
        <div className="update-roles">
          <h2>Update User Roles</h2>
          <select value={updateUserRole} onChange={(e) => setUpdateUserRole(e.target.value)}>
            <option value="">Select Role</option>
            {roleOptions.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button onClick={updateUserRoles}>Update Roles</button>
        </div>
      )}
      {confirmDelete && (
        <div className="confirm-delete">
          <p>Are you sure you want to delete this user?</p>
          <button onClick={() => handleDeleteUser(deleteUserId)}>Yes</button>
          <button onClick={() => setConfirmDelete(false)}>No</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
