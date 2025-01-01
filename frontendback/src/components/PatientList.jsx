/*import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const PatientList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered doctors
    // Track selected specialization
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjU5MThjMThmOGRjNDRkMjFkYTQ0NyIsImlhdCI6MTcyNzM2OTYxMywiZXhwIjoxNzI5OTYxNjEzfQ.OHqL2eJ2SwrL5MF2ew4Yza6YWVdgWjOqAkaGE8cmVds'; // Manually set the token here
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getPatients(token);
                if (response.data && Array.isArray(response.data)) {
                    setDoctors(response.data); // Store the doctors
                    setFilteredDoctors(response.data); // Initially, all doctors are displayed
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching doctors: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    // Handle specialization filtering
    

    return (
        <div>
            <h2>Patient List</h2>

           
           

           
            <ul className="doctor-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <li key={doctor._id} className="doctor-item">
                            <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                            <button onClick={() => navigate('/docup')}>Update</button>
                            <button onClick={() => navigate('/intro', { state: doctor })}>Intro</button>
                        </li>
                    ))
                ) : (
                    <p>No doctors found or unable to fetch data.</p>
                )}
            </ul>
        </div>
    );
};

export default PatientList;*/

/*import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const PatientList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Filtered doctors
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjYxMmNlYzZkOTA5YzNjYjc5MDY5YiIsImlhdCI6MTcyNzQwMjcwMiwiZXhwIjoxNzI5OTk0NzAyfQ.VaFRmE4pzxZ96nUUi04bWJyMEb6GPDnv4BJxZ5lqVUQ'; // Replace with actual token
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getPatients(token);
                if (response.data && Array.isArray(response.data)) {
                    setDoctors(response.data); // Store the patients
                    setFilteredDoctors(response.data); // Initially, all patients are displayed
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching patients: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    return (
        <div>
            <h2>Patient List</h2>
            <ul className="doctor-list">
                {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((doctor) => (
                        <li key={doctor._id} className="doctor-item">
                            <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                            <button onClick={() => navigate('/docup')}>Update</button>
                            <button onClick={() => navigate('/intro', { state: doctor })}>Intro</button>
                        </li>
                    ))
                ) : (
                    <p>No patients found or unable to fetch data.</p>
                )}
            </ul>
        </div>
    );
};

export default PatientList;*/
//above code is without male and female system
/*import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const PatientList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [malePatients, setMalePatients] = useState([]); // Male patients
    const [femalePatients, setFemalePatients] = useState([]); // Female patients
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjYxMmNlYzZkOTA5YzNjYjc5MDY5YiIsImlhdCI6MTcyNzQwMjcwMiwiZXhwIjoxNzI5OTk0NzAyfQ.VaFRmE4pzxZ96nUUi04bWJyMEb6GPDnv4BJxZ5lqVUQ'; // Replace with actual token
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getPatients(token);
                if (response.data && Array.isArray(response.data)) {
                    const patients = response.data;

                    // Split patients based on gender
                    const males = patients.filter(doctor => doctor.gender === 'male');
                    const females = patients.filter(doctor => doctor.gender === 'female');

                    setDoctors(patients); // Store all patients
                    setMalePatients(males); // Store male patients
                    setFemalePatients(females); // Store female patients
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching patients: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    return (
        <div>
            <h2>Patient List</h2>

            <div className="patient-category">
                <h3>Male Patients</h3>
                <ul className="doctor-list">
                    {malePatients.length > 0 ? (
                        malePatients.map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/docup')}>Update</button>
                                <button onClick={() => navigate('/intro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No male patients found.</p>
                    )}
                </ul>
            </div>

            <div className="patient-category">
                <h3>Female Patients</h3>
                <ul className="doctor-list">
                    {femalePatients.length > 0 ? (
                        femalePatients.map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/docup')}>Update</button>
                                <button onClick={() => navigate('/intro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No female patients found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PatientList;*/
//above code is without age system
/*import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const PatientList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [malePatients, setMalePatients] = useState([]); // Male patients
    const [femalePatients, setFemalePatients] = useState([]); // Female patients
    const [ageFilter, setAgeFilter] = useState(''); // Selected age filter
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjYxMmNlYzZkOTA5YzNjYjc5MDY5YiIsImlhdCI6MTcyNzQwMjcwMiwiZXhwIjoxNzI5OTk0NzAyfQ.VaFRmE4pzxZ96nUUi04bWJyMEb6GPDnv4BJxZ5lqVUQ'; // Replace with actual token
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getPatients(token);
                if (response.data && Array.isArray(response.data)) {
                    const patients = response.data;

                    // Split patients based on gender
                    const males = patients.filter(doctor => doctor.gender === 'male');
                    const females = patients.filter(doctor => doctor.gender === 'female');

                    setDoctors(patients); // Store all patients
                    setMalePatients(males); // Store male patients
                    setFemalePatients(females); // Store female patients
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching patients: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    // Function to handle filtering patients by age
    const filterPatientsByAge = (patients) => {
        switch (ageFilter) {
            case 'below20':
                return patients.filter(doctor => doctor.age < 20);
            case 'between20and40':
                return patients.filter(doctor => doctor.age >= 20 && doctor.age < 40);
            case 'between40and100':
                return patients.filter(doctor => doctor.age >= 40 && doctor.age < 100);
            default:
                return patients; // No filter applied
        }
    };

    return (
        <div>
            <h2>Patient List</h2>

            {*//* Age Filter Dropdown *//*}
            <div>
                <label htmlFor="ageFilter">Filter by Age:</label>
                <select id="ageFilter" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                    <option value="">All Ages</option>
                    <option value="below20">Age below 20</option>
                    <option value="between20and40">Age between 20 and 40</option>
                    <option value="between40and100">Age between 40 and 100</option>
                </select>
            </div>

            {*//* Male Patients Section *//*}
            <div className="patient-category">
                <h3>Male Patients</h3>
                <ul className="doctor-list">
                    {filterPatientsByAge(malePatients).length > 0 ? (
                        filterPatientsByAge(malePatients).map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/docup')}>Update</button>
                                <button onClick={() => navigate('/intro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No male patients found.</p>
                    )}
                </ul>
            </div>

            {*//* Female Patients Section *//*}
            <div className="patient-category">
                <h3>Female Patients</h3>
                <ul className="doctor-list">
                    {filterPatientsByAge(femalePatients).length > 0 ? (
                        filterPatientsByAge(femalePatients).map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/docup')}>Update</button>
                                <button onClick={() => navigate('/intro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No female patients found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PatientList;
*/
//real code below real code
/*import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const PatientList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [malePatients, setMalePatients] = useState([]); // Male patients
    const [femalePatients, setFemalePatients] = useState([]); // Female patients
    const [ageFilter, setAgeFilter] = useState(''); // Selected age filter
    const [medicalHistoryFilter, setMedicalHistoryFilter] = useState('');
   
    // Selected medical history filter
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc2OGU3YTQ4NWExMzlmNDE3YTdjMCIsImlhdCI6MTcyOTU4NzQzMSwiZXhwIjoxNzMyMTc5NDMxfQ.64eEqcTA_Q0brDlj1CLQPUtqKT0YNUOZWJLJZbPaxBM'; // Replace with actual token
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getPatients(token);
                if (response.data && Array.isArray(response.data)) {
                    const patients = response.data;

                    
                    const males = patients.filter(doctor => doctor.gender === 'male');
                    const females = patients.filter(doctor => doctor.gender === 'female');

                    setDoctors(patients); // Store all patients
                    setMalePatients(males); // Store male patients
                    setFemalePatients(females); // Store female patients
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching patients: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);
  
    // Function to handle filtering patients by age
    const filterPatientsByAge = (patients) => {
        switch (ageFilter) {
            case 'below20':
                return patients.filter(doctor => doctor.age < 20);
            case 'between20and40':
                return patients.filter(doctor => doctor.age >= 20 && doctor.age < 40);
            case 'between40and100':
                return patients.filter(doctor => doctor.age >= 40 && doctor.age < 100);
            default:
                return patients; // No age filter applied
        }
    };

    // Function to handle filtering patients by medical history
    const filterPatientsByMedicalHistory = (patients) => {
        if (medicalHistoryFilter) {
            return patients.filter(doctor => doctor.medicalHistory === medicalHistoryFilter);
        }
        return patients; // No medical history filter applied
    };

    // Combine both age and medical history filters
    const applyFilters = (patients) => {
        const filteredByAge = filterPatientsByAge(patients);
        return filterPatientsByMedicalHistory(filteredByAge);
    };

    // Get unique medical history options from all doctors
    const getUniqueMedicalHistories = () => {
        const medicalHistories = doctors.map(doctor => doctor.medicalHistory);
        return [...new Set(medicalHistories)]; // Return unique medical histories
    };

    return (
        <div>
            <h2>Patient List</h2>
           
           
            <div>
                <label htmlFor="ageFilter">Filter by Age:</label>
                <select id="ageFilter" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                    <option value="">All Ages</option>
                    <option value="below20">Age below 20</option>
                    <option value="between20and40">Age between 20 and 40</option>
                    <option value="between40and100">Age between 40 and 100</option>
                </select>
            </div>
            
            <div>
                <label htmlFor="medicalHistoryFilter">Filter by Medical History:</label>
                <select id="medicalHistoryFilter" value={medicalHistoryFilter} onChange={(e) => setMedicalHistoryFilter(e.target.value)}>
                    <option value="">All Medical Histories</option>
                    {getUniqueMedicalHistories().map((history, index) => (
                        <option key={index} value={history}>{history}</option>
                    ))}
                </select>
            </div>

           
            <div className="patient-category">
                <h3>Male Patients</h3>
                <ul className="doctor-list">
                    {applyFilters(malePatients).length > 0 ? (
                        applyFilters(malePatients).map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/patiup')}>Update</button>
                                <button onClick={() => navigate('/patintro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No male patients found.</p>
                    )}
                </ul>
            </div>

            
            <div className="patient-category">
                <h3>Female Patients</h3>
                <ul className="doctor-list">
                    {applyFilters(femalePatients).length > 0 ? (
                        applyFilters(femalePatients).map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/patiup')}>Update</button>
                                <button onClick={() => navigate('/patintro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No female patients found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PatientList;*/


import React, { useEffect, useState } from 'react';
import { getPatients } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
import '../css/DoctorList.css'; // Import the CSS

const PatientList = () => {
    const [doctors, setDoctors] = useState([]); // All doctors from API
    const [malePatients, setMalePatients] = useState([]); // Male patients
    const [femalePatients, setFemalePatients] = useState([]); // Female patients
    const [ageFilter, setAgeFilter] = useState(''); // Selected age filter
    const [medicalHistoryFilter, setMedicalHistoryFilter] = useState(''); // Selected medical history filter
    const [searchTerm, setSearchTerm] = useState(''); // Search term

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc2OGU3YTQ4NWExMzlmNDE3YTdjMCIsImlhdCI6MTcyOTU4NzQzMSwiZXhwIjoxNzMyMTc5NDMxfQ.64eEqcTA_Q0brDlj1CLQPUtqKT0YNUOZWJLJZbPaxBM'; // Replace with actual token
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await getPatients(token);
                if (response.data && Array.isArray(response.data)) {
                    const patients = response.data;

                    const males = patients.filter(doctor => doctor.gender === 'male');
                    const females = patients.filter(doctor => doctor.gender === 'female');

                    setDoctors(patients); // Store all patients
                    setMalePatients(males); // Store male patients
                    setFemalePatients(females); // Store female patients
                } else {
                    alert('Received unexpected data format.');
                }
            } catch (error) {
                alert(`Error fetching patients: ${error.message}`);
            }
        };

        fetchDoctors();
    }, [token]);

    // Function to handle search input
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value); // Update the search term
    };

    // Function to filter patients by age
    const filterPatientsByAge = (patients) => {
        switch (ageFilter) {
            case 'below20':
                return patients.filter(doctor => doctor.age < 20);
            case 'between20and40':
                return patients.filter(doctor => doctor.age >= 20 && doctor.age < 40);
            case 'between40and100':
                return patients.filter(doctor => doctor.age >= 40 && doctor.age < 100);
            default:
                return patients; // No age filter applied
        }
    };

    // Function to filter patients by medical history
    const filterPatientsByMedicalHistory = (patients) => {
        if (medicalHistoryFilter) {
            return patients.filter(doctor => doctor.medicalHistory === medicalHistoryFilter);
        }
        return patients; // No medical history filter applied
    };

    // Combine age, medical history, and search term filters
    const applyFilters = (patients) => {
        // If no search term, return the full list
        let filteredPatients = patients;

        // Apply filters for age and medical history only when there is something selected
        filteredPatients = filterPatientsByAge(filteredPatients);
        filteredPatients = filterPatientsByMedicalHistory(filteredPatients);

        // If there's a search term, filter by name
        if (searchTerm) {
            filteredPatients = filteredPatients.filter(doctor =>
                doctor.name.toLowerCase().includes(searchTerm)
            );
        }

        return filteredPatients;
    };

    // Get unique medical history options from all doctors
    const getUniqueMedicalHistories = () => {
        const medicalHistories = doctors.map(doctor => doctor.medicalHistory);
        return [...new Set(medicalHistories)]; // Return unique medical histories
    };

    return (
        <div>
            <h2>Patient List</h2>
            <input
                type="text"
                placeholder="Search by patient name"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '20px', padding: '5px' }}
            />

            <div>
                <label htmlFor="ageFilter">Filter by Age:</label>
                <select id="ageFilter" value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)}>
                    <option value="">All Ages</option>
                    <option value="below20">Age below 20</option>
                    <option value="between20and40">Age between 20 and 40</option>
                    <option value="between40and100">Age between 40 and 100</option>
                </select>
            </div>

            <div>
                <label htmlFor="medicalHistoryFilter">Filter by Medical History:</label>
                <select id="medicalHistoryFilter" value={medicalHistoryFilter} onChange={(e) => setMedicalHistoryFilter(e.target.value)}>
                    <option value="">All Medical Histories</option>
                    {getUniqueMedicalHistories().map((history, index) => (
                        <option key={index} value={history}>{history}</option>
                    ))}
                </select>
            </div>

            <div className="patient-category">
                <h3>Male Patients</h3>
                <ul className="doctor-list">
                    {applyFilters(malePatients).length > 0 ? (
                        applyFilters(malePatients).map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/patiup')}>Update</button>
                                <button onClick={() => navigate('/patintro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No male patients found.</p>
                    )}
                </ul>
            </div>

            <div className="patient-category">
                <h3>Female Patients</h3>
                <ul className="doctor-list">
                    {applyFilters(femalePatients).length > 0 ? (
                        applyFilters(femalePatients).map((doctor) => (
                            <li key={doctor._id} className="doctor-item">
                                <p>{doctor.name} - {doctor.medicalHistory} - {doctor.age}</p>
                                <button onClick={() => navigate('/patiup')}>Update</button>
                                <button onClick={() => navigate('/patintro', { state: doctor })}>Intro</button>
                            </li>
                        ))
                    ) : (
                        <p>No female patients found.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default PatientList;


