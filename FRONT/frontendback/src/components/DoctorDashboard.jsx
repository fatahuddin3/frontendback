/*// src/components/DoctorDashboard.js
import React, { useEffect, useContext, useState } from 'react';
import { getDoctors, deleteDoctor } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';

const DoctorDashboard = () => {
    const { token } = useContext(DoctorContext);
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await getDoctors(token);
            setDoctors(response.data);
        };
        fetchDoctors();
    }, [token]);

    const handleDelete = async (email) => {
        await deleteDoctor(email, token);
        setDoctors(doctors.filter(doctor => doctor.email !== email));
    };

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.email}>
                        {doctor.name} - {doctor.specialization}
                        <button onClick={() => handleDelete(doctor.email)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorDashboard;*/

// src/components/DoctorDashboard.js
import React, { useEffect, useState } from 'react';
import { getDoctors, deleteDoctor } from '../services/doctorService';


const DoctorDashboard = () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjUzMzJhMTA5ZmI5ZGNjOTY0YTM5NiIsImlhdCI6MTcyNzM0NTQ1MSwiZXhwIjoxNzI5OTM3NDUxfQ.roWiHSTElm4ZxZQPr4Od1iaCgcZ5M6KU2oJ9PsZ0IPc'; 
    const [doctors, setDoctors] = useState([]);
   
    useEffect(() => {
        const fetchDoctors = async () => {
            const response = await getDoctors(token);
            setDoctors(response.data);
        };
        fetchDoctors();
    }, [token]);

    const handleDelete = async (email) => {
        await deleteDoctor(email, token);
        setDoctors(doctors.filter(doctor => doctor.email !== email));
    };

    return (
        <div>
            <h1>Doctor Dashboard</h1>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.email}>
                        {doctor.name} - {doctor.specialization}
                        <button onClick={() => handleDelete(doctor.email)}>Delete</button>
                       
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorDashboard;