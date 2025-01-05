import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [patients, setPatients] = useState([]); // Correct plural naming
    const [error, setError] = useState(null); // Optional error state
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDU4MDg5ZDUyZDVjMDU3MjYzODIzNCIsImlhdCI6MTczMjYwODEzOCwiZXhwIjoxNzQxMjQ4MTM4fQ.VL4XAa531T3u0I0Areii-V9vwDqhQj8l0_EtCOMCQa4';

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/disc', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Assuming API response is { patients: [...] }
                setPatients(response.data.patients || []);
            } catch (error) {
                console.error('Error fetching patients:', error);
                setError('Failed to load patients.');
            }
        };

        fetchPatients();
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h2>Patients List</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {patients.length === 0 && !error && <p>No pending discharges found.</p>}
                    {patients.map((patient, index) => (
                        <li key={index}>{patient.name}</li> // Added a unique key
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
