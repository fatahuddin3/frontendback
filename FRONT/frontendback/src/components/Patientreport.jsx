import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseDetails = () => {
    const [assignments, setAssignments] = useState(null); // Changed to null for better handling
    const [patient, setPatient] = useState([]);
    const [loading, setLoading] = useState(false); // Added loading state
    const [error, setError] = useState(null); // Optional error state

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

    useEffect(() => {
        const fetchNurses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
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


    const fetchAssignments = async (patient_id) => {
        try {
            setLoading(true);
            setError(null);
            setAssignments(null); // Clear previous data
            const response = await axios.get(
                `http://localhost:4000/user/reports/ipd-patient/${patient_id}/activities`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setAssignments(response.data); // Save the response directly
        } catch (error) {
            console.error('Error fetching assignments:', error);
            setError('Failed to load assignments.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Nurse List */}
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
            {/* Assignments */}
            <div style={{ flex: 2, padding: '1rem' }}>
                <h2>Assignments</h2>
                {loading && <p>Loading assignments...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {!loading && assignments && assignments.activities.length === 0 && (
                    <p>No assignments available.</p>
                )}
                {!loading && assignments && assignments.activities.length > 0 && (
                    <ul>
                        <li>
                            <strong>Date:</strong> {assignments.admission_date}
                        </li>
                        {assignments.activities.map((activity, index) => (
                            <li key={index} style={{ marginBottom: '1rem' }}>
                                <strong>Activity:</strong> {activity.activity} <br />
                                <strong>Nurse name:</strong> {activity.nurse_name || 'N/A'} <br />
                                <strong>Timestamp:</strong> {new Date(activity.timestamp).toLocaleString()} <br />
                                <strong>Notes:</strong> {activity.notes}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default NurseDetails;