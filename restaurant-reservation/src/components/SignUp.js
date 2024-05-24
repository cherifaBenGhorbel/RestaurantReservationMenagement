import React, { useState } from 'react';
import { createUser } from '../services/api'; 
import { useNavigate } from 'react-router-dom'; 

import './RegisterForm.css'; 

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password || !role) { 
            setError('Please fill in all fields.');
            return;
        }
        try {
            const newUser = { username, password, roles: [role] };
            await createUser(newUser); 
            setError(''); 
            navigate('/SignIn'); 
        } catch (error) {
            setError('Error registering user. Please try again.'); 
        }
    };

    return (
        <div className="Container">
            <div className="SignIn">
                <div className="Form">
                    <div className="Header">
                        <div className="Title">Register</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <div className="InputField">
                            <label>Username:</label>
                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </div>
                        <div className="InputField">
                            <label>Password:</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <div className="InputField">
                            <label>Role:</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} required>
                                <option value="">Select Role</option>
                                <option value="CLIENT">Client</option>
                                <option value="RESTAURANT_OWNER">Restaurant Owner</option>
                            </select>
                        </div>
                        <button type="submit" className="Button">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
