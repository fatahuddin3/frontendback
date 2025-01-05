/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [doctor, setDoctors] = useState([]);
    const [patientid, setPatientid] = useState('');
    const [nurseid, setDoctorid] = useState('');
    
    const [medications, setMedications] = useState([]);
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
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(response.data);
            } catch (error) {
                console.error('Error fetching nurses:', error);
                setError('Failed to load nurses.');
            }
        };

        fetchDoctors();
    }, []);

    
    const handleAddMedication = () => {
        setMedications([...medications, { reason_for_admission: '', preferred_ward: ''}]);
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

    // Removed dependency on token
    const handleUpdate = async () => {
     

        try {
            const response = await axios.post(`http://localhost:4000/user/admissions/initiate/${patientid}/${nurseid}`, {
                recommendation_details:medications,
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

            {*//* Display error or success messages *//*}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {*//* Dropdown for assignment ID *//*}
            <div style={{ padding: '1rem', borderRight: '1px solid #ccc' }}>
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
                    {doctor.map((doc) => (
                        <li
                            key={doc._id}
                            onClick={() => setDoctorid(doc._id)}
                            style={{ cursor: 'pointer', margin: '0.5rem 0' }}
                        >
                            {doc.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>Medications</h2>
                {medications.map((med, index) => (
                    <div key={index} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={med.reason_for_admission}
                            onChange={(e) => handleMedicationChange(index, 'reason_for_admission', e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Dose"
                            value={med.preferred_ward}
                            onChange={(e) => handleMedicationChange(index, 'preferred_ward', e.target.value)}
                        />
                        <button onClick={() => handleRemoveMedication(index)}>Remove</button>
                    </div>
                ))}
                <button onClick={handleAddMedication}>Add Medication</button>
            </div>

            <button
                onClick={handleUpdate}
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

export default NurseActivities;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [patientid, setPatientid] = useState('');
    const [nurseid, setNurseid] = useState('');
    const [medications, setMedications] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGE4YThlNjY4YTUzMGVjZmYxZDBmYSIsImlhdCI6MTczMjkzODM4MywiZXhwIjoxNzQxNTc4MzgzfQ.oQqbR1LACej5tWeuWiOfVsoOmAYI4w5KGmtlRoD5Sf8';

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
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
                const response = await axios.get('http://localhost:4000/doctors/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setNurses(response.data);
            } catch (error) {
                setError('Failed to load nurses.');
            }
        };

        fetchNurses();
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
                `http://localhost:4000/user/admissions/initiate/${patientid}/${nurseid}`,
                { recommendation_details: medications }, {
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
                        {patient.name}
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
            {medications.map((med, index) => (
                <div key={index}>
                    <input
                        placeholder="Reason"
                        value={med.reason_for_admission}
                        onChange={(e) => handleMedicationChange(index, 'reason_for_admission', e.target.value)}
                    />
                    <input
                        placeholder="Ward"
                        value={med.preferred_ward}
                        onChange={(e) => handleMedicationChange(index, 'preferred_ward', e.target.value)}
                    />
                    <button onClick={() => handleRemoveMedication(index)}>Remove</button>
                </div>
            ))}
            <button onClick={handleAddMedication}>Add Medication</button>

            <button onClick={handleUpdate}>Submit</button>
        </div>
    );
};

export default NurseActivities;

//above code and below both are right but above accepts recommendation_details array and save array in mongodb where
//below don't accept array but accept object and save object in mongodb

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NurseActivities = () => {
    const [patients, setPatients] = useState([]);
    const [nurses, setNurses] = useState([]);
    const [patientid, setPatientid] = useState('');
    const [nurseid, setNurseid] = useState('');
    const [recommendationDetails, setRecommendationDetails] = useState({ reason_for_admission: '', preferred_ward: '' });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const token = 'YOUR_TOKEN_HERE';

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/pati/pa', {
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
                const response = await axios.get('http://localhost:4000/doctors/', {
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
                `http://localhost:4000/user/admissionss/initiate/${patientid}/${nurseid}`,
                { recommendation_details: recommendationDetails },
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

            <h2>Patient List</h2>
            <ul>
                {patients.map((patient) => (
                    <li key={patient._id} onClick={() => setPatientid(patient._id)}>
                        {patient.name}
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

            <h2>Recommendation Details</h2>
            <input
                type="text"
                placeholder="Reason for Admission"
                value={recommendationDetails.reason_for_admission}
                onChange={(e) => setRecommendationDetails({ ...recommendationDetails, reason_for_admission: e.target.value })}
            />
            <input
                type="text"
                placeholder="Preferred Ward"
                value={recommendationDetails.preferred_ward}
                onChange={(e) => setRecommendationDetails({ ...recommendationDetails, preferred_ward: e.target.value })}
            />

            <button onClick={handleUpdate}>Submit</button>
        </div>
    );
};

export default NurseActivities;*/
