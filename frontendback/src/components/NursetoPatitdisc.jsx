import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [nurse, setNurse] = useState([]);
    const [patientid, setPatientid] = useState('');
    const [nurseid, setNurseid] = useState('');
    const [medications, setMedications] = useState([]);
    const [treatmentSummary, setTreatmentSummary] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDQxZTdlOTYyM2ZmYjg2YzAyMTljMSIsImlhdCI6MTczMjUxNzUwMiwiZXhwIjoxNzQxMTU3NTAyfQ.kM3P6cCRZxhbA1ZnRYHd0V1VwT4sRrzABzdpUE5zN0A';

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setPatients(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch patients.');
            }
        };

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

        fetchPatients();
        fetchNurses();
    }, []);

    const handleAddMedication = () => {
        setMedications([...medications, { name: '', dose: '', frequency: '', duration: '' }]);
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index][field] = value;
        setMedications(updatedMedications);
    };

    const handleRemoveMedication = (index) => {
        const updatedMedications = medications.filter((_, i) => i !== index);
        setMedications(updatedMedications);
    };

    const handleSubmit = async () => {
        if (!patientid || !nurseid || medications.length === 0) {
            setError('All fields are required, and at least one medication must be added.');
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:4000/user/nurse-activities/discharg/${nurseid}/${patientid}`,
                {
                    medications_to_continue: medications,
                    treatment_summary: treatmentSummary,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage(response.data.message);
            setError('');
            setMedications([]);
            setTreatmentSummary('');
        } catch (err) {
            console.error(err);
            setError('Failed to update activity status.');
            setMessage('');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Nurse Activity Status Update</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div>
                <h2>Select Patient</h2>
                <select onChange={(e) => setPatientid(e.target.value)} value={patientid}>
                    <option value="">Select a patient</option>
                    {patients.map((patien) => (
                        <option key={patien._id} value={patien._id}>
                            {patien.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Select Nurse</h2>
                <select onChange={(e) => setNurseid(e.target.value)} value={nurseid}>
                    <option value="">Select a nurse</option>
                    {nurse.map((nur) => (
                        <option key={nur._id} value={nur._id}>
                            {nur.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <h2>Treatment Summary</h2>
                <textarea
                    value={treatmentSummary}
                    onChange={(e) => setTreatmentSummary(e.target.value)}
                    placeholder="Enter treatment summary"
                    rows="4"
                    cols="50"
                />
            </div>

            <div>
                <h2>Medications</h2>
                {medications.map((med, index) => (
                    <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={med.name}
                            onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Dose"
                            value={med.dose}
                            onChange={(e) => handleMedicationChange(index, 'dose', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Frequency"
                            value={med.frequency}
                            onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Duration"
                            value={med.duration}
                            onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                        />
                        <button onClick={() => handleRemoveMedication(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddMedication}>Add Medication</button>
            </div>

            <button
                onClick={handleSubmit}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                }}
            >
                Submit
            </button>
        </div>
    );
};

export default NurseActivities;