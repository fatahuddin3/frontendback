/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [medicalHistory, setMedicalHistory] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newCondition: '',
        newDateDiagnosed: '',
        newStatus: ''
    });

    // Fetch patient list on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI5Mzc0MDJhZDgxY2M3N2JlNDY5MCIsImlhdCI6MTcyNjEyNDkxNywiZXhwIjoxNzI4NzE2OTE3fQ.dzWLIT_03d-sF5c5JSQrbK_j1OvGiswdiWOvePFWIro'; // Replace with actual token
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

    // Fetch medical history for selected patient
    *//*const fetchMedicalHistory = async (patientId) => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTI5Mzc0MDJhZDgxY2M3N2JlNDY5MCIsImlhdCI6MTcyNjEyNDkxNywiZXhwIjoxNzI4NzE2OTE3fQ.dzWLIT_03d-sF5c5JSQrbK_j1OvGiswdiWOvePFWIro'; // Replace with actual token
        try {
            const response = await axios.get(`${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedPatient(response.data);
            setMedicalHistory(response.data.medicalHistory);
        } catch (error) {
            console.error('Error fetching medical history:', error);
        }
    };*//*
    const fetchMedicalHistory = () => {
        axios.get('http://localhost:4000/digi/medireco/medicalHistory', {
            params: { condition, dateDiagnosed, statu },
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setMedicalRecords(res.data);
            setMedicalHistory(response.data.medicalHistory);
        }).catch(err => console.error(err));
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
        const { condition, dateDiagnosed, status } = medicalHistory[index];
        const { newCondition, newDateDiagnosed, newStatus } = newValues;

        const token = 'your-auth-token'; // Replace with actual token
        try {
            const response = await axios.put('/medireco/history/update', {
                condition,
                dateDiagnosed,
                status,
                newCondition,
                newDateDiagnosed,
                newStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Medical history updated successfully');
            fetchMedicalHistory(selectedPatient._id); // Refresh the updated medical history
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };

    return (
        <div>
            <h1>Patient List</h1>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} onClick={() => fetchMedicalHistory(patient._id)}>
                        {patient.name}
                    </li>
                ))}
            </ul>

            {selectedPatient && (
                <div>
                    <h2>{selectedPatient.name}'s Medical History</h2>
                    {medicalHistory.map((history, index) => (
                        <div key={index}>
                            <h3>Condition: {history.condition}</h3>
                            <p>Date Diagnosed: {history.dateDiagnosed}</p>
                            <p>Status: {history.status}</p>
                            <button onClick={() => setEditIndex(index)}>Update</button>

                            {editIndex === index && (
                                <div>
                                    <input
                                        type="text"
                                        name="newCondition"
                                        placeholder="New Condition"
                                        value={newValues.newCondition}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newDateDiagnosed"
                                        placeholder="New Date Diagnosed"
                                        value={newValues.newDateDiagnosed}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newStatus"
                                        placeholder="New Status"
                                        value={newValues.newStatus}
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
    const [selectedDiagnosis, setSelectedDiagnosis] = useState('');
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newCondition: '',
        newDateDiagnosed: '',
        newStatus: ''
    });
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJiYmNlYmY4YjM2MzVhZGVlYjUyNiIsImlhdCI6MTcyNjEzNTI0NiwiZXhwIjoxNzI4NzI3MjQ2fQ.v--9G6A6JGBv7HWB4KjHjcYB8UATB3nxKjiuF268DZM'
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

    // Fetch medical records by diagnosis
    const fetchMedicalRecords = async (diagnosis) => {

        try {
            const response = await axios.get(`http://localhost:4000/digi/medirecords/${diagnosis}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSelectedDiagnosis(diagnosis);
            setMedicalRecords(response.data);
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
        const { condition, dateDiagnosed, status } = medicalRecords[index].medicalHistory;
        const { newCondition, newDateDiagnosed, newStatus } = newValues;

        
        try {
            const response = await axios.put('http://localhost:4000/digi/medireco/history/update', {
                condition,
                dateDiagnosed,
                status,
                newCondition,
                newDateDiagnosed,
                newStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Medical history updated successfully');
            fetchMedicalRecords(selectedDiagnosis); // Refresh the updated medical records
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };

    return (
        <div>
            <h1>Patient List</h1>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} onClick={() => fetchMedicalRecords(patient.diagnosis)}>
                        {patient.name} (Diagnosis: {patient.diagnosis})
                    </li>
                ))}
            </ul>

            {selectedDiagnosis && (
                <div>
                    <h2>Medical Records for Diagnosis: {selectedDiagnosis}</h2>
                    {medicalRecords.map((record, index) => (
                        <div key={index}>
                            <h3>Condition: {record.medicalHistory.condition}</h3>
                            <p>Date Diagnosed: {record.medicalHistory.dateDiagnosed}</p>
                            <p>Status: {record.medicalHistory.status}</p>
                            <button onClick={() => setEditIndex(index)}>Update</button>

                            {editIndex === index && (
                                <div>
                                    <input
                                        type="text"
                                        name="newCondition"
                                        placeholder="New Condition"
                                        value={newValues.newCondition}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newDateDiagnosed"
                                        placeholder="New Date Diagnosed"
                                        value={newValues.newDateDiagnosed}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newStatus"
                                        placeholder="New Status"
                                        value={newValues.newStatus}
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
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newCondition: '',
        newDateDiagnosed: '',
        newStatus: ''
    });

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTJiYmNlYmY4YjM2MzVhZGVlYjUyNiIsImlhdCI6MTcyNjEzNTI0NiwiZXhwIjoxNzI4NzI3MjQ2fQ.v--9G6A6JGBv7HWB4KjHjcYB8UATB3nxKjiuF268DZM'; // Replace with actual token

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
            const response = await axios.get(`http://localhost:4000/digi/medirecords/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMedicalRecords(response.data);
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
        const { condition, dateDiagnosed, status } = medicalRecords[index].medicalHistory;
        const { newCondition, newDateDiagnosed, newStatus } = newValues;

        try {
            await axios.put('http://localhost:4000/digi/medireco/history/update', {
                condition,
                dateDiagnosed,
                status,
                newCondition,
                newDateDiagnosed,
                newStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Medical history updated successfully');
            fetchMedicalRecords(medicalRecords[index].patientId); // Refresh the updated medical records
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

            {medicalRecords.length > 0 && (
                <div>
                    <h2>Medical Records</h2>
                    {medicalRecords.map((record, index) => (
                        <div key={index}>
                            <h3>Condition: {record.medicalHistory.condition}</h3>
                            <p>Date Diagnosed: {record.medicalHistory.dateDiagnosed}</p>
                            <p>Status: {record.medicalHistory.status}</p>
                            <button onClick={() => setEditIndex(index)}>Update</button>

                            {editIndex === index && (
                                <div>
                                    <input
                                        type="text"
                                        name="newCondition"
                                        placeholder="New Condition"
                                        value={newValues.newCondition}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newDateDiagnosed"
                                        placeholder="New Date Diagnosed"
                                        value={newValues.newDateDiagnosed}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newStatus"
                                        placeholder="New Status"
                                        value={newValues.newStatus}
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [patients, setPatients] = useState([]);
    const [medicalRecords, setMedicalRecords] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newCondition: '',
        newDateDiagnosed: '',
        newStatus: ''
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
            const response = await axios.get(`http://localhost:4000/digi/medirecords/${patientId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMedicalRecords(response.data);
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
        const currentRecord = medicalRecords[index];
        const { condition, dateDiagnosed, status } = currentRecord.medicalHistory[0]; // Make sure it's accessing the right index
        const { newCondition, newDateDiagnosed, newStatus } = newValues;

        try {
            await axios.put('http://localhost:4000/digi/medireco/history/update', {
                condition,
                dateDiagnosed,
                status,
                newCondition,
                newDateDiagnosed,
                newStatus
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
/*    const updateMedicalHistory = async (index) => {
        const currentRecord = medicalRecords[index];
        const { condition, dateDiagnosed, status } = currentRecord.medicalHistory[0]; // Access the right index
        const { newCondition, newDateDiagnosed, newStatus } = newValues;

        try {
            // Make the PUT request
            const response = await axios.put('http://localhost:4000/digi/medireco/history/update', {
                condition,
                dateDiagnosed,
                status,
                newCondition,
                newDateDiagnosed,
                newStatus
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            alert('Medical history updated successfully');

            // Update the local state with the updated data
            const updatedMedicalRecords = [...medicalRecords];
            updatedMedicalRecords[index].medicalHistory[0] = {
                ...updatedMedicalRecords[index].medicalHistory[0],
                condition: newCondition || condition,
                dateDiagnosed: newDateDiagnosed || dateDiagnosed,
                status: newStatus || status
            };

            setMedicalRecords(updatedMedicalRecords); // Update frontend state to reflect the changes
            setEditIndex(null); // Close the edit form
        } catch (error) {
            console.error('Error updating medical history:', error);
            alert('Error updating medical history');
        }
    };*/

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

            {medicalRecords.length > 0 && (
                <div>
                    <h2>Medical Records</h2>
                    {medicalRecords.map((record, index) => (
                        <div key={index}>
                            <h3>Condition: {record.medicalHistory[0]?.condition || 'N/A'}</h3>
                            <p>Date Diagnosed: {record.medicalHistory[0]?.dateDiagnosed || 'N/A'}</p>
                            <p>Status: {record.medicalHistory[0]?.status || 'N/A'}</p>
                            <button onClick={() => setEditIndex(index)}>Update</button>

                            {editIndex === index && (
                                <div>
                                    <input
                                        type="text"
                                        name="newCondition"
                                        placeholder="New Condition"
                                        value={newValues.newCondition || record.medicalHistory[0]?.condition}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newDateDiagnosed"
                                        placeholder="New Date Diagnosed"
                                        value={newValues.newDateDiagnosed || record.medicalHistory[0]?.dateDiagnosed}
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="text"
                                        name="newStatus"
                                        placeholder="New Status"
                                        value={newValues.newStatus || record.medicalHistory[0]?.status}
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

export default App;
