/*import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // Manual token system
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2Zjc2ZTcyMWI5MTUxMGVhNGE2OTM1YSIsImlhdCI6MTcyNzQ5MTY5OSwiZXhwIjoxNzMwMDgzNjk5fQ.usZc58_Uz_RN6WrHSkS3xbANR-T7gIQ7wtgatro2fLM'; // Place your token here

    // Fetch doctors with appointments
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors/doctors-with-appointments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(response.data);
            } catch (err) {
                setError('Unable to fetch doctors');
            }
        };

        fetchDoctors();
    }, [token]);

    // Fetch appointments for a selected doctor
    const handleDoctorClick = async (doctor) => {
        setSelectedDoctor(doctor);
        setMessage('');
        setError(null);

        try {
            const response = await axios.get(`http://localhost:4000/appoint/doctor/${doctor._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Unable to fetch appointments for this doctor');
        }
    };

    // Handle appointment update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAppointment) return;

        try {
            const response = await axios.delete(
                `http://localhost:4000/appoint/${selectedAppointment._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage('Appointment updated successfully');
            setError(null);

            // Refresh the appointments after the update
            handleDoctorClick(selectedDoctor);
        } catch (err) {
            setMessage('Failed to update appointment');
            setError('Error updating the appointment');
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            {!selectedDoctor ? (
                <div>
                    <h2>Doctors with Appointments</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {doctors.map((doctor) => (
                            <li
                                key={doctor._id}
                                onClick={() => handleDoctorClick(doctor)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    marginBottom: '5px',
                                }}
                            >
                                {doctor.name} - {doctor.specialization}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>Appointments for Dr. {selectedDoctor.name}</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {appointments.map((appointment) => (
                            <li
                                key={appointment._id}
                                onClick={() => {
                                    setSelectedAppointment(appointment);
                                    setDate(appointment.date.split('T')[0]); // Set default date to the current appointment date
                                    setReason(appointment.reason);
                                }}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    marginBottom: '5px',
                                }}
                            >
                                Date: {new Date(appointment.date).toLocaleDateString()} | Reason: {appointment.reason}
                            </li>
                        ))}
                    </ul>

                    {selectedAppointment && (
                        <div>
                            <h3>Update Appointment</h3>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Date:</label>
                                    <input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                                    />
                                </div>
                                <div>
                                    <label>Reason:</label>
                                    <input
                                        type="text"
                                        value={reason}
                                        onChange={(e) => setReason(e.target.value)}
                                        style={{ marginBottom: '10px', padding: '8px', width: '100%' }}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                                >
                                    Update Appointment
                                </button>
                            </form>
                            {message && <p>{message}</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState(null);

    // Manual token system
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2M4NTY3NjU0ODdmYmJiZDAxYzc0MCIsImlhdCI6MTczMjAxOTU1OSwiZXhwIjoxNzQwNjU5NTU5fQ.6n_5OFFDEXYioC4WHHbV6rN4nzoeDELGCBjA1IfpJcU'; // Place your token here

    // Fetch doctors with appointments
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors/doctors-with-appointments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(response.data);
            } catch (err) {
                setError('Unable to fetch doctors');
            }
        };

        fetchDoctors();
    }, [token]);

    // Fetch appointments for a selected doctor
    const handleDoctorClick = async (doctor) => {
        setSelectedDoctor(doctor);
        setMessage('');
        setError(null);

        try {
            const response = await axios.get(`http://localhost:4000/appoint/doctor/${doctor._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Unable to fetch appointments for this doctor');
        }
    };

    // Handle appointment update
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAppointment) return;

        try {
            const response = await axios.delete(
                `http://localhost:4000/appoint/${selectedAppointment._id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setMessage('Appointment updated successfully');
            setError(null);

            // Refresh the appointments after the update
            handleDoctorClick(selectedDoctor);
        } catch (err) {
            setMessage('Failed to update appointment');
            setError('Error updating the appointment');
        }
    };

    if (error) return <div>{error}</div>;

    return (
        <div style={{ margin: '20px', fontFamily: 'Arial, sans-serif' }}>
            {!selectedDoctor ? (
                <div>
                    <h2>Doctors with Appointments</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {doctors.map((doctor) => (
                            <li
                                key={doctor._id}
                                onClick={() => handleDoctorClick(doctor)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    marginBottom: '5px',
                                }}
                            >
                                {doctor.name} - {doctor.specialization}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    <h2>Appointments for Dr. {selectedDoctor.name}</h2>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {appointments.map((appointment) => (
                            <li
                                key={appointment._id}
                                onClick={() => {
                                    setSelectedAppointment(appointment);
                                }}
                                style={{
                                    cursor: 'pointer',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    marginBottom: '5px',
                                }}
                            >
                                Date: {new Date(appointment.date).toLocaleDateString()} | Reason: {appointment.reason}
                            </li>
                        ))}
                    </ul>

                    {selectedAppointment && (
                        <div>
                            <h3>Delete Appointment</h3>
                            <form onSubmit={handleSubmit}>
                                <button
                                    type="submit"
                                    style={{ padding: '10px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}
                                >
                                    Update Appointment
                                </button>
                            </form>
                            {message && <p>{message}</p>}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;
