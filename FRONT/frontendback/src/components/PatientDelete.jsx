import React, { useState } from 'react';
import { deletePatient } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
const DoctorDelete = () => {
    const [contactNumber, setcontactNumber] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjYxMmNlYzZkOTA5YzNjYjc5MDY5YiIsImlhdCI6MTcyNzQwMjcwMiwiZXhwIjoxNzI5OTk0NzAyfQ.VaFRmE4pzxZ96nUUi04bWJyMEb6GPDnv4BJxZ5lqVUQ';
    const navigate = useNavigate();
    const validateForm = () => {
        if(! contactNumber) {
            alert('Please enter the doctor\'s contactNumber.');
            return false;
        }
       
        return true;
    };

    const handleDelete = async () => {
        if (!validateForm()) return;

        try {
            await deletePatient(contactNumber, token);
            alert('Patient deleted successfully');
            
        } catch (error) {
            alert(`Error deleting doctor: ${error.message}`);
        }
    };
    return (
        <div>
            <h2>Delete Patient</h2>
            <input
                type="text"
                value={contactNumber}
                onChange={(e) => setcontactNumber(e.target.value)}
                placeholder="Enter contactnumber"
            />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DoctorDelete;