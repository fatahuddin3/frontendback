import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../css/DoctorIntro.css'; // Import the CSS

const PatientIntro = () => {
    const { state } = useLocation(); // Receive passed state
    const navigate = useNavigate();

    if (!state) {
        return <div>No patient information available!</div>;
    }

    const { name, age, gender, image } = state;

    return (
        <div className="intro-container">
            <h2>Doctor Introduction</h2>
            <div className="patient-info">
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Gender:</strong> {gender}</p>
                
                <div>
                    <strong>Image:</strong>
                    <img src={`http://localhost:4000${image}`} alt={`${name}`} style={{ width: '200px', height: '200px' }} />
                </div>
            </div>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back to Patient List
            </button>
        </div>
    );
};

export default PatientIntro;



