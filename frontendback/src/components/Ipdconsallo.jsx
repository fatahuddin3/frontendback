/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);   
    const [patientid, setPatientid] = useState('');
    
    const [consent, setConsent] = useState({ signed_by: '', relationship_to_patient: '', date_signed :''});
   
    const [medications, setMedications] = useState([]);
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

    
    const handleAddMedication = () => {
        setMedications([...medications, { reason_for_admission: '', preferred_ward: '' }]);
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index][field] = value;
        setMedications(updatedMedications);
    };

    const handleRemoveMedication = (index) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/user/admissions/consent/${patientid}`,
                { documents: medications ,consent:consent}, {
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

          

            <h2>Medications</h2>
            {medications.map((med, index) => (
                <div key={index}>
                    <input
                    type="text"
                        placeholder="type"
                        value={med.type}
                        onChange={(e) => handleMedicationChange(index, 'type', e.target.value)}
                    />
                    <input type="text"
                        placeholder="url"
                        value={med.url}
                        onChange={(e) => handleMedicationChange(index, 'url', e.target.value)}
                    />
                    <button onClick={() => handleRemoveMedication(index)}>Remove</button>
                </div>
            ))}
            <input type="date"
                placeholder="date signed"
                value={signed_by}
                onChange={(e) => setConsent({ ...consent, date_signed: e.target.value })}
            />
            <input type="text"
                placeholder="relation"
                value={relationship_to_patient}
                onChange={(e) => setConsent({ ...consent, relationship_to_patient: e.target.value })}
            />
            <input type="text"
                placeholder="signed by"
                value={date_signed}
                onChange={(e) => setConsent({ ...consent, signed_by: e.target.value })}
            />
            <button onClick={handleAddMedication}>Add Medication</button>

            <button onClick={handleUpdate}>Submit</button>
        </div>
    );
};

export default NurseActivities;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [patientid, setPatientid] = useState('');
    const [consent, setConsent] = useState({ signed_by: '', relationship_to_patient: '', date_signed: '' });
    const [medications, setMedications] = useState([]);
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

    const handleAddMedication = () => {
        setMedications([...medications, { type: '', url: '' }]);
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index][field] = value;
        setMedications(updatedMedications);
    };

    const handleRemoveMedication = (index) => {
        setMedications(medications.filter((_, i) => i !== index));
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/user/admissions/consent/${patientid}`,
                { documents: medications, consent: consent },
                { headers: { Authorization: `Bearer ${token}` } }
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

            <h2>Medications</h2>
            {medications.map((med, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder="Type"
                        value={med.type}
                        onChange={(e) => handleMedicationChange(index, 'type', e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="URL"
                        value={med.url}
                        onChange={(e) => handleMedicationChange(index, 'url', e.target.value)}
                    />
                    <button onClick={() => handleRemoveMedication(index)}>Remove</button>
                </div>
            ))}

            <h2>Consent</h2>
            <input
                type="text"
                placeholder="Signed by"
                value={consent.signed_by}
                onChange={(e) => setConsent({ ...consent, signed_by: e.target.value })}
            />
            <input
                type="text"
                placeholder="Relationship to Patient"
                value={consent.relationship_to_patient}
                onChange={(e) => setConsent({ ...consent, relationship_to_patient: e.target.value })}
            />
            <input
                type="date"
                value={consent.date_signed}
                onChange={(e) => setConsent({ ...consent, date_signed: e.target.value })}
            />
            <button onClick={handleAddMedication}>Add Medication</button>
            <button onClick={handleUpdate}>Submit</button>
        </div>
    );
};

export default NurseActivities;
