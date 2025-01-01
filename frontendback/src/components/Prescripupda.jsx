/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [patients, setPatients] = useState([]);
    const [medications, setMedications] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newname: '',
        newdosage: '',
        newfrequency: '',
        newduration: ''
    });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UyNTIxMTRjZTY3MmY3OTU5YTkyOCIsImlhdCI6MTczMjEyNTk4NSwiZXhwIjoxNzQwNzY1OTg1fQ.kWcY25jXnyqlu6SFrk2Y0xk6959qIMmKXQlpPEgbvJQ';

    // Fetch patient list on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patient list:', error);
            }
        };
        fetchPatients();
    }, []);

    // Fetch medical records by patientId
    const fetchMedicalRecords = async (patientId) => {
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMedications(response.data);
        } catch (error) {
            console.error('Error fetching medical records:', error);
        }
    };

    // Handle new values input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewValues({
            ...newValues,
            [name]: value
        });
    };

    // Update medical history
    const updateMedicalHistory = async (index) => {
        const currentRecord = medications[index];
        const { name, dosage, frequency, duration } = currentRecord.medications[0]; // Make sure it's accessing the right index
        const { newname, newdosage, newfrequency, newduration } = newValues;

        try {
            await axios.put('http://localhost:4000/prescription/medireco/history/update', {
                name, dosage, frequency, duration,
                newname, newdosage, newfrequency, newduration

            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Medical history updated successfully');
            fetchMedicalRecords(currentRecord.patientId); // Refresh the updated medical records
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };
    // Update medical history
    //this below code is also right if above code dont run then you should apply below code
    const updateMedicalHistory = async (index) => {
        const currentRecord = medications[index];
        const { name, dosage, frequency, duration, } = currentRecord.medications[0]; // Access the right index
        const { newname, newdosage, newfrequency, newduration } = newValues;
 
        try {
            // Make the PUT request
            const response = await axios.put('http://localhost:4000/prescription/medireco/history/update', {
                name, dosage, frequency, duration,
                newname, newdosage, newfrequency, newduration
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
 
            alert('Medical history updated successfully');
 
            // Update the local state with the updated data
            const updatedMedicalRecords = [...medications];
            updatedMedicalRecords[index].medications[0] = {
                ...updatedMedicalRecords[index].medications[0],
                name: newname|| name,
                dosage: newdosage|| dosage,
                frequency: newfrequency || frequency,
                duration:newduration || duration,
            };
 
            setMedicalRecords(updatedMedicalRecords); // Update frontend state to reflect the changes
            setEditIndex(null); // Close the edit form
        } catch (error) {
            console.error('Error updating medical history:', error);
            alert('Error updating medical history');
        }
    };

    return (
        <div>
            <h1>Patient List</h1>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} onClick={() => fetchMedicalRecords(patient._id)}>
                        {patient.name}
                    </li>
                ))}
            </ul>

            {medications.length > 0 && (
                <div>
                    <h2>Medical Records</h2>
                    {medications.map((record, index) => (
                        <div key={index}>
                            <h3>name: {record.medications[0]?.name || 'N/A'}</h3>
                            <p>dosage: {record.medications[0]?.dosage || 'N/A'}</p>
                            <p>freq: {record.medications[0]?.frequency || 'N/A'}</p>
                            <p>duration: {record.medications[0]?.duration || 'N/A'}</p>
                            <button onClick={() => setEditIndex(index)}>Update</button>

                            {editIndex === index && (
                                <div>
                                    <input
                                        type="text"
                                        name="newname"
                                        placeholder="New name"
                                        value={newValues.newname || record.medications[0]?.name}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newdosage"
                                        placeholder="New dos"
                                        value={newValues.newdosage || record.medications[0]?.dosage}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newfrequency"
                                        placeholder="New freq"
                                        value={newValues.newfrequency || record.medications[0]?.frequency}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newduration"
                                        placeholder="New duration"
                                        value={newValues.newduration || record.medications[0]?.duration}
                                        onChange={handleInputChange}
                                    />
                                    <button onClick={() => updateMedicalHistory(index)}>Submit Update</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [patients, setPatients] = useState([]);
    const [medications, setMedications] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newname: '',
        newdosage: '',
        newfrequency: '',
        newduration: ''
    });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UyNTIxMTRjZTY3MmY3OTU5YTkyOCIsImlhdCI6MTczMjEyNTk4NSwiZXhwIjoxNzQwNzY1OTg1fQ.kWcY25jXnyqlu6SFrk2Y0xk6959qIMmKXQlpPEgbvJQ'; // Replace with your actual token.

    // Fetch patient list on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patient list:', error);
            }
        };
        fetchPatients();
    }, []);

    // Fetch medical records by patientId
    const fetchMedicalRecords = async (patientId) => {
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMedications(response.data);
        } catch (error) {
            console.error('Error fetching medical records:', error);
        }
    };

    // Handle new values input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewValues({
            ...newValues,
            [name]: value
        });
    };


    const updateMedicalHistory = async (recordIndex, medIndex) => {
        const currentRecord = medications[recordIndex];
        const currentMedication = currentRecord.medications[medIndex];
        const { _id: medicationId } = currentMedication; // Get unique ID
        const { newname, newdosage, newfrequency, newduration } = newValues;

        try {
            await axios.put(
                'http://localhost:4000/prescription/medireco/history/update',
                {
                    updates: [
                        {
                            medicationId,
                            newname,
                            newdosage,
                            newfrequency,
                            newduration
                        }
                    ]
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Medical history updated successfully');
            fetchMedicalRecords(currentRecord.patientId); // Refresh the updated medical records
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };

    return (
        <div>
            <h1>Patient List</h1>
           
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} onClick={() => fetchMedicalRecords(patient._id)}>
                        {patient.name}
                    </li>
                ))}
            </ul>

            {medications.length > 0 && (
                <div>
                    <h2>Medical Records</h2>
                    {medications.map((record, recordIndex) => (
                        <div key={record._id}>
                            <h3>Prescription ID: {record._id}</h3>
                            {record.medications.map((medication, medIndex) => (
                                <div key={medIndex}>
                                    <h4>Medication {medIndex + 1}</h4>
                                    <p>name: {medication.name || 'N/A'}</p>
                                    <p>dosage: {medication.dosage || 'N/A'}</p>
                                    <p>frequency: {medication.frequency || 'N/A'}</p>
                                    <p>duration: {medication.duration || 'N/A'}</p>
                                    <button onClick={() => setEditIndex(`${recordIndex}-${medIndex}`)}>Update</button>

                                    {editIndex === `${recordIndex}-${medIndex}` && (
                                        <div>
                                            <input
                                                type="text"
                                                name="newname"
                                                placeholder="New name"
                                                value={newValues.newname || medication.name}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="newdosage"
                                                placeholder="New dosage"
                                                value={newValues.newdosage || medication.dosage}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="newfrequency"
                                                placeholder="New frequency"
                                                value={newValues.newfrequency || medication.frequency}
                                                onChange={handleInputChange}
                                            />
                                            <input
                                                type="text"
                                                name="newduration"
                                                placeholder="New duration"
                                                value={newValues.newduration || medication.duration}
                                                onChange={handleInputChange}
                                            />
                                            <button onClick={() => updateMedicalHistory(recordIndex, medIndex)}>Submit Update</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default App;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [patients, setPatients] = useState([]);
    const [medications, setMedications] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newname: '',
        newdosage: '',
        newfrequency: '',
        newduration: ''
    });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDFiY2VhOTdmZTRlZmRkNjljNjNhMyIsImlhdCI6MTczMjM2MTQ1MSwiZXhwIjoxNzQxMDAxNDUxfQ.xdDHlGV_8WPil0grI6BKfGcckzEEaKZ3BI7SCIWzKHQ';

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patient list:', error);
            }
        };
        fetchPatients();
    }, []);

    const fetchMedicalRecords = async (patientId) => {
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMedications(response.data);
        } catch (error) {
            console.error('Error fetching medical records:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewValues({
            ...newValues,
            [name]: value
        });
    };
    const updateMedicalHistory = async (recordIndex, medIndex) => {
        const currentRecord = medications[recordIndex];
        const currentMedication = currentRecord.medications[medIndex];
        const { _id: medicationId } = currentMedication; // Get unique ID
        const { newname, newdosage, newfrequency, newduration } = newValues;

        try {
            await axios.put(
                'http://localhost:4000/prescription/medireco/history/update',
                {
                    updates: [
                        {
                            medicationId,
                            newname,
                            newdosage,
                            newfrequency,
                            newduration
                        }
                    ]
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Medical history updated successfully');
            fetchMedicalRecords(currentRecord.patientId); // Refresh the updated medical records
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };
    

    return (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            
            <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h1>Patient List</h1>
                <ul>
                    {patients.map((patient) => (
                        <li key={patient._id} onClick={() => fetchMedicalRecords(patient._id)}>
                            {patient.name}
                        </li>
                    ))}
                </ul>
            </div>

           
            <div style={{ flex: 2, padding: '1rem' }}>
                {medications.length > 0 ? (
                    <div>
                        <h2>Medical Records</h2>
                        {medications.map((record, recordIndex) => (
                            <div key={record._id} style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem' }}>
                                <h3>Prescription ID: {record._id}</h3>
                                {record.medications.map((medication, medIndex) => (
                                    <div key={medIndex}>
                                        <h4>Medication {medIndex + 1}</h4>
                                        <p>name: {medication.name || 'N/A'}</p>
                                        <p>dosage: {medication.dosage || 'N/A'}</p>
                                        <p>frequency: {medication.frequency || 'N/A'}</p>
                                        <p>duration: {medication.duration || 'N/A'}</p>
                                        <button onClick={() => setEditIndex(`${recordIndex}-${medIndex}`)}>Update</button>

                                        {editIndex === `${recordIndex}-${medIndex}` && (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="newname"
                                                    placeholder="New name"
                                                    value={newValues.newname || medication.name}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="newdosage"
                                                    placeholder="New dosage"
                                                    value={newValues.newdosage || medication.dosage}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="newfrequency"
                                                    placeholder="New frequency"
                                                    value={newValues.newfrequency || medication.frequency}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="text"
                                                    name="newduration"
                                                    placeholder="New duration"
                                                    value={newValues.newduration || medication.duration}
                                                    onChange={handleInputChange}
                                                />
                                                <button onClick={() => updateMedicalHistory(recordIndex, medIndex)}>Submit Update</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Select a patient to view their prescriptions.</p>
                )}
            </div>
        </div>
    );
};

export default App;


//for updating all arrays with one time then remove the id from medication model
// Update medical history for a specific medication
/*    const updateMedicalHistory = async (recordIndex, medIndex) => {
        const currentRecord = medications[recordIndex];
        const currentMedication = currentRecord.medications[medIndex];
        const { name, dosage, frequency, duration } = currentMedication;
        const { newname, newdosage, newfrequency, newduration } = newValues;

        try {
            // Use the new backend update structure
            await axios.put('http://localhost:4000/prescription/medireco/history/update', {
                updates: [
                    {
                        name, dosage, frequency, duration,
                        newname, newdosage, newfrequency, newduration
                    }
                ]
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Medical history updated successfully');
            fetchMedicalRecords(currentRecord.patientId); // Refresh the updated medical records
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };*/
