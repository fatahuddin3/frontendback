/*// src/components/DoctorRegister.js
import React, { useState } from 'react';
import { registerDoctor } from '../services/doctorService';

const DoctorRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await registerDoctor({ name, email, password, specialization, phone });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
            <div>
                <label>Specialization:</label>
                <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default DoctorRegister;
*/
//below code real
/*import React, { useState, useContext } from 'react';
import { registerDoctor } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import {useNavigate}  from 'react-router-dom';

const DoctorRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [phone, setPhone] = useState('');
    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await registerDoctor({ name, email, password, specialization, phone });
        setDoctor(response.data.doctor); // assuming backend returns `doctor` object
        setToken(response.data.token); // assuming backend returns a JWT token
        navigate('/login'); // Redirect to Home after successful registration
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
            <div>
                <label>Specialization:</label>
                <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button type="submit">Register</button>
        </form>
    );
};

export default DoctorRegister;*/
import React, { useState, useContext } from 'react';
import { registerDoctor } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const DoctorRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [phone, setPhone] = useState('');
    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!name || !email || !password || !specialization || !phone) {
            alert('Please fill up every box.');
            return false;
        }
        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        if (phone.length<7) {
            alert('phone no must be at least 7 characters');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await registerDoctor({ name, email, password, specialization, phone });
            if (response && response.data) {
                setDoctor(response.data.doctor);
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate('/doclist');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Email is already used. Please try another one.');
            } else {
                alert(`Registration error: ${error.message}`);
            }
        }
    };

    // Example of setting tokens after successful login/register
  //not real below
    /*const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await registerDoctor({ name, email, password, specialization, phone });
            if (response && response.data) {
                const { token, refreshToken, doctor } = response.data;
                setDoctor(doctor);
                setToken(token);
                localStorage.setItem('token', token);  // Store the token in localStorage
                localStorage.setItem('refreshToken', refreshToken); // Store refresh token
                navigate('/doclist');  // Navigate to the DoctorList page
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Email is already used. Please try another one.');
            } else {
                alert(`Registration error: ${error.message}`);
            }
        }
    };
*/

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
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
            <div>
                <label>Specialization:</label>
                <input
                    type="text"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                />
            </div>
            <div>
                <label>Phone:</label>
                <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
            </div>
            <button type="submit">Register</button>            
            <div>
                <p>Already Has account? <button onClick={() => navigate('/login')}>Login</button></p>
               
            </div>
        </form>
    );
};

export default DoctorRegister;

