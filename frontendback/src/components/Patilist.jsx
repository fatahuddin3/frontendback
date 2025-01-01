import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PatientsList() {
    const [patients, setPatients] = useState([]);
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTM3MjExOWNkYmYyNWUxNTRmMzZhNiIsImlhdCI6MTcyOTMyNzYzNCwiZXhwIjoxNzMxOTE5NjM0fQ.0TY4fCj7ABB5wAJN5gupKpE3QK9gAQvmZbK4E-SPz4E'
    useEffect(() => {
        // Fetch all patients from the backend
        axios.get('http://localhost:4000/pati/pa', {
            headers: { Authorization: `Bearer ${token}` }
        }  )
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error("Error fetching patients:", error);
            });
    }, []);

    return (
        <div>
            <h1>Patients List</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient._id}>
                        <Link to={`/patient/${patient._id}`}>{patient.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PatientsList;
