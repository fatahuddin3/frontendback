/*// src/components/DoctorLogin.js
import React, { useState, useContext } from 'react';
import { loginDoctor } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();
    const validateForm = () => {
        if (!email || !password) {
            alert('Please fill up every box.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await loginDoctor({ email, password });
            setDoctor(response.data.doctor);
            setToken(response.data.token);
            navigate('/register');
        } catch (error) {
            alert(`Login error: ${error.message}`);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            <div>
                <p>Has not registered yet? <button onClick={() => navigate('/register')}>Register</button></p>
               
            </div>
        </form>
    );
};

export default DoctorLogin;*/

import React, { useState, useContext, useEffect } from 'react';
import { loginDoctor } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';  // Import socket.io-client

const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();
    const [notification, setNotification] = useState(null);

 
    useEffect(() => {
        const checkNewDoctor = async () => {
            try {
                const response = await fetch('http://localhost:4000/doctors/checkNewDoctor');
                const data = await response.json();
                if (data.message) {
                    setNotification(data.message);

                    // Clear notification after 10 seconds
                    setTimeout(() => {
                        setNotification('');
                    }, 10000);
                }
            } catch (error) {
                console.error('Error fetching new doctor notification:', error);
            }
        };

        checkNewDoctor();
    }, []);



    const validateForm = () => {
        if (!email || !password) {
            alert('Please fill up every box.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await loginDoctor({ email, password });
            setDoctor(response.data.doctor);
            setToken(response.data.token);
            navigate('/dashboard'); // Navigate to dashboard after login
        } catch (error) {
            alert(`Login error: ${error.message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <div>
                <p>Has not registered yet? <button onClick={() => navigate('/register')}>Register</button></p>
            </div>

            {/* Show notification if present */}
            {notification && (
                <div className="notification-bar" style={{ backgroundColor: 'lightgreen', padding: '10px', marginTop: '10px' }}>
                    {notification}
                </div>
            )}
        </div>
    );
};

export default DoctorLogin;


/*import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Noti.css';  // Assuming you want to style the notification
import { useNavigate } from 'react-router-dom';
import { loginDoctor } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
const navigate = useNavigate();
// Connect to the WebSocket server
const socket = io('http://localhost:4000', {
    transports: ['websocket'],
    withCredentials: true  // Ensure credentials if you're handling sessions
});

function NotificationComponent() {
    const [notification, setNotification] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();
    useEffect(() => {
        // Listen for the newDoctorAdded event from the backend
        socket.on('newDoctorAdded', (data) => {
            console.log('Event received:', data);
            setNotification(data.message);

            // Optionally clear notification after a few seconds (auto-hide)
            setTimeout(() => {
                setNotification('');
            }, 5000);  // Notification will disappear after 5 seconds
        });

        // Cleanup on component unmount
        return () => {
            socket.off('newDoctorAdded');
        };
    }, []);
    const validateForm = () => {
        if (!email || !password) {
            alert('Please fill up every box.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await loginDoctor({ email, password });
            setDoctor(response.data.doctor);
            setToken(response.data.token);
            navigate('/register'); // Assuming dashboard after login
        } catch (error) {
            alert(`Login error: ${error.message}`);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            <div>
                <p>Has not registered yet? <button onClick={() => navigate('/register')}>Register</button></p>
            </div>

            {notification && (
                <div className="notification-bar">
                    {notification}
                </div>
            )}
                
        </div>
    );
};
export default NotificationComponent;*/