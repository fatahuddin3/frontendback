import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseShiftScheduler = () => {
    const [patients, setPatients] = useState([]);
    const [nurse, setNurse] = useState([]);
    const [selectedPatients, setSelectedPatients] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [nurseId, setNurseId] = useState('');
    const [error, setError] = useState('');
    // Add nurse ID here
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDU4MDg5ZDUyZDVjMDU3MjYzODIzNCIsImlhdCI6MTczMjYwODEzOCwiZXhwIjoxNzQxMjQ4MTM4fQ.VL4XAa531T3u0I0Areii-V9vwDqhQj8l0_EtCOMCQa4';
    useEffect(() => {
        // Fetch all patients to display assignment IDs
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: { Authorization: `Bearer ${token}` },
                }); // Endpoint to fetch patient list
                setPatients(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch patients.');
            }
        };

        fetchPatients();
    }, []);

    useEffect(() => {
        const fetchNurses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/allnur', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNurse(response.data);
            } catch (error) {
                console.error('Error fetching nurses:', error);
                setError('Failed to load nurses.');
            }
        };

        fetchNurses();
    }, []); 
    
    const handlePatientSelect = (patientId) => {
        setSelectedPatients((prev) =>
            prev.includes(patientId)
                ? prev.filter((id) => id !== patientId)
                : [...prev, patientId]
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!startTime || !endTime || selectedPatients.length === 0 || !nurseId) {
            alert('All fields are required!');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4000/user/nurse-shifts/${nurseId}`, {
                start_time: startTime,
                end_time: endTime,
                assigned_ipd_patients: selectedPatients,
            });
            alert('Shift scheduled successfully!');
            console.log(response.data);
        } catch (error) {
            console.error('Error scheduling shift:', error);
            alert('Error scheduling shift.');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h2>Schedule Nurse Shift</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ padding: '1rem', borderRight: '1px solid #ccc' }}>
                    <h2>Nurses List</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <ul>
                        {nurse.map((nur) => (
                            <li
                                key={nur._id}
                                onClick={() => setNurseId(nur._id)}
                                style={{ cursor: 'pointer', margin: '0.5rem 0' }}
                            >
                                {nur.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label>Start Time:</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Time:</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Assign Patients:</label>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {patients.map((patient) => (
                            <li key={patient._id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        value={patient._id}
                                        onChange={() => handlePatientSelect(patient._id)}
                                    />
                                    {patient.name} (ID: {patient._id})
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>
                    Schedule Shift
                </button>
            </form>
        </div>
    );
};

export default NurseShiftScheduler;
