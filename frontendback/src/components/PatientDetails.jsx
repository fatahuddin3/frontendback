/*import React, { useState } from 'react';
import { fetchPatientDetails } from '../services/doctorService';

const PatientDetails = () => {
    const [contactNumber, setContactNumber] = useState('');
    const [patientDetails, setPatientDetails] = useState(null);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmNhNzM4MzM2MDI5NmIxYTI0NjMzZSIsImlhdCI6MTcyNzgzMzkxMiwiZXhwIjoxNzMwNDI1OTEyfQ.HYPLR8EBFSnGlxrJF93W67LTsLNhxMX3K8XWbzkeoas'; // Manually set the token here

    const handleFetchDetails = async () => {
        try {
            const response = await fetchPatientDetails(contactNumber, token);
            setPatientDetails(response.data);
        } catch (error) {
            console.error('Error fetching patient details:', error);
            alert('Error fetching patient details. Please check the console for more details.');
        }
    };

    return (
        <div>
            <h2>Fetch Patient Details</h2>
            <div>
                <label>Contact Number:</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter the contact number"
                />
            </div>
            <button onClick={handleFetchDetails}>Fetch Details</button>

            {patientDetails && (
                <div>
                    <h3>Patient Details</h3>
                    <p><strong>ID:</strong> {patientDetails._id}</p>
                    <p><strong>Name:</strong> {patientDetails.name}</p>
                    <p><strong>Age:</strong> {patientDetails.age}</p>
                    <p><strong>Gender:</strong> {patientDetails.gender}</p>
                    <p><strong>Address:</strong> {patientDetails.address}</p>
                    <p><strong>Contact Number:</strong> {patientDetails.contactNumber}</p>
                    <p><strong>Medical History:</strong> {patientDetails.medicalHistory}</p>
                </div>
            )}
        </div>
    );
};

export default PatientDetails;*/


import React, { useState } from 'react';
import { fetchPatientDetails } from '../services/doctorService';

const PatientDetails = () => {
    const [contactNumber, setContactNumber] = useState('');
    const [patientDetails, setPatientDetails] = useState(null);
    
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTM3MjExOWNkYmYyNWUxNTRmMzZhNiIsImlhdCI6MTcyOTMyNzYzNCwiZXhwIjoxNzMxOTE5NjM0fQ.0TY4fCj7ABB5wAJN5gupKpE3QK9gAQvmZbK4E-SPz4E'; // Manually set the token here

    const handleFetchDetails = async () => {
        try {
            const response = await fetchPatientDetails(contactNumber, token);
            setPatientDetails(response.data);
            
        } catch (error) {
            console.error('Error fetching patient details:', error);
            alert('Error fetching patient details. Please check the console for more details.');
        }
    };

    return (
        <div>
            <h2>Fetch Patient Details</h2>
            <div>
                <label>Contact Number:</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter the contact number"
                />
            </div>
            <button onClick={handleFetchDetails}>Fetch Details</button>

            {patientDetails && (
                <div>
                    <h3>Patient Details</h3>
                    <p><strong>ID:</strong> {patientDetails._id}</p>
                    <p><strong>Name:</strong> {patientDetails.name}</p>
                    <p><strong>Age:</strong> {patientDetails.age}</p>
                    <p><strong>Gender:</strong> {patientDetails.gender}</p>
                    <p><strong>Address:</strong> {patientDetails.address}</p>
                    <p><strong>Contact Number:</strong> {patientDetails.contactNumber}</p>
                    <p><strong>Medical History:</strong> {patientDetails.medicalHistory}</p>

                    {patientDetails.image ? (
                        <div>
                            <p><strong>Image:</strong></p>
                            <img src={`http://localhost:4000${patientDetails.image}`} alt="Patient" style={{ width: '200px', height: 'auto' }} />
                        </div>
                    ) : (
                        <p>No image available for this patient.</p>
                    )}

                    
                </div>
            )}
        </div>
    );
};

export default PatientDetails;
/*
import React, { useState } from 'react';
import { fetchPatientDetails } from '../services/doctorService';

const PatientDetails = () => {
    const [contactNumber, setContactNumber] = useState('');
    const [patientDetails, setPatientDetails] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');  // New state for error messages
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmMxNWVmYjFkYTA5OTEyOTAxMGFiOSIsImlhdCI6MTcyNzc5NjcxOSwiZXhwIjoxNzMwMzg4NzE5fQ.j3XznkkWStFHdZkrep3lnKhyd_w9DHFMYa5uY6ryicQ'; // Manually set the token here

    const handleFetchDetails = async () => {
        setErrorMessage('');  // Clear any previous errors
        setPatientDetails(null); // Clear previous details

        try {
            const response = await fetchPatientDetails(contactNumber, token);
            setPatientDetails(response.data);  // Store the fetched patient data
        } catch (error) {
            console.error('Error fetching patient details:', error);
            setErrorMessage('Error fetching patient details. Please check the contact number and try again.');
        }
    };

    return (
        <div>
            <h2>Fetch Patient Details</h2>
            <div>
                <label>Contact Number:</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Enter the contact number"
                />
            </div>
            <button onClick={handleFetchDetails}>Fetch Details</button>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}*//* {*//* Show error if present *//*}

            {patientDetails && (
                <div>
                    <h3>Patient Details</h3>
                    <p><strong>ID:</strong> {patientDetails._id}</p>
                    <p><strong>Name:</strong> {patientDetails.name}</p>
                    <p><strong>Age:</strong> {patientDetails.age}</p>
                    <p><strong>Gender:</strong> {patientDetails.gender}</p>
                    <p><strong>Address:</strong> {patientDetails.address}</p>
                    <p><strong>Contact Number:</strong> {patientDetails.contactNumber}</p>
                    <p><strong>Medical History:</strong> {patientDetails.medicalHistory}</p>

                   {*//* *//*}{*//* Display patient image if available *//*}{*//*
                    {patientDetails.image ? (
                        <div>
                            <p><strong>Image:</strong></p>
                            <img src={patientDetails.image} alt="Patient" style={{ width: '200px', height: 'auto' }} />
                        </div>
                    ) : (
                        <p>No image available for this patient.</p>
                    )}*//*}
                </div>
            )}
        </div>
    );
};

export default PatientDetails;
*/