import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [nurse, setNurse] = useState([]);
    const [patientid, setPatientid] = useState('');   
    const [nurseid, setNurseid] = useState('');    
    const [task, setTask] = useState('');
    const [scheduled_time, setScheduledtime] = useState('');
    const [priority ,setPriority ] = useState('');
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
    const handleUpdate = async () => {
        if (!task || !scheduled_time || !priority) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post(`http://localhost:4000/user/nurse-activities/${nurseid}/${patientid}`, {
                task,scheduled_time,priority
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
            <div style={{  padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h2>Nurses List</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {patients.map((patien) => (
                        <li
                            key={patien._id}
                            onClick={() => setPatientid(patien._id)}
                            style={{ cursor: 'pointer', margin: '0.5rem 0' }}
                        >
                            {patien.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h2>Nurses List</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <ul>
                    {nurse.map((nur) => (
                        <li
                            key={nur._id}
                            onClick={() => setNurseid(nur._id)}
                            style={{ cursor: 'pointer', margin: '0.5rem 0' }}
                        >
                            {nur.name}
                        </li>
                    ))}
                </ul>
            </div>
            {/* Input for status */}
            <div>
                <label>task: </label>
                <input
                    type="text"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    placeholder="Enter task"
                />
            </div>

            {/* Input for timestamp */}
            <div>
                <label>time scheduled: </label>
                <input
                    type="datetime-local"
                    value={scheduled_time}
                    onChange={(e) => setScheduledtime(e.target.value)}
                />
            </div>
            <div>
                <label>priority: </label>
                <input
                    type="text"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
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