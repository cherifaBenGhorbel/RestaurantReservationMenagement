import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';

import './Signin.css';

const Signin = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { username, password } = formData;
        loginUser(username, password)
            .then(response => {
                console.log('Login successful. Token:', response.data);
                navigate('/client');
            })
            .catch(error => {
                setError('Invalid username or password.');
                console.error('Error logging in:', error);
            });
    };

    return (
        <div className="Container">
            <div className="Image"></div>
            <div className="SignIn">
                <div className="Form">
                    <div className="Header">
                        <div className="Title">Sign In</div>
                        <div className="Description">Welcome back! Please login to your account.</div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="InputField">
                            <label>Username:</label>
                            <input type="text" name="username" value={formData.username} onChange={handleChange} />
                        </div>
                        <div className="InputField">
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        {error && <div className="alert alert-danger">{error}</div>}
                        <button type="submit" className="Button"><Link to="/">Sign In</Link></button>
                    </form>
                    <div className="NotRegisteredYetCreateAnAccount">
                        Don't have an account? <Link to="/signup">Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
