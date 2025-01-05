import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [assignmentId, setAssignmentId] = useState('');
    const [status, setStatus] = useState('');
    const [timestamp, setTimestamp] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDQxZTdlOTYyM2ZmYjg2YzAyMTljMSIsImlhdCI6MTczMjUxNzUwMiwiZXhwIjoxNzQxMTU3NTAyfQ.kM3P6cCRZxhbA1ZnRYHd0V1VwT4sRrzABzdpUE5zN0A';
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

    const handleUpdate = async () => {
        if (!assignmentId || !status || !timestamp) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4000/user/nurse-activities/${assignmentId}/status` ,{
                status,
                timestamp
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            console.error(err);
            setError('Failed to update activity status.');
            setMessage('');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Nurse Activity Status Update</h1>

            {/* Display error or success messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Dropdown for assignment ID */}
            <div>
                <label>Assignment ID: </label>
                <select
                    value={assignmentId}
                    onChange={(e) => setAssignmentId(e.target.value)}
                >
                    <option value="">Select Assignment</option>
                    {patients.map((patient) =>
                        patient.assignedTasks.map((task) => (
                            <option key={task._id} value={task._id}>
                                Patient:{patient.name},  task:{task.task},  status:{task.status}
                            </option>
                        ))
                    )}
                </select>
            </div>

            {/* Input for status */}
            <div>
                <label>Status: </label>
                <input
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Enter status"
                />
            </div>

            {/* Input for timestamp */}
            <div>
                <label>Timestamp: </label>
                <input
                    type="datetime-local"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                />
            </div>

            {/* Button to submit the form */}
            <button
                onClick={handleUpdate}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                Update Activity
            </button>
        </div>
    );
};

export default NurseActivities;
