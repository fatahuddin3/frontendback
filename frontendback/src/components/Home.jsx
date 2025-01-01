// src/components/Home.js
import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { doctor, token, setDoctor } = useContext(DoctorContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!doctor) {
            navigate('/'); // Redirect to registration if no doctor info is available
        }
    }, [doctor, navigate]);

    const handleDelete = async () => {
        // Add deletion logic here (if applicable)
        // After deletion, you can clear doctor context and redirect
        setDoctor(null);
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome, {doctor?.name}</h1>
            <p>Email: {doctor?.email}</p>
            <p>Specialization: {doctor?.specialization}</p>
            <p>Phone: {doctor?.phone}</p>
            <button onClick={handleDelete}>Delete Account</button>
            <button onClick={() => navigate('/dashboard')}>Go to Dashboard</button>
        </div>
    );
};

export default Home;
