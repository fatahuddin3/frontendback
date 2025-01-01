import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);

    const [patientid, setPatientid] = useState('');
    const [ward_type,setWard_type ] = useState('');
    const [room_number ,setRoom_number ] = useState('');
    const [bed_number,setBed_number ] = useState('');
    const [preferences, setPreferences] = useState({ private_room: '', floor_preference : '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = 'YOUR_TOKEN_HERE';

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/admiss', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatients(response.data);
            } catch (err) {
                setError('Failed to fetch patients.');
            }
        };

        fetchPatients();
    }, []);



    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/user/rooms/allocate/${patientid}`,
                { preferences: preferences,ward_type,bed_number,room_number },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError('Failed to update activity status.');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Nurse Activity Status Update</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h2>Admission List</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} onClick={() => setPatientid(patient._id)}>
                        {patient.patient_id}
                    </li>
                ))}
            </ul>

           
            

            <h2>Recommendation Details</h2>
            <input
                type="boolean"
                placeholder="private room"
                value={preferences.private_room}
                onChange={(e) => setPreferences({...preferences, private_room: e.target.value })}
            />
            <input
                type="number"
                placeholder="floor prefer"
                value={preferences.floor_preference}
                onChange={(e) => setPreferences({ ...preferences, floor_preference: e.target.value })}
            />
            <input
                type="text"
                placeholder="ward for Admission"
                value={ward_type}
                onChange={(e) =>setWard_type(e.target.value) }
            />
            <input
                type="text"
                placeholder="room Ward"
                value={room_number}
                onChange={(e) => setRoom_number(e.target.value)}
            />
            <input
                type="text"
                placeholder="bed Ward"
                value={bed_number}
                onChange={(e) => setBed_number(e.target.value)}
            />
            <button onClick={handleUpdate}>Submit</button>
        </div>
    );
};

export default NurseActivities;