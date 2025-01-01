import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [patientid, setPatientid] = useState('');
    const [nurseid, setNurseid] = useState('');
    const [vitals, setVitals] = useState({ temperature: '', blood_pressure: '', pulse: '', respiration_rate: '' });
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGE4YThlNjY4YTUzMGVjZmYxZDBmYSIsImlhdCI6MTczMjkzODM4MywiZXhwIjoxNzQxNTc4MzgzfQ.oQqbR1LACej5tWeuWiOfVsoOmAYI4w5KGmtlRoD5Sf8';

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

    useEffect(() => {
        const fetchNurses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/allnur', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNurses(response.data);
            } catch (error) {
                setError('Failed to load nurses.');
            }
        };

        fetchNurses();
    }, []);

    

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/user/admissions/assessment/${patientid}/${nurseid}`,
                { vitals: vitals,notes }, {
                headers: { Authorization: `Bearer ${token}` },
            }

            );
            setMessage(response.data.message);
            setError('');
        } catch (err) {
            setError('Failed to update activity status.');
        }
    };

    return (
        <div>
            <h1>Nurse Activity Status Update</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <h2>Patient List</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} onClick={() => setPatientid(patient._id)}>
                        {patient.patient_id}
                    </li>
                ))}
            </ul>

            <h2>Nurse List</h2>
            <ul>
                {nurses.map((nurse) => (
                    <li key={nurse._id} onClick={() => setNurseid(nurse._id)}>
                        {nurse.name}
                    </li>
                ))}
            </ul>

            <h2>Medications</h2>
            <input
                type="number"
                placeholder="temp"
                value={vitals.temperature}
                onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
            />
            <input
                type="text"
                placeholder="bloopress"
                value={vitals.blood_pressure}
                onChange={(e) => setVitals({ ...vitals, blood_pressure: e.target.value })}
            />
            <input
                type="number"
                placeholder="pulse  "
                value={vitals.pulse}
                onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
            />
            <input
                type="number"
                placeholder="respiration"
                value={vitals.respiration_rate}
                onChange={(e) => setVitals({ ...vitals, respiration_rate: e.target.value })}
            />
            <input
                type="text"
                placeholder="bed Ward"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
            <button onClick={handleUpdate}>Submit</button>
        </div>
    );
};

export default NurseActivities;