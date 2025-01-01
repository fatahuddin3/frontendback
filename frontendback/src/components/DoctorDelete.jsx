

/*const DoctorDelete = () => {
    const [email, setEmail] = useState('');
    const { token } = useContext(DoctorContext);

    const validateForm = () => {
        if (!email) {
            alert('Please enter the doctor\'s email.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        return true;
    };

    const handleDelete = async () => {
        if (!validateForm()) return;

        try {
            await deleteDoctor(email, token);
            alert('Doctor deleted successfully');
        } catch (error) {
            alert(`Error deleting doctor: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Delete Doctor</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter doctor's email"
            />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DoctorDelete;
*/
// src/components/DoctorDelete.js
import React, { useState } from 'react';
import { deleteDoctor } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';
const DoctorDelete = () => {
    const [email, setEmail] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjUzMzJhMTA5ZmI5ZGNjOTY0YTM5NiIsImlhdCI6MTcyNzM0NTQ1MSwiZXhwIjoxNzI5OTM3NDUxfQ.roWiHSTElm4ZxZQPr4Od1iaCgcZ5M6KU2oJ9PsZ0IPc';
    const navigate = useNavigate();
    const validateForm = () => {
        if (!email) {
            alert('Please enter the doctor\'s email.');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Invalid email format.');
            return false;
        }
        return true;
    };

    const handleDelete = async () => {
        if (!validateForm()) return;

        try {
            await deleteDoctor(email, token);
            alert('Doctor deleted successfully');
            navigate('/login');
        } catch (error) {
            alert(`Error deleting doctor: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Delete Doctor</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter doctor's email"
            />
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default DoctorDelete;