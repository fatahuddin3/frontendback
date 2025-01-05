import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Nurseshift = () => {
    const [assignments, setAssignments] = useState([]);
    const [patient, setPatient] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null); // Optional error state

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDQxZTdlOTYyM2ZmYjg2YzAyMTljMSIsImlhdCI6MTczMjUxNzUwMiwiZXhwIjoxNzQxMTU3NTAyfQ.kM3P6cCRZxhbA1ZnRYHd0V1VwT4sRrzABzdpUE5zN0A';

    useEffect(() => {
        const fetchNurses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/allnur', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatient(response.data);
            } catch (error) {
                console.error('Error fetching nurses:', error);
                setError('Failed to load nurses.');
            }
        };

        fetchNurses();
    }, []); // Removed dependency on token

  /*  const fetchAssignments = async (patientId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `http://localhost:4000/user/nurse-shifts/nurse/${patientId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAssignments(response.data); // Use response.data directly
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to load assignments.');
        } finally {
            setLoading(false);
        }
    };*/
    const fetchAssignments = async (patientId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `http://localhost:4000/user/nurse-shifts/nurse/${patientId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAssignments(response.data.shifts); // Save shifts directly
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to load assignments.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h2>Nurses List</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {patient.map((patien) => (
                        <li
                            key={patien._id}
                            onClick={() => fetchAssignments(patien._id)}
                            style={{ cursor: 'pointer', margin: '0.5rem 0' }}
                        >
                            {patien.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div style={{ flex: 2, padding: '1rem' }}>
                <h2>Assignments</h2>
                {loading && <p>Loading assignments...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && assignments.length === 0 && <p>No assignments available.</p>}
                <ul>
                    {assignments.map((assignment, index) => (
                        <li key={index} style={{ marginBottom: '1rem' }}>
                            <strong>Shift Start:</strong> {assignment.start_time} <br />
                            <strong>Shift End:</strong> {assignment.end_time} <br />
                            <strong>Assigned Patients:</strong>
                            <ul>
                                {assignment.assigned_ipd_patients.map((patient, i) => (
                                    <li key={i}>
                                        {patient.name} (ID: {patient.patient_id})
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>

        </div>
    );
};

export default Nurseshift;