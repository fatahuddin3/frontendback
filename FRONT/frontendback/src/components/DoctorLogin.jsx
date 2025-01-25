

import React, { useState } from 'react';
import { loginDoctor } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import './DoctorLogin.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !password) {
            alert('Please fill up every box.');
            return false;
        }        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;if (!emailRegex.test(email)) {
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
            navigate('/s'); // Navigate to dashboard after login
        } catch (error) {
            alert(`Login error: ${error.message}`);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label className="label">Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input"
                    />
                </div>
                <div className="input-group">
                    <label className="label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="input"
                    />
                </div>
                <button type="submit" className="button">Login</button>
            </form>
            <div className="register">
                <p>
                    Has not registered yet?{' '}
                    <button onClick={() => navigate('/register')} className="button">
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;


