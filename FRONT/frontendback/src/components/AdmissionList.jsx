/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


// Component to fetch all admissions
const App = () => {
    const [admissions, setAdmissions] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/admiss');
                setAdmissions(response.data);
            } catch (err) {
                setError('Failed to fetch patients.');
            }
        };

        fetchPatients();
    }, []);
    return (
        <div>
            <h2>Admissions</h2>
            {admissions.length > 0 ? (
                <ul>
                    {admissions.map(admission => (
                        <li key={admission._id}>
                            <Link to={`/admissions/${admission._id}`}>
                                Admission ID: {admission._id}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No admissions found.</p>
            )}
        </div>
    );
};

// Component to fetch and display admission details


export default App;*/
// AdmissionList.js
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdmissionList = () => {
    const [admissions, setAdmissions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchAdmissions = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/admiss');
                setAdmissions(response.data);
            } catch (err) {
                setError('Failed to fetch admissions.');
            }
        };

        fetchAdmissions();
    }, []);

    return (
        <div>
            <h2>Admissions</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {admissions.length > 0 ? (
                <ul>
                    {admissions.map(admission => (
                        <li key={admission._id}>
                            <Link to={`/admissions/${admission._id}`}>
                                Admission ID: {admission._id}
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No admissions found.</p>
            )}
        </div>
    );
};

export default AdmissionList;*/

// Import necessary libraries
// Import necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [admissions, setAdmissions] = useState([]); // Store all admissions
    const [selectedAdmission, setSelectedAdmission] = useState(null); // Store details of the selected admission
    const [error, setError] = useState(null);

    // Fetch all admissions when the component loads
    useEffect(() => {
        axios
            .get("http://localhost:4000/user/admiss") // Backend endpoint to fetch all admissions
            .then((response) => {
                setAdmissions(response.data); // Update admissions state
            })
            .catch((err) => {
                setError("Failed to fetch admissions.");
            });
    }, []);

    // Function to fetch details for a specific admission
    const fetchAdmissionDetails = (admissionId) => {
        axios
            .get(`http://localhost:4000/user/admissions/${admissionId}`) // Fetch details of a specific admission
            .then((response) => {
                setSelectedAdmission(response.data.admission); // Update selected admission state
                setError(null);
            })
            .catch((err) => {
                setError("Failed to fetch admission details.");
                setSelectedAdmission(null);
            });
    };

    return (
        <div>
            <h1>Admissions</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

           
            <h2>All Admissions</h2>
            <ul>
                {admissions.map((admission) => (
                    <li key={admission._id}>
                        <button onClick={() => fetchAdmissionDetails(admission._id)}>
                            View Admission {admission._id}
                        </button>
                    </li>
                ))}
            </ul>

       
            {selectedAdmission && (
                <div>
                    <h2>Admission Details</h2>
                    <p><strong>Patient Name:</strong> {selectedAdmission.patient_id?.name}</p>
                    <p><strong>Patient Age:</strong> {selectedAdmission.patient_id?.age}</p>
                    <p><strong>Patient Gender:</strong> {selectedAdmission.patient_id?.gender}</p>
                    <p><strong>Doctor Name:</strong> {selectedAdmission.doctor_id?.name}</p>
                    <p><strong>Doctor Specialization:</strong> {selectedAdmission.doctor_id?.specialization}</p>
                    <p><strong>Room:</strong> {selectedAdmission.room_allocation?.room_number}</p>
                    <p><strong>Bed:</strong> {selectedAdmission.room_allocation?.bed_number}</p>
                    <p><strong>Ward Type:</strong> {selectedAdmission.room_allocation?.ward_type}</p>

                    <h3>Assessments</h3>
                    <ul>
                        {selectedAdmission.assessments.map((assessment) => (
                            <li key={assessment._id}>
                                <p><strong>Vitals:</strong></p>
                                <ul>
                                    <li><strong>Temperature:</strong> {assessment.vitals?.temperature}</li>
                                    <li><strong>Blood Pressure:</strong> {assessment.vitals?.blood_pressure}</li>
                                    <li><strong>Pulse:</strong> {assessment.vitals?.pulse}</li>
                                    <li><strong>Respiration Rate:</strong> {assessment.vitals?.respiration_rate}</li>
                                </ul>
                                <p><strong>Notes:</strong> {assessment.notes}</p>
                            </li>
                        ))}
                    </ul>

                    <h3>Consent</h3>
                    <p><strong>Documents:</strong></p>
                    <ul>
                        {selectedAdmission.consent?.documents.map((document, index) => (
                            <li key={index}>
                                <p><strong>Type:</strong> {document.type}</p>
                                <p><strong>URL:</strong> <a href={document.url} target="_blank" rel="noopener noreferrer">{document.url}</a></p>
                            </li>
                        ))}
                    </ul>
                    <p><strong>Consent Signed By:</strong> {selectedAdmission.consent?.consent?.signed_by}</p>
                    <p><strong>Relationship to Patient:</strong> {selectedAdmission.consent?.consent?.relationship_to_patient}</p>
                    <p><strong>Date Signed:</strong> {new Date(selectedAdmission.consent?.consent?.date_signed).toLocaleDateString()}</p>
                </div>
            )}
        </div>
    );
};

export default App;