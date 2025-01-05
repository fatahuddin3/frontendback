/*// src/components/Appointments.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    // Hardcoded JWT token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGRkMmU5ZTlkOWFjYzUyZGVhMzVkZiIsImlhdCI6MTcyNTgxMzQ4MiwiZXhwIjoxNzI4NDA1NDgyfQ.Hq8LBm61h42ETcD5KK_kXZvEnbAu7xkb5I1I9IxpSTc";

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('http://localhost:4000/appoint/doctor/66da08fb227a3e334ef65433', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Manually add the token here
                    }
                });
                setAppointments(response.data);
            } catch (err) {
                setError('Failed to fetch appointments');
            }
        };

        fetchAppointments();
    }, []);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Appointments List</h2>
            {appointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <p>Doctor: {appointment.doctor.name}</p>
                            <p>Patient: {appointment.patient.name}</p>
                            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Reason: {appointment.reason}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Appointments;*/
// src/components/Appointments.js
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]);        // List of doctors
    const [selectedDoctor, setSelectedDoctor] = useState('');  // Currently selected doctor
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    // Hardcoded JWT token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGRkMmU5ZTlkOWFjYzUyZGVhMzVkZiIsImlhdCI6MTcyNTgxMzQ4MiwiZXhwIjoxNzI4NDA1NDgyfQ.Hq8LBm61h42ETcD5KK_kXZvEnbAu7xkb5I1I9IxpSTc";

    // Fetch the list of doctors when the component loads
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setDoctors(response.data);  // Set doctors data
            } catch (err) {
                setError('Failed to fetch doctors');
            }
        };

        fetchDoctors();
    }, []);

    // Fetch appointments for the selected doctor
    const fetchAppointments = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:4000/appoint/doctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Failed to fetch appointments');
        }
    };

    // Handle doctor selection change
    const handleDoctorChange = (event) => {
        const doctorId = event.target.value;
        setSelectedDoctor(doctorId);

        if (doctorId) {
            fetchAppointments(doctorId);  // Fetch appointments for the selected doctor
        } else {
            setAppointments([]);  // Clear appointments if no doctor is selected
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Appointments List</h2>
           
            <label htmlFor="doctorSelect">Select Doctor:</label>
            <select id="doctorSelect" onChange={handleDoctorChange} value={selectedDoctor}>
                <option value="">--Select a Doctor--</option>
                {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                    </option>
                ))}
            </select>

           
            {appointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <p>Doctor: {appointment.doctor.name}</p>
                            <p>Patient: {appointment.patient.name}</p>
                            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Reason: {appointment.reason}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};*/
//kinda main code below
/*export default Appointments;*/
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]);        // List of doctors
    const [doctorsWithAppointments, setDoctorsWithAppointments] = useState([]);  // Doctors with appointments
    const [doctorsWithoutAppointments, setDoctorsWithoutAppointments] = useState([]);  // Doctors without appointments
    const [selectedDoctor, setSelectedDoctor] = useState('');  // Currently selected doctor
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    // Hardcoded JWT token
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MzU0ZWNhZGIxODU1MjE3YzQxNmNkYSIsImlhdCI6MTczMTU0NjgyNiwiZXhwIjoxNzQwMTg2ODI2fQ.hq5ZH_peJzZiGoh9KTmT-3vyAaDoOkTezPEz0UnIafo";

    // Fetch doctors and appointments
    useEffect(() => {
        const fetchDoctorsAndAppointments = async () => {
            try {
                // Fetch all doctors
                const doctorResponse = await axios.get('http://localhost:4000/doctors/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const allDoctors = doctorResponse.data;
                setDoctors(allDoctors);

                // Fetch all appointments
                const appointmentResponse = await axios.get('http://localhost:4000/appoint', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const allAppointments = appointmentResponse.data;

                // Extract doctor IDs from appointments
                const doctorIdsWithAppointments = allAppointments.map(app => app.doctor._id);

                // Separate doctors into two lists
                const doctorsWithAppointments = allDoctors.filter(doctor => doctorIdsWithAppointments.includes(doctor._id));
                const doctorsWithoutAppointments = allDoctors.filter(doctor => !doctorIdsWithAppointments.includes(doctor._id));

                setDoctorsWithAppointments(doctorsWithAppointments);
                setDoctorsWithoutAppointments(doctorsWithoutAppointments);
            } catch (err) {
                setError('Failed to fetch data');
            }
        };
        fetchDoctorsAndAppointments();
    }, []);

    // Fetch appointments for the selected doctor
    const fetchAppointments = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:4000/appoint/doctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Failed to fetch appointments');
        }
    };

    // Handle doctor selection change
    const handleDoctorChange = (event) => {
        const doctorId = event.target.value;
        setSelectedDoctor(doctorId);

        if (doctorId) {
            fetchAppointments(doctorId);  // Fetch appointments for the selected doctor
        } else {
            setAppointments([]);  // Clear appointments if no doctor is selected
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Appointments List</h2>

            <label htmlFor="doctorSelect">Select Doctor:</label>
            <select id="doctorSelect" onChange={handleDoctorChange} value={selectedDoctor}>
                <option value="">--Select a Doctor--</option>
                {doctorsWithAppointments.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name} (Has Appointments)
                    </option>
                ))}
                {doctorsWithoutAppointments.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name} (No Appointments)
                    </option>
                ))}
            </select>

            {appointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <p>Doctor: {appointment.doctor.name}</p>
                            <p>Patient: {appointment.patient.name}</p>
                            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Reason: {appointment.reason}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Appointments;*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]); // All doctors
    const [appointments, setAppointments] = useState([]); // Appointments for selected doctor
    const [selectedDoctor, setSelectedDoctor] = useState(''); // Selected doctor
    const [error, setError] = useState(''); // Error message
    const [loading, setLoading] = useState(false); // Loading state

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2M4NTY3NjU0ODdmYmJiZDAxYzc0MCIsImlhdCI6MTczMjAxOTU1OSwiZXhwIjoxNzQwNjU5NTU5fQ.6n_5OFFDEXYioC4WHHbV6rN4nzoeDELGCBjA1IfpJcU"; // Replace with your actual JWT token

    useEffect(() => {
        const fetchDoctors = async () => {
            setLoading(true);
            try {
                // Fetch all doctors
                const response = await axios.get('http://localhost:4000/doctors/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(response.data);
            } catch (err) {
                setError('Failed to fetch doctors. Please check the API or server status.');
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    const fetchAppointments = async (doctorId) => {
        setLoading(true);
        try {
            // Fetch appointments for a specific doctor
            const response = await axios.get(`http://localhost:4000/appoint/doctor/${doctorId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Failed to fetch appointments for the selected doctor.');
        } finally {
            setLoading(false);
        }
    };

    const handleDoctorChange = (event) => {
        const doctorId = event.target.value;
        setSelectedDoctor(doctorId);

        if (doctorId) {
            fetchAppointments(doctorId);
        } else {
            setAppointments([]);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Appointments List</h2>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label htmlFor="doctorSelect">Select Doctor:</label>
            <select id="doctorSelect" onChange={handleDoctorChange} value={selectedDoctor}>
                <option value="">--Select a Doctor--</option>
                {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name}
                    </option>
                ))}
            </select>

            {appointments.length === 0 ? (
                <p>{selectedDoctor ? 'No appointments found for this doctor.' : 'Please select a doctor.'}</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <p>Doctor: {appointment.doctor.name}</p>
                            <p>Patient: {appointment.patient.name}</p>
                            <p>Date: {new Date(appointment.date).toLocaleDateString()}</p>
                            <p>Reason: {appointment.reason}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Appointments;




/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]);  // List of all doctors
    const [doctorsWithAppointments, setDoctorsWithAppointments] = useState([]);  // Doctors with appointments
    const [doctorsWithoutAppointments, setDoctorsWithoutAppointments] = useState([]);  // Doctors without appointments
    const [selectedDoctor, setSelectedDoctor] = useState('');  // Currently selected doctor
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    // Hardcoded JWT token (Replace with your actual token)
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGU2ZmI1YjJkN2RjMzgyYTc1NWEyOCIsImlhdCI6MTcyNTg1MzYyMiwiZXhwIjoxNzI4NDQ1NjIyfQ.RXZqzDSLbz4XpcER7DfVHwH4fhCe0fb7tb47V4oZuqU";

    // Fetch doctors and appointments
    useEffect(() => {
        const fetchDoctorsAndAppointments = async () => {
            try {
                // Fetch all doctors
                const doctorResponse = await axios.get('http://localhost:4000/doctors/appoin', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const allDoctors = doctorResponse.data;
                setDoctors(allDoctors);  // Set the full list of doctors

                // Fetch all appointments
                const appointmentResponse = await axios.get('http://localhost:4000/appoint', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                const allAppointments = appointmentResponse.data;

                // Extract doctor IDs from appointments (ensure proper ID formatting)
                const doctorIdsWithAppointments = allAppointments.map(app => String(app.doctor._id));

                // Separate doctors into two lists: with appointments and without
                const doctorsWithAppointments = allDoctors.filter(doctor =>
                    doctorIdsWithAppointments.includes(String(doctor._id))
                );
                const doctorsWithoutAppointments = allDoctors.filter(doctor =>
                    !doctorIdsWithAppointments.includes(String(doctor._id))
                );

                setDoctorsWithAppointments(doctorsWithAppointments);  // Set doctors with appointments
                setDoctorsWithoutAppointments(doctorsWithoutAppointments);  // Set doctors without appointments
            } catch (err) {
                setError('Failed to fetch data');
            }
        };

        fetchDoctorsAndAppointments();
    }, []);

    // Fetch appointments for the selected doctor
    const fetchAppointments = async (doctorId) => {
        try {
            const response = await axios.get(`http://localhost:4000/appoint/doctor/${doctorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setAppointments(response.data);
        } catch (err) {
            setError('Failed to fetch appointments');
        }
    };

    // Handle doctor selection change
    const handleDoctorChange = (event) => {
        const doctorId = event.target.value;
        setSelectedDoctor(doctorId);

        if (doctorId) {
            fetchAppointments(doctorId);  // Fetch appointments for the selected doctor
        } else {
            setAppointments([]);  // Clear appointments if no doctor is selected
        }
    };

    // Format date properly
    const formatDate = (date) => {
        const parsedDate = new Date(date);
        return parsedDate.toString() !== 'Invalid Date' ? parsedDate.toLocaleDateString() : 'Invalid Date';
    };

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Hospital Management System</h2>
            <h3>Appointments List</h3>

            <label htmlFor="doctorSelect">Select Doctor:</label>
            <select id="doctorSelect" onChange={handleDoctorChange} value={selectedDoctor}>
                <option value="">--Select a Doctor--</option>
                {*//* Doctors with appointments *//*}
                {doctorsWithAppointments.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name} (Has Appointments)
                    </option>
                ))}
                {*//* Doctors without appointments *//*}
                {doctorsWithoutAppointments.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                        {doctor.name} (No Appointments)
                    </option>
                ))}
            </select>

            {appointments.length === 0 ? (
                <p>No appointments found</p>
            ) : (
                <ul>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <p>Doctor: {appointment.doctor.name}</p>
                            <p>Patient: {appointment.patient.name}</p>
                            <p>Date: {formatDate(appointment.date)}</p>
                            <p>Reason: {appointment.reason}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Appointments;*/


