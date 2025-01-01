import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DischargeRecords = () => {
    const [nurses, setNurses] = useState([]);
    const [selectedNurse, setSelectedNurse] = useState(null);
    const [dischargeRecords, setDischargeRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDQxZTdlOTYyM2ZmYjg2YzAyMTljMSIsImlhdCI6MTczMjUxNzUwMiwiZXhwIjoxNzQxMTU3NTAyfQ.kM3P6cCRZxhbA1ZnRYHd0V1VwT4sRrzABzdpUE5zN0A';
    // Fetch all nurses on component mount
    useEffect(() => {
        const fetchNurses = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/allnur', {
                    headers: { Authorization: `Bearer ${token}` },
                }  ); // Adjust base URL if necessary
                setNurses(response.data);
            } catch (err) {
                console.error('Error fetching nurses:', err);
                setError('Failed to fetch nurses');
            }
        };
        fetchNurses();
    }, []);

    // Fetch discharge records for the selected nurse
    const fetchDischargeRecords = async (nurseId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`http://localhost:4000/user/doctor-activities/discharge-records/${nurseId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDischargeRecords(response.data.discharge_records);
        } catch (err) {
            console.error('Error fetching discharge records:', err);
            setError('Failed to fetch discharge records');
        } finally {
            setLoading(false);
        }
    };

    const handleNurseSelect = (e) => {
        const nurseId = e.target.value;
        setSelectedNurse(nurseId);
        fetchDischargeRecords(nurseId);
    };

    return (
        <div>
            <h1>Discharge Records Viewer</h1>

            {/* Dropdown to select nurse */}
            <label htmlFor="nurse-select">Select a Nurse:</label>
            <select id="nurse-select" onChange={handleNurseSelect} value={selectedNurse || ''}>
                <option value="" disabled>
                    Choose a nurse
                </option>
                {nurses.map((nurse) => (
                    <option key={nurse._id} value={nurse._id}>
                        {nurse.name}
                    </option>
                ))}
            </select>

            {/* Loading and error handling */}
            {loading && <p>Loading discharge records...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Display discharge records */}
            {!loading && dischargeRecords.length > 0 && (
                <div>
                    <h2>Discharge Records</h2>
                    {dischargeRecords.map((record, index) => (
                        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                            <h3>Record {index + 1}</h3>
                            <p>
                                <strong>Treatment Summary:</strong> {record.treatment_summary_disc_patient}
                            </p>
                            <h4>Medications:</h4>
                            <ul>
                                {record.medications_for_disch_patient.map((medication, medIndex) => (
                                    <li key={medIndex}>
                                        <p><strong>Patient Name:</strong> {medication.patient_name}</p>
                                        <p><strong>Patient Id:</strong> {medication.patient._id}</p>
                                        <p><strong>Medication Name:</strong> {medication.name}</p>
                                        <p><strong>Dose:</strong> {medication.dose}</p>
                                        <p><strong>Frequency:</strong> {medication.frequency}</p>
                                        <p><strong>Duration:</strong> {medication.duration}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}

            {/* No records message */}
            {!loading && !error && dischargeRecords.length === 0 && selectedNurse && (
                <p>No discharge records found for this nurse.</p>
            )}
        </div>
    );
};

export default DischargeRecords;
