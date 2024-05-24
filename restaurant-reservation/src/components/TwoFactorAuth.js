import React, { useState } from 'react';
import { generateOTP, verifyOTP } from '../services/api';

const TwoFactorAuth = () => {
    const [username, setUsername] = useState('');
    const [otp, setOtp] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSetup = async () => {
        try {
            const qrCodeUrl = await generateOTP(username);
            setQrCodeUrl(qrCodeUrl);
            setMessage('2FA setup complete. Scan the QR code with your authenticator app.');
        } catch (error) {
            setMessage(error.response?.data || error.message || 'Error setting up 2FA. Please try again later.');
        }
    };

    const handleVerify = async () => {
        try {
            const response = await verifyOTP(username, otp);
            setMessage(response);
        } catch (error) {
            setMessage(error.response?.data || error.message || 'Error verifying 2FA. Please try again later.');
        }
    };

    return (
        <div>
            <h2>Setup Two-Factor Authentication</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <button onClick={handleSetup}>Setup 2FA</button>
            {qrCodeUrl && (
                <div>
                    <p>Scan this QR code with your Google Authenticator app:</p>
                    <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrCodeUrl)}`} alt="QR Code" />
                </div>
            )}
            <h2>Verify Two-Factor Authentication</h2>
            <input
                type="text"
                placeholder="2FA Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleVerify}>Verify 2FA</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default TwoFactorAuth;
