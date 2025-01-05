import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const { doctorId } = useParams();
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch patients when the component loads
        axios.get('http://localhost:4000/pati/pa', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => setPatients(response.data))
            .catch(error => console.error('Error fetching patients:', error));
    }, [token]);

    const handleDelete = async (patientId) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this patient?');
        if (!confirmDelete) return;

        setLoading(true);
        try {
            await axios.delete(`http://localhost:4000/pati/${doctorId}/patients/${patientId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            alert('Patient deleted successfully');
            // Remove the deleted patient from the list
            setPatients(patients.filter(patient => patient._id !== patientId));
        } catch (error) {
            console.error('Error deleting patient:', error);
            alert('Failed to delete the patient');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Patients List</h1>
            {loading && <p>Processing...</p>}
            <ul>
                {patients.map(patient => (
                    <li key={patient._id}>
                        {patient.name} - {patient.contactNumber}
                        <button
                            style={{ marginLeft: '10px', color: 'red' }}
                            onClick={() => handleDelete(patient._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
