import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  useParams } from 'react-router-dom';
const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [formData, setFormData] = useState({
        contactNumber: '',
        age: '',
        address: '',
        medicalHistory: '',
        image: null,
    });
    const { doctorId } = useParams();
    const token = localStorage.getItem('token');
    useEffect(() => {
        // Fetch patients when the component loads
        axios.get('http://localhost:4000/pati/pa')
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
    }, []);

    const handlePatientClick = (patient) => {
        setSelectedPatient(patient);
        // Populate form with existing patient data
        setFormData({
            contactNumber: patient.contactNumber || '',
            age: patient.age || '',
            address: patient.address || '',
            medicalHistory: patient.medicalHistory || '',
            image: null,  // Reset the image file
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleUpdate = (e) => {
        e.preventDefault();

        const form = new FormData();
        form.append('contactNumber', formData.contactNumber);
        form.append('age', formData.age);
        form.append('address', formData.address);
        form.append('medicalHistory', formData.medicalHistory);
        if (formData.image) {
            form.append('image', formData.image);
        }

        axios.put(`http://localhost:4000/pati/${doctorId}/patients/${selectedPatient._id}/${selectedPatient.contactNumber}`, form, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        })
            .then(response => {
                alert('Patient updated successfully!');
                
                // Optionally refresh patient list or update the UI
                window.location.reload();
            })
            .catch(error => console.error('Error updating patient:', error));
    };

    return (
        <div>
            <h1>Patients List</h1>
            <ul>
                {patients.map(patient => (
                    <li key={patient._id} onClick={() => handlePatientClick(patient)}>
                        {patient.name} - {patient.contactNumber}
                    </li>
                ))}
            </ul>

            {selectedPatient && (
                <div>
                    <h2>Update Patient: {selectedPatient.name}</h2>
                    <form onSubmit={handleUpdate}>
                        <div>
                            <label>Contact Number</label>
                            <input
                                type="text"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Medical History</label>
                            <textarea
                                name="medicalHistory"
                                value={formData.medicalHistory}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>Image</label>
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                            />
                        </div>
                        <button type="submit">Update Patient</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default PatientList;
