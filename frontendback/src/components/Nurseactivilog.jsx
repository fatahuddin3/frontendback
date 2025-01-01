import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Patientactivity = () => {
    const [assignments, setAssignments] = useState([]);
    const [nurse, setNurse] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null); // Optional error state

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDQxZTdlOTYyM2ZmYjg2YzAyMTljMSIsImlhdCI6MTczMjUxNzUwMiwiZXhwIjoxNzQxMTU3NTAyfQ.kM3P6cCRZxhbA1ZnRYHd0V1VwT4sRrzABzdpUE5zN0A';

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
    }, []); // Removed dependency on token

    const fetchAssignments = async (nurseId) => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `http://localhost:4000/user/nurse-activities/logs/nurse/${nurseId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAssignments(response.data); // Use response.data directly
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
                    {nurse.map((nur) => (
                        <li
                            key={nur._id}
                            onClick={() => fetchAssignments(nur._id)}
                            style={{ cursor: 'pointer', margin: '0.5rem 0' }}
                        >
                            {nur.name}
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
                    {assignments.map((assignment) => (
                        <li key={assignment.log_id} style={{ marginBottom: '1rem' }}>
                            <strong>Activity:</strong> {assignment.activity} <br />
                            <strong>Timestamp:</strong> {assignment.timestamp} <br />
                            <strong>Notes:</strong> {assignment.notes} <br />
                            <strong>Patient name:</strong> {assignment.Patient_name} <br />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Patientactivity;