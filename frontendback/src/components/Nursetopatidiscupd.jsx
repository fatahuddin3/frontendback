import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DischargePatient = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatientId, setSelectedPatientId] = useState('');
    const [dischargeDate, setDischargeDate] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDU4MDg5ZDUyZDVjMDU3MjYzODIzNCIsImlhdCI6MTczMjYwODEzOCwiZXhwIjoxNzQxMjQ4MTM4fQ.VL4XAa531T3u0I0Areii-V9vwDqhQj8l0_EtCOMCQa4';
    // Fetch all patients on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: { Authorization: `Bearer ${token}` },
                }); // Adjust base URL if needed
                setPatients(response.data);
            } catch (err) {
                console.error('Error fetching patients:', err);
                setError('Failed to fetch patients');
            }
        };
        fetchPatients();
    }, []);

    // Handle form submission
    const handleDischarge = async (e) => {
        e.preventDefault();
        if (!selectedPatientId || !dischargeDate) {
            setError('Please select a patient and enter a discharge date');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4000/user/nurse-activitiess/${selectedPatientId}/status`, {
                dischargedate: dischargeDate,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            console.error('Error updating discharge status:', err);
            setMessage('');
            setError('Failed to update discharge status');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Discharge Patient</h1>

            {/* Select Patient Dropdown */}
            <label htmlFor="patient-select">Select a Patient:</label>
            <select
                id="patient-select"
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
            >
                <option value="">-- Select a Patient --</option>
                {patients.map((patient) => (
                    <option key={patient._id} value={patient._id}>
                        {patient.name || 'Unnamed Patient'}
                    </option>
                ))}
            </select>

            {/* Input for Discharge Date */}
            <label htmlFor="discharge-date">Discharge Date:</label>
            <input
                type="datetime-local"
                id="discharge-date"
                value={dischargeDate}
                onChange={(e) => setDischargeDate(e.target.value)}
                style={{ display: 'block', margin: '10px 0', padding: '8px', width: '100%' }}
            />

            {/* Submit Button */}
            <button
                onClick={handleDischarge}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Update Discharge Status
            </button>

            {/* Display Message or Error */}
            {message && <p style={{ color: 'green', marginTop: '10px' }}>{message}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default DischargePatient;
 