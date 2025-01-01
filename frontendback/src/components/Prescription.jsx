/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the manual token system for axios
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTUwMWM4ZmU0Nzg1YzgxNjBjODdjZCIsImlhdCI6MTcyNjI4NDIzMywiZXhwIjoxNzI4ODc2MjMzfQ.7cuSN5Cn074PCnf9NNpRaNnVr4bNCjzpnQrQx1vgU5Y'; // Replace this with your manual token

axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

const App = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [newMedications, setNewMedications] = useState([]);

    useEffect(() => {
        // Fetch all patients when the component mounts
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa'); // GET /pa to fetch all patients
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true);
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`); // Fetch prescriptions for the selected patient
            setPrescriptions(response.data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]);
        } finally {
            setLoadingPrescriptions(false);
        }
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id); // Fetch prescriptions based on patientId
    };

    const handleUpdateClick = (prescription) => {
        setEditMode(prescription.issueDate);
        setNewMedications(prescription.medications); // Initialize with current medications
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...newMedications];
        updatedMedications[index][field] = value;
        setNewMedications(updatedMedications);
    };

    const handleUpdate = async (issueDate, oldMedications) => {
        try {
            await axios.put(`http://localhost:4000/prescription/prescripp/medicat/${issueDate}`, {
                oldMedications,
                newMedications,
            });
            alert('Medications updated successfully!');
            setEditMode(null);
            // Optionally refetch the prescriptions after updating
            fetchPrescriptions(selectedPatient._id);
        } catch (error) {
            console.error('Error updating medications:', error);
            alert('Failed to update medications.');
        }
    };

    return (
        <div>
            <h1>Patient Prescription System</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>
                    <ul>
                        {patients.map(patient => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription) => (
                                <div key={prescription.issueDate} style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}>
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>
                                    {editMode === prescription.issueDate ? (
                                        <>
                                            {newMedications.map((med, index) => (
                                                <div key={index}>
                                                    <label>Medication Name:</label>
                                                    <input
                                                        type="text"
                                                        value={med.name}
                                                        onChange={(e) => handleMedicationChange(index, 'name', e.target.value)}
                                                        placeholder="Medication Name"
                                                    /><br />
                                                    <label>Dosage:</label>
                                                    <input
                                                        type="text"
                                                        value={med.dosage}
                                                        onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                                                        placeholder="Dosage"
                                                    /><br />
                                                    <label>Frequency:</label>
                                                    <input
                                                        type="text"
                                                        value={med.frequency}
                                                        onChange={(e) => handleMedicationChange(index, 'frequency', e.target.value)}
                                                        placeholder="Frequency"
                                                    /><br />
                                                    <label>Duration:</label>
                                                    <input
                                                        type="text"
                                                        value={med.duration}
                                                        onChange={(e) => handleMedicationChange(index, 'duration', e.target.value)}
                                                        placeholder="Duration"
                                                    /><br />
                                                </div>
                                            ))}
                                            <button onClick={() => handleUpdate(prescription.issueDate, prescription.medications)}>Save Changes</button>
                                        </>
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, index) => (
                                                <li key={index}>
                                                    <strong>Name:</strong> {med.name},
                                                    <strong> Dosage:</strong> {med.dosage},
                                                    <strong> Frequency:</strong> {med.frequency},
                                                    <strong> Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button onClick={() => handleUpdateClick(prescription)}>Update Medications</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the manual token system for axios
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTUwMWM4ZmU0Nzg1YzgxNjBjODdjZCIsImlhdCI6MTcyNjI4NDIzMywiZXhwIjoxNzI4ODc2MjMzfQ.7cuSN5Cn074PCnf9NNpRaNnVr4bNCjzpnQrQx1vgU5Y'; // Replace this with your manual token

axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

const App = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [newMedications, setNewMedications] = useState([]);

    useEffect(() => {
        // Fetch all patients when the component mounts
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa'); // GET /pa to fetch all patients
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true);
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`); // Fetch prescriptions for the selected patient
            setPrescriptions(response.data);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]);
        } finally {
            setLoadingPrescriptions(false);
        }
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id); // Fetch prescriptions based on patientId
    };

    const handleUpdateClick = (prescription) => {
        setEditMode(prescription.issueDate);
        setNewMedications([...prescription.medications]); // Copy the current medications into the state
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...newMedications];
        updatedMedications[index] = {
            ...updatedMedications[index],
            [field]: value, // Update the specific field (name, dosage, frequency, duration)
        };
        setNewMedications(updatedMedications); // Set the new medications state
    };

    const handleUpdate = async (issueDate, oldMedications) => {
        try {
            // Perform PUT request to update medications
            await axios.put(`http://localhost:4000/prescription/prescripp/medicat/${issueDate}`, {
                oldMedications,
                newMedications,
            });
            alert('Medications updated successfully!');
            setEditMode(null);
            // Optionally refetch the prescriptions after updating
            fetchPrescriptions(selectedPatient._id);
        } catch (error) {
            console.error('Error updating medications:', error);
            alert('Failed to update medications.');
        }
    };

    return (
        <div>
            <h1>Patient Prescription System</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>
                    <ul>
                        {patients.map((patient) => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription.issueDate}
                                    style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}
                                >
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>
                                    {editMode === prescription.issueDate ? (
                                        <>
                                            {newMedications.map((med, index) => (
                                                <div key={index}>
                                                    <label>Medication Name:</label>
                                                    <input
                                                        type="text"
                                                        value={med.name || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(index, 'name', e.target.value)
                                                        }
                                                        placeholder="Medication Name"
                                                    />
                                                    <br />
                                                    <label>Dosage:</label>
                                                    <input
                                                        type="text"
                                                        value={med.dosage || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(index, 'dosage', e.target.value)
                                                        }
                                                        placeholder="Dosage"
                                                    />
                                                    <br />
                                                    <label>Frequency:</label>
                                                    <input
                                                        type="text"
                                                        value={med.frequency || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(index, 'frequency', e.target.value)
                                                        }
                                                        placeholder="Frequency"
                                                    />
                                                    <br />
                                                    <label>Duration:</label>
                                                    <input
                                                        type="text"
                                                        value={med.duration || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(index, 'duration', e.target.value)
                                                        }
                                                        placeholder="Duration"
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button
                                                onClick={() =>
                                                    handleUpdate(prescription.issueDate, prescription.medications)
                                                }
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, index) => (
                                                <li key={index}>
                                                    <strong>Name:</strong> {med.name}, <strong>Dosage:</strong>{' '}
                                                    {med.dosage}, <strong>Frequency:</strong> {med.frequency},{' '}
                                                    <strong>Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button onClick={() => handleUpdateClick(prescription)}>Update Medications</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;



*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the manual token system for axios
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg1MWQxOTEzNGYxNmUwOWY4ZWI3YSIsImlhdCI6MTcyOTY0NzA1NywiZXhwIjoxNzMyMjM5MDU3fQ.615dVxNBbHWqHpNkk_rwFfu5XjCY9wah8Tf5QQNukrA'; // Replace this with your manual token
//khankir pola tui function
axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

const App = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [medicationsMap, setMedicationsMap] = useState({});
    
    useEffect(() => {
        // Fetch all patients when the component mounts
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa');
               // GET /pa to fetch all patients
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true);
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`); // Fetch prescriptions for the selected patient
            setPrescriptions(response.data);

            // Create a medications map for each prescription using the issueDate as the key
            const medicationsMap = response.data.reduce((acc, prescription) => {
                acc[prescription.issueDate] = [...prescription.medications];
                return acc;
            }, {});
            setMedicationsMap(medicationsMap);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]);
        } finally {
            setLoadingPrescriptions(false);
        }
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id); // Fetch prescriptions based on patientId
    };

    const handleUpdateClick = (prescription) => {
        setEditMode(prescription.issueDate); // Set edit mode to the specific prescription's issueDate
    };

    const handleMedicationChange = (issueDate, index, field, value) => {
        const updatedMedications = [...medicationsMap[issueDate]];
        updatedMedications[index] = {
            ...updatedMedications[index],
            [field]: value, // Update the specific field (name, dosage, frequency, duration)
        };
        setMedicationsMap((prevMedicationsMap) => ({
            ...prevMedicationsMap,
            [issueDate]: updatedMedications, // Set the new medications state for this specific prescription
        }));
    };

    const handleUpdate = async (issueDate, oldMedications) => {
        try {
            // Perform PUT request to update medications for the specific prescription
            await axios.put(`http://localhost:4000/prescription/prescripp/medicat/${issueDate}`, {
                oldMedications,
                newMedications: medicationsMap[issueDate], // Send only the updated medications for this prescription
            });
            alert('Medications updated successfully!');
            setEditMode(null); // Exit edit mode
            // Optionally refetch the prescriptions after updating
            fetchPrescriptions(selectedPatient._id);
        } catch (error) {
            console.error('Error updating medications:', error);
            alert('Failed to update medications.');
        }
    };
 
    return (
        <div>
            <h1>Patient Prescription System</h1>
           
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>
                    <ul>
                        {patients.map((patient) => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>
                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription.issueDate}
                                    style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}
                                >
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>
                                    {editMode === prescription.issueDate ? (
                                        <>
                                            {medicationsMap[prescription.issueDate].map((med, index) => (
                                                <div key={index}>
                                                    <label>Medication Name:</label>
                                                    <input
                                                        type="text"
                                                        value={med.name || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'name',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Medication Name"
                                                    />
                                                    <br />
                                                    <label>Dosage:</label>
                                                    <input
                                                        type="text"
                                                        value={med.dosage || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'dosage',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Dosage"
                                                    />
                                                    <br />
                                                    <label>Frequency:</label>
                                                    <input
                                                        type="text"
                                                        value={med.frequency || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'frequency',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Frequency"
                                                    />
                                                    <br />
                                                    <label>Duration:</label>
                                                    <input
                                                        type="text"
                                                        value={med.duration || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'duration',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Duration"
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button
                                                onClick={() =>
                                                    handleUpdate(prescription.issueDate, prescription.medications)
                                                }
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, index) => (
                                                <li key={index}>
                                                    <strong>Name:</strong> {med.name}, <strong>Dosage:</strong>{' '}
                                                    {med.dosage}, <strong>Frequency:</strong> {med.frequency},{' '}
                                                    <strong>Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button onClick={() => handleUpdateClick(prescription)}>Update Medications</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the manual token system for axios
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg1MWQxOTEzNGYxNmUwOWY4ZWI3YSIsImlhdCI6MTcyOTY0NzA1NywiZXhwIjoxNzMyMjM5MDU3fQ.615dVxNBbHWqHpNkk_rwFfu5XjCY9wah8Tf5QQNukrA'; // Replace this with your manual token
axios.interceptors.request.use(
    (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

const App = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [medicationsMap, setMedicationsMap] = useState({});
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        // Fetch all patients when the component mounts
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa');
                setPatients(response.data);
                setFilteredPatients(response.data); // Initialize filtered patients with all patients
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    // Filter patients based on search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPatients(patients); // Show all patients if search is empty
        } else {
            setFilteredPatients(
                patients.filter((patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, patients]);

    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true);
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`);
            setPrescriptions(response.data);

            const medicationsMap = response.data.reduce((acc, prescription) => {
                acc[prescription.issueDate] = [...prescription.medications];
                return acc;
            }, {});
            setMedicationsMap(medicationsMap);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]);
        } finally {
            setLoadingPrescriptions(false);
        }
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id);
    };

    const handleUpdateClick = (prescription) => {
        setEditMode(prescription.issueDate);
    };

    const handleMedicationChange = (issueDate, index, field, value) => {
        const updatedMedications = [...medicationsMap[issueDate]];
        updatedMedications[index] = {
            ...updatedMedications[index],
            [field]: value,
        };
        setMedicationsMap((prevMedicationsMap) => ({
            ...prevMedicationsMap,
            [issueDate]: updatedMedications,
        }));
    };

    const handleUpdate = async (issueDate, oldMedications) => {
        try {
            await axios.put(`http://localhost:4000/prescription/prescripp/medicat/${issueDate}`, {
                oldMedications,
                newMedications: medicationsMap[issueDate],
            });
            alert('Medications updated successfully!');
            setEditMode(null);
            fetchPrescriptions(selectedPatient._id);
        } catch (error) {
            console.error('Error updating medications:', error);
            alert('Failed to update medications.');
        }
    };

    return (
        <div>
            <h1>Patient Prescription System</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>

                    {*//* Search input for filtering patients *//*}
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by patient name"
                    />

                    <ul>
                        {filteredPatients.map((patient) => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription.issueDate}
                                    style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}
                                >
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>
                                    {editMode === prescription.issueDate ? (
                                        <>
                                            {medicationsMap[prescription.issueDate].map((med, index) => (
                                                <div key={index}>
                                                    <label>Medication Name:</label>
                                                    <input
                                                        type="text"
                                                        value={med.name || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'name',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Medication Name"
                                                    />
                                                    <br />
                                                    <label>Dosage:</label>
                                                    <input
                                                        type="text"
                                                        value={med.dosage || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'dosage',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Dosage"
                                                    />
                                                    <br />
                                                    <label>Frequency:</label>
                                                    <input
                                                        type="text"
                                                        value={med.frequency || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'frequency',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Frequency"
                                                    />
                                                    <br />
                                                    <label>Duration:</label>
                                                    <input
                                                        type="text"
                                                        value={med.duration || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'duration',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Duration"
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button
                                                onClick={() =>
                                                    handleUpdate(prescription.issueDate, prescription.medications)
                                                }
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, index) => (
                                                <li key={index}>
                                                    <strong>Name:</strong> {med.name}, <strong>Dosage:</strong> {med.dosage}, <strong>Frequency:</strong> {med.frequency}, <strong>Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button onClick={() => handleUpdateClick(prescription)}>Update Medications</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTg1MWQxOTEzNGYxNmUwOWY4ZWI3YSIsImlhdCI6MTcyOTY0NzA1NywiZXhwIjoxNzMyMjM5MDU3fQ.615dVxNBbHWqHpNkk_rwFfu5XjCY9wah8Tf5QQNukrA'; // Replace this with your actual token

const App = () => {
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false);
    const [editMode, setEditMode] = useState(null);
    const [medicationsMap, setMedicationsMap] = useState({});
    const [searchTerm, setSearchTerm] = useState(''); // State for search term

    useEffect(() => {
        // Fetch all patients when the component mounts
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token here
                    },
                });
                setPatients(response.data);
                setFilteredPatients(response.data); // Initialize filtered patients with all patients
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    // Filter patients based on search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPatients(patients); // Show all patients if search is empty
        } else {
            setFilteredPatients(
                patients.filter((patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, patients]);

    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true);
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token here
                },
            });
            setPrescriptions(response.data);

            const medicationsMap = response.data.reduce((acc, prescription) => {
                acc[prescription.issueDate] = [...prescription.medications];
                return acc;
            }, {});
            setMedicationsMap(medicationsMap);
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]);
        } finally {
            setLoadingPrescriptions(false);
        }
    };

    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id);
    };

    const handleUpdateClick = (prescription) => {
        setEditMode(prescription.issueDate);
    };

    const handleMedicationChange = (issueDate, index, field, value) => {
        const updatedMedications = [...medicationsMap[issueDate]];
        updatedMedications[index] = {
            ...updatedMedications[index],
            [field]: value,
        };
        setMedicationsMap((prevMedicationsMap) => ({
            ...prevMedicationsMap,
            [issueDate]: updatedMedications,
        }));
    };
    const handleUpdate = async (issueDate, oldMedications) => {
        try {
            await axios.put(
                `http://localhost:4000/prescription/prescripp/medicat/${issueDate}`,
                {
                    oldMedications,  // Send old medications
                    newMedications: medicationsMap[issueDate], // Send new medications
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ensure token is attached here
                    },
                }
            );
            alert('Medications updated successfully!');
            setEditMode(null);
            fetchPrescriptions(selectedPatient._id); // Refresh prescriptions after update
        } catch (error) {
            console.error('Error updating medications:', error);
            alert('Failed to update medications.');
        }
    };


    return (
        <div>
            <h1>Patient Prescription System</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>

                    { Search input for filtering patients }
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by patient name"
                    />

                    <ul>
                        {filteredPatients.map((patient) => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription.issueDate}
                                    style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}
                                >
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>
                                    {editMode === prescription.issueDate ? (
                                        <>
                                            {medicationsMap[prescription.issueDate].map((med, index) => (
                                                <div key={index}>
                                                    <label>Medication Name:</label>
                                                    <input
                                                        type="text"
                                                        value={med.name || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'name',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Medication Name"
                                                    />
                                                    <br />
                                                    <label>Dosage:</label>
                                                    <input
                                                        type="text"
                                                        value={med.dosage || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'dosage',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Dosage"
                                                    />
                                                    <br />
                                                    <label>Frequency:</label>
                                                    <input
                                                        type="text"
                                                        value={med.frequency || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'frequency',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Frequency"
                                                    />
                                                    <br />
                                                    <label>Duration:</label>
                                                    <input
                                                        type="text"
                                                        value={med.duration || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'duration',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Duration"
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button
                                                onClick={() =>
                                                    handleUpdate(prescription.issueDate, prescription.medications)
                                                }
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, index) => (
                                                <li key={index}>
                                                    <strong>Name:</strong> {med.name}, <strong>Dosage:</strong> {med.dosage}, <strong>Frequency:</strong> {med.frequency}, <strong>Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button onClick={() => handleUpdateClick(prescription)}>Update Medications</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;*/
//real
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UyNTIxMTRjZTY3MmY3OTU5YTkyOCIsImlhdCI6MTczMjEyNTk4NSwiZXhwIjoxNzQwNzY1OTg1fQ.kWcY25jXnyqlu6SFrk2Y0xk6959qIMmKXQlpPEgbvJQ'; // Replace this with your actual token

const App = () => {
    const [patients, setPatients] = useState([]); // Holds patient list
    const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients based on search
    const [selectedPatient, setSelectedPatient] = useState(null); // Currently selected patient
    const [prescriptions, setPrescriptions] = useState([]); // Holds prescriptions
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false); // Loading indicator for prescriptions
    const [editMode, setEditMode] = useState(null); // Track if we are editing a prescription
    const [medicationsMap, setMedicationsMap] = useState({}); // Map medications by issue date
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

    // Fetch patients on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token for authentication
                    },
                });
                setPatients(response.data);
                setFilteredPatients(response.data); // Initialize filtered patients with all patients
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);
    //this 2 real
    // Filter patients as per search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPatients(patients); // Reset to all patients when search is cleared
        } else {
            setFilteredPatients(
                patients.filter((patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, patients]);

    // Fetch prescriptions based on selected patient
    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true); // Show loading state
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token here
                },
            });
            setPrescriptions(response.data);

            // Initialize medication data in a map for easier updates
            const medicationsMap = response.data.reduce((acc, prescription) => {
                acc[prescription.issueDate] = [...prescription.medications];
                return acc;
            }, {});
            setMedicationsMap(medicationsMap); // Set the map state
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]); // Clear prescriptions on error
        } finally {
            setLoadingPrescriptions(false); // Hide loading state
        }
    };


    // Fetch prescriptions based on the selected patient
    
    // Handle patient selection and fetch corresponding prescriptions
    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id);
    };

    // Handle the edit button click to start updating medications
    const handleUpdateClick = (prescription) => {
        setEditMode(prescription.issueDate); // Enable edit mode for this prescription
    };

    // Handle the change of a specific medication's field (name, dosage, etc.)
    const handleMedicationChange = (issueDate, index, field, value) => {
        const updatedMedications = [...medicationsMap[issueDate]];
        updatedMedications[index] = {
            ...updatedMedications[index],
            [field]: value, // Update the specific field (name, dosage, etc.)
        };
        setMedicationsMap((prevMedicationsMap) => ({
            ...prevMedicationsMap,
            [issueDate]: updatedMedications, // Update the map with new medications
        }));
    };

    // Handle the save button to update medications on the backend

    //real code below
    const handleUpdate = async (issueDate, oldMedications) => {
        try {
            // Make the PUT request to update the medications
            const response = await axios.put(
                `http://localhost:4000/prescription/prescripp/medicat/${issueDate}`,
                {
                    oldMedications, // Send old medications for comparison
                    newMedications: medicationsMap[issueDate], // Send updated medications
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Ensure token is attached
                    },
                }
            );

            // Show success message
            alert('Medications updated successfully!');

            // Update the local state for prescriptions
            setPrescriptions((prevPrescriptions) =>
                prevPrescriptions.map((prescription) =>
                    prescription.issueDate === issueDate
                        ? {
                            ...prescription,
                            medications: medicationsMap[issueDate], // Update with new medications
                        }
                        : prescription
                )
            );

            // Exit edit mode after update
            setEditMode(null);
        } catch (error) {
            console.error('Error updating medications:', error);
            alert('Failed to update medications.');
        }
    };



    return (
        <div>
            <h1>Patient Prescription System</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>

                    
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by patient name"
                    />

                    <ul>
                        {filteredPatients.map((patient) => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription.issueDate}
                                    style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}
                                >
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>

                                    {editMode === prescription.issueDate ? (
                                        <>
                                            {medicationsMap[prescription.issueDate].map((med, index) => (
                                                <div key={index}>
                                                    <label>Medication Name:</label>
                                                    <input
                                                        type="text"
                                                        value={med.name || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'name',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Medication Name"
                                                    />
                                                    <br />
                                                    <label>Dosage:</label>
                                                    <input
                                                        type="text"
                                                        value={med.dosage || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'dosage',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Dosage"
                                                    />
                                                    <br />
                                                    <label>Frequency:</label>
                                                    <input
                                                        type="text"
                                                        value={med.frequency || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'frequency',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Frequency"
                                                    />
                                                    <br />
                                                    <label>Duration:</label>
                                                    <input
                                                        type="text"
                                                        value={med.duration || ''}
                                                        onChange={(e) =>
                                                            handleMedicationChange(
                                                                prescription.issueDate,
                                                                index,
                                                                'duration',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Duration"
                                                    />
                                                    <br />
                                                </div>
                                            ))}
                                            <button
                                                onClick={() =>
                                                    handleUpdate(prescription.issueDate, prescription.medications)
                                                }
                                            >
                                                Save Changes
                                            </button>
                                        </>
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, index) => (
                                                <li key={index}>
                                                    <strong>Name:</strong> {med.name}, <strong>Dosage:</strong> {med.dosage}, <strong>Frequency:</strong> {med.frequency}, <strong>Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button onClick={() => handleUpdateClick(prescription)}>Update Medications</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;

*/


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UyNTIxMTRjZTY3MmY3OTU5YTkyOCIsImlhdCI6MTczMjEyNTk4NSwiZXhwIjoxNzQwNzY1OTg1fQ.kWcY25jXnyqlu6SFrk2Y0xk6959qIMmKXQlpPEgbvJQ'; // Replace this with your actual token

const App = () => {
    const [patients, setPatients] = useState([]); // Holds patient list
    const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients based on search
    const [selectedPatient, setSelectedPatient] = useState(null); // Currently selected patient
    const [prescriptions, setPrescriptions] = useState([]); // Holds prescriptions
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false); // Loading indicator for prescriptions
    const [editMode, setEditMode] = useState(null); // Track if we are editing a prescription
    const [medicationsMap, setMedicationsMap] = useState({}); // Map medications by issue date
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [editIndex, setEditIndex] = useState(null); // Track index for editing
    const [newValues, setNewValues] = useState({
        newname: '',
        newdosage: '',
        newfrequency: '',
        newduration: ''
    });

    // Fetch patients on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: {
                        Authorization: `Bearer ${token}`, // Attach token for authentication
                    },
                });
                setPatients(response.data);
                setFilteredPatients(response.data); // Initialize filtered patients with all patients
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    // Filter patients as per search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPatients(patients); // Reset to all patients when search is cleared
        } else {
            setFilteredPatients(
                patients.filter((patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, patients]);

    // Fetch prescriptions based on selected patient
    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true); // Show loading state
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Attach token here
                },
            });
            setPrescriptions(response.data);

            // Initialize medication data in a map for easier updates
            const medicationsMap = response.data.reduce((acc, prescription) => {
                acc[prescription.issueDate] = [...prescription.medications];
                return acc;
            }, {});
            setMedicationsMap(medicationsMap); // Set the map state
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]); // Clear prescriptions on error
        } finally {
            setLoadingPrescriptions(false); // Hide loading state
        }
    };

    // Handle patient selection and fetch corresponding prescriptions
    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id);
    };

    // Handle the edit button click to start updating medications
    const handleUpdateClick = (prescription) => {
        setEditMode(prescription.issueDate); // Enable edit mode for this prescription
    };

    // Handle the change of a specific medication's field (name, dosage, etc.)
    //real below
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewValues({
            ...newValues,
            [name]: value
        });
    };
  

    // Handle the save button to update medications on the backend
    //real below
    const updateMedicalHistory = async (index) => {
        const currentRecord = prescriptions[index];
        const { newname, newdosage, newfrequency, newduration } = newValues;

        try {
            await axios.put('http://localhost:4000/prescription/medireco/history/update', {
                name: currentRecord.medications[0]?.name,
                dosage: currentRecord.medications[0]?.dosage,
                frequency: currentRecord.medications[0]?.frequency,
                duration: currentRecord.medications[0]?.duration,
                newname,
                newdosage,
                newfrequency,
                newduration
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Medical history updated successfully');
            fetchPrescriptions(currentRecord.patientId); // Refresh the updated medical records
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };



    return (
        <div>
            <h1>Patient Prescription System</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by patient name"
                    />
                    <ul>
                        {filteredPatients.map((patient) => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription, presIndex) => (
                                <div
                                    key={prescription.issueDate}
                                    style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}
                                >
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>

                                  {editMode === prescription.issueDate ? (
                                        medicationsMap[prescription.issueDate].map((med, index) => (
                                            <div key={index}>
                                                <p>
                                                    <strong>Name:</strong> {med.name || 'N/A'},
                                                    <strong> Dosage:</strong> {med.dosage || 'N/A'},
                                                    <strong> Frequency:</strong> {med.frequency || 'N/A'},
                                                    <strong> Duration:</strong> {med.duration || 'N/A'}
                                                </p>
                                                <button onClick={() => setEditIndex(index)}>Edit</button>

                                                {editIndex === index && (
                                                    <div>
                                                        <input
                                                            type="text"
                                                            name="newname"
                                                            placeholder="New name"
                                                            value={newValues.newname}
                                                            onChange={handleInputChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="newdosage"
                                                            placeholder="New dosage"
                                                            value={newValues.newdosage}
                                                            onChange={handleInputChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="newfrequency"
                                                            placeholder="New frequency"
                                                            value={newValues.newfrequency}
                                                            onChange={handleInputChange}
                                                        />
                                                        <input
                                                            type="text"
                                                            name="newduration"
                                                            placeholder="New duration"
                                                            value={newValues.newduration}
                                                            onChange={handleInputChange}
                                                        />
                                                        <button onClick={() => updateMedicalHistory(presIndex)}>Submit</button>
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, index) => (
                                                <li key={index}>
                                                    <strong>Name:</strong> {med.name},
                                                    <strong> Dosage:</strong> {med.dosage},
                                                    <strong> Frequency:</strong> {med.frequency},
                                                    <strong> Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    


                                    <button onClick={() => handleUpdateClick(prescription)}>Edit Prescription</button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );



};

export default App;*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Set up the token
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2UyNTIxMTRjZTY3MmY3OTU5YTkyOCIsImlhdCI6MTczMjEyNTk4NSwiZXhwIjoxNzQwNzY1OTg1fQ.kWcY25jXnyqlu6SFrk2Y0xk6959qIMmKXQlpPEgbvJQ'; // Replace this with your actual token

const App = () => {
    const [patients, setPatients] = useState([]); // Holds patient list
    const [filteredPatients, setFilteredPatients] = useState([]); // State for filtered patients
    const [selectedPatient, setSelectedPatient] = useState(null); // Currently selected patient
    const [prescriptions, setPrescriptions] = useState([]); // Holds prescriptions
    const [loadingPrescriptions, setLoadingPrescriptions] = useState(false); // Loading indicator
    const [editMode, setEditMode] = useState(null); // Track the prescription in edit mode
    const [newValues, setNewValues] = useState({}); // State for tracking changes for all medications
    const [searchTerm, setSearchTerm] = useState(''); // Search term for filtering

    // Fetch patients on component mount
    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPatients(response.data);
                setFilteredPatients(response.data); // Initialize filtered patients
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };
        fetchPatients();
    }, []);

    // Filter patients based on search term
    useEffect(() => {
        if (searchTerm === '') {
            setFilteredPatients(patients);
        } else {
            setFilteredPatients(
                patients.filter((patient) =>
                    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }
    }, [searchTerm, patients]);

    // Fetch prescriptions for a selected patient
    const fetchPrescriptions = async (patientId) => {
        setLoadingPrescriptions(true);
        try {
            const response = await axios.get(`http://localhost:4000/prescription/presc/${patientId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPrescriptions(response.data);
            setNewValues(
                response.data.reduce((acc, prescription) => {
                    acc[prescription.issueDate] = prescription.medications.map((med) => ({
                        newname: med.name,
                        newdosage: med.dosage,
                        newfrequency: med.frequency,
                        newduration: med.duration,
                    }));
                    return acc;
                }, {})
            ); // Initialize state for edits
        } catch (error) {
            console.error('Error fetching prescriptions:', error);
            setPrescriptions([]);
        } finally {
            setLoadingPrescriptions(false);
        }
    };

    // Handle patient selection
    const handlePatientSelect = (patient) => {
        setSelectedPatient(patient);
        fetchPrescriptions(patient._id);
    };

    // Handle input changes for medications
    const handleInputChange = (issueDate, medIndex, field, value) => {
        setNewValues((prevValues) => {
            const updated = { ...prevValues };
            updated[issueDate][medIndex][field] = value;
            return updated;
        });
    };

    // Handle saving updated medications
    const updateMedicalHistory = async (issueDate) => {
        const updates = newValues[issueDate]; // Get updates for this prescription
        const payload = updates.map((update, index) => ({
            name: prescriptions.find((pres) => pres.issueDate === issueDate).medications[index].name,
            dosage: prescriptions.find((pres) => pres.issueDate === issueDate).medications[index].dosage,
            frequency: prescriptions.find((pres) => pres.issueDate === issueDate).medications[index].frequency,
            duration: prescriptions.find((pres) => pres.issueDate === issueDate).medications[index].duration,
            ...update, // Include the new values
        }));

        try {
            await axios.put(
                'http://localhost:4000/prescription/medireco/history/update',
                { updates }, // Send array of updates
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert('Medical history updated successfully');
            fetchPrescriptions(selectedPatient._id); // Refresh prescriptions
            setEditMode(null); // Exit edit mode
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };

    return (
        <div>
            <h1>Patient Prescription System</h1>
            <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                    <h2>Patients</h2>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by patient name"
                    />
                    <ul>
                        {filteredPatients.map((patient) => (
                            <li key={patient._id} onClick={() => handlePatientSelect(patient)}>
                                {patient.name} - {patient.age} years old
                            </li>
                        ))}
                    </ul>
                </div>

                <div style={{ flex: 2 }}>
                    {loadingPrescriptions ? (
                        <p>Loading prescriptions...</p>
                    ) : (
                        <div>
                            <h2>Prescriptions</h2>
                            {prescriptions.map((prescription) => (
                                <div
                                    key={prescription.issueDate}
                                    style={{ border: '1px solid black', marginBottom: '10px', padding: '10px' }}
                                >
                                    <h3>Prescription issued on: {prescription.issueDate}</h3>
                                    <p>Status: {prescription.status}</p>
                                    <h4>Medications</h4>

                                    {editMode === prescription.issueDate ? (
                                        <div>
                                            {newValues[prescription.issueDate].map((med, medIndex) => (
                                                <div key={medIndex} style={{ marginBottom: '10px' }}>
                                                    <input
                                                        type="text"
                                                        value={med.newname}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                prescription.issueDate,
                                                                medIndex,
                                                                'newname',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Name"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={med.newdosage}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                prescription.issueDate,
                                                                medIndex,
                                                                'newdosage',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Dosage"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={med.newfrequency}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                prescription.issueDate,
                                                                medIndex,
                                                                'newfrequency',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Frequency"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={med.newduration}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                prescription.issueDate,
                                                                medIndex,
                                                                'newduration',
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Duration"
                                                    />
                                                </div>
                                            ))}
                                            <button onClick={() => updateMedicalHistory(prescription.issueDate)}>
                                                Save Changes
                                            </button>
                                        </div>
                                    ) : (
                                        <ul>
                                            {prescription.medications.map((med, medIndex) => (
                                                <li key={medIndex}>
                                                    <strong>Name:</strong> {med.name},{' '}
                                                    <strong>Dosage:</strong> {med.dosage},{' '}
                                                    <strong>Frequency:</strong> {med.frequency},{' '}
                                                    <strong>Duration:</strong> {med.duration}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <button onClick={() => setEditMode(prescription.issueDate)}>
                                        Edit Prescription
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
