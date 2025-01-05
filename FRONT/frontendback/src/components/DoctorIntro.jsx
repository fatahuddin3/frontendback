// src/components/DoctorIntro.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/DoctorIntro.css'; // Import the CSS

const DoctorIntro = () => {
    const { state } = useLocation(); // Receive passed state
    const navigate = useNavigate();

    if (!state) {
        return <div>No doctor information available!</div>;
    }

    const { name, specialization} = state;

    return (
        <div className="intro-container">
            <h2>Doctor Introduction</h2>
            <div className="doctor-info">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Specialization:</strong> {specialization}</p>
                
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back to Doctor List
            </button>
        </div>
    );
};

export default DoctorIntro;