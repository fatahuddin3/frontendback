import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [condition, setCondition] = useState('');
    const [dateDiagnosed, setDateDiagnosed] = useState('');
    const [status, setStatus] = useState('');
    const [medicalRecords, setMedicalRecords] = useState([]);
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UyNTIxMTRjZTY3MmY3OTU5YTkyOCIsImlhdCI6MTczMjEyNTk4NSwiZXhwIjoxNzQwNzY1OTg1fQ.kWcY25jXnyqlu6SFrk2Y0xk6959qIMmKXQlpPEgbvJQ'
    useEffect(() => {
        // Fetch list of patients
        axios.get('http://localhost:4000/pati/pa', { headers: { Authorization: `Bearer ${token}`  } })
            .then(res => setPatients(res.data))
            .catch(err => console.error(err));
    }, []);

    const fetchMedicalHistory = () => {
        axios.get('http://localhost:4000/digi/medireco/medicalHistory', {
            params: { condition, dateDiagnosed, status },
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setMedicalRecords(res.data);
        }).catch(err => console.error(err));
    };

    return (
        <div>
            <h1>Patient List</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient._id} onClick={() => setSelectedPatient(patient)}>
                        {patient.name}
                    </li>
                ))}
            </ul>

            {selectedPatient && (
                <div>
                    <h2>Medical History for {selectedPatient.name}</h2>
                    <form onSubmit={e => { e.preventDefault(); fetchMedicalHistory(); }}>
                        <input
                            type="text"
                            value={condition}
                            onChange={e => setCondition(e.target.value)}
                            placeholder="Condition"
                            required
                        />
                        <input
                            type="text"
                            value={dateDiagnosed}
                            onChange={e => setDateDiagnosed(e.target.value)}
                            placeholder="Date Diagnosed"
                            required
                        />
                        <input
                            type="text"
                            value={status}
                            onChange={e => setStatus(e.target.value)}
                            placeholder="Status"
                            required
                        />
                        <button type="submit">Fetch Medical History</button>
                    </form>

                    {medicalRecords.length > 0 && (
                        <div>
                            <h3>Medical Records</h3>
                            <ul>
                                {medicalRecords.map(record => (
                                    <li key={record._id}>
                                        <strong>Diagnosis:</strong> {record.diagnosis}<br />
                                       {/* <strong>Medications:</strong> {record.medications.join(', ')}<br />
                                        <strong>Allergies:</strong> {record.allergies.join(', ')}<br />*/}
                                        <strong>medi:</strong> {record.medications}<br />
                                        <strong>aller:</strong> {record.allergies}<br />
                                        <strong>Visit Notes:</strong> {record.visitNotes.map(note => (
                                            <p>{note.date}: {note.note}</p>
                                        ))}<br />
                                        <strong>Lab Results:</strong> {record.labResults.map(result => (
                                            <p>{result.testName}: {result.result} on {result.date}</p>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PatientList;
