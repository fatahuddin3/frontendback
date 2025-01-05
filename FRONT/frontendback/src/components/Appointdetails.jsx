
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RhZTg5NTNmZjM5ZmE5ZmFlOTJiNSIsImlhdCI6MTczMjA5NTYyNiwiZXhwIjoxNzQwNzM1NjI2fQ.0IyL-Fq5nfCAuQ3x0IHrDhA0m0ZNYPElKuLM0Z3g01w'; // Add your token here manually

    // Fetch the list of doctors with appointments from the backend
    useEffect(() => {
        const fetchDoctorsWithAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors/doctors-with-appointments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(response.data);
            } catch (err) {
                setError('Error fetching doctors with appointments');
            }
        };
        fetchDoctorsWithAppointments();
    }, [token]);

    // Fetch appointments for the selected doctor
    const fetchAppointments = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:4000/appoint/doctor/${doctorId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Error fetching appointments');
        }
    };

    const handleDoctorChange = (e) => {
        const doctorId = e.target.value;
        setSelectedDoctor(doctorId);
        if (doctorId) {
            fetchAppointments(doctorId);
        }
    };

    return (
        <div>
            <h1>Doctor Appointments</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                <label>Select Doctor:</label>
                <select onChange={handleDoctorChange} value={selectedDoctor || ''}>
                    <option value="">-- Select a Doctor --</option>
                    {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                            {doctor.name} - {doctor.specialization}
                        </option>
                    ))}
                </select>
            </div>

            {appointments.length > 0 ? (
                <div>
                    <h2>Appointments</h2>
                    <ul>
                        {appointments.map((appointment) => (
                            <li key={appointment._id}>
                                Patient: {appointment.patient.name}, Date: {new Date(appointment.date).toLocaleDateString()}, Time: {appointment.timefrom} - {appointment.timeto}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : selectedDoctor && (
                <p>No appointments found for this doctor.</p>
            )}
        </div>
    );
};

export default Appointments;
