/*// src/components/DoctorUpdate.js
import React, { useState, useContext } from 'react';
import { updateDoctor } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
const DoctorUpdate = () => {
    const [existingEmail, setExistingEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [newName, setNewName] = useState('');
    const { token } = useContext(DoctorContext);
    const navigate = useNavigate();
    const handleUpdate = async () => {
        try {
            // Create doctorData object with the new details
            const doctorData = {
                name: newName,
                email: newEmail,
            };

            // Call the updateDoctor function with the existing email, new data, and token
            await updateDoctor(existingEmail, doctorData, token);
            alert('Doctor updated successfully');
            navigate('/login');
        } catch (error) {
            
            alert('Error updating doctor. Please check the console for more details.');
        }
    };

    return (
        <div>
            <h2>Update Doctor</h2>
            <div>
                <label>Existing Email:</label>
                <input
                    type="email"
                    value={existingEmail}
                    onChange={(e) => setExistingEmail(e.target.value)}
                    placeholder="Enter the existing doctor's email"
                />
            </div>
            <div>
                <label>New Email:</label>
                <input
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Enter the new email"
                />
            </div>
            <div>
                <label>New Name:</label>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter the new name"
                />
            </div>
            <button onClick={handleUpdate}>Update Doctor</button>
        </div>
    );
};

export default DoctorUpdate;*/
import React, { useState, useContext } from 'react';
import { updateDoctor } from '../services/doctorService';

import { useNavigate } from 'react-router-dom';
const DoctorUpdate = () => {
    const [existingEmail, setExistingEmail] = useState('');
    const [newPhone, setNewPhone] = useState('');
    const [newspecialization, setNewSpecialization] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2NiMWZiODdiN2M2YTMwM2MwZjE3ZiIsImlhdCI6MTczMjAzMDk3MiwiZXhwIjoxNzQwNjcwOTcyfQ.bIz3nmgmlGU9I9aCNG2dL1n9n1vra6Ix18OW13bj5wA'; // Manually set the token here
    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            const doctorData = {
                phone: newPhone, specialization: newspecialization
            };
            await updateDoctor(existingEmail, doctorData, token);
            alert('Doctor updated successfully');
           /* navigate('/login');*/
        } catch (error) {
            alert('Error updating doctor. Please check the console for more details.');
        }
    };

    return (
        <div>
            <h2>Update Doctor</h2>
            <div>
                <label>Existing Email:</label>
                <input
                    type="email"
                    value={existingEmail}
                    onChange={(e) => setExistingEmail(e.target.value)}
                    placeholder="Enter the existing doctor's email"
                />
            </div>
            <div>
                <label>New Email:</label>
                <input
                    type="text"
                    value={newPhone}
                    onChange={(e) => setNewPhone (e.target.value)}
                    placeholder="Enter the new phone"
                />
            </div>
            <div>
                <label>New Name:</label>
                <input
                    type="text"
                    value={newspecialization}
                    onChange={(e) => setNewSpecialization (e.target.value)}
                    placeholder="Enter the new specialization"
                />
            </div>
            <button onClick={handleUpdate}>Update Doctor</button>
        </div>
    );
};

export default DoctorUpdate;
