/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjZlNWRmMmY4ZjU3ZjM3YjY0Y2UzOCIsImlhdCI6MTcyNzQ1NjczNiwiZXhwIjoxNzMwMDQ4NzM2fQ.YUL2ESuCeMJdgGhN25jSkDC0HpP3I65OFpq1X-as5TQ'; // Add your token here manually

    // Fetch the list of doctors from the backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setDoctors(response.data);
            } catch (err) {
                setError('Error fetching doctors');
            }
        };
        fetchDoctors();
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
                            {doctor.name}
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

export default Appointments;*/
//above code will fetch every doctor even who has no appointments but above code updated version is in Appointdetails.jsx here it will only show doctor who has just appointments


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc4ZmQ3NjFlNmI1Y2I5YTFiOTlkYiIsImlhdCI6MTcyOTU5NzM5OSwiZXhwIjoxNzMyMTg5Mzk5fQ.b75_5zIQ0Mp2x49GBStjoyAC9A3ePvfObKGmNBY-Kk4';

    // Fetch specializations from the backend
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors/specializations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSpecializations(response.data);
            } catch (err) {
                setError('Error fetching specializations');
            }
        };
        fetchSpecializations();
    }, [token]);

    // Fetch doctors with appointments, optionally filtered by specialization
    const fetchDoctorsWithAppointments = async (specialization = '') => {
        try {
            const response = await axios.get(`http://localhost:4000/doctors/doctors-with-appointmentss?specialization=${specialization}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setDoctors(response.data);
        } catch (err) {
            setError('Error fetching doctors with appointments');
        }
    };

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

    // Handle specialization change and fetch doctors accordingly
    const handleSpecializationChange = (e) => {
        const specialization = e.target.value;
        setSelectedSpecialization(specialization);
        fetchDoctorsWithAppointments(specialization);  // Fetch doctors based on specialization
    };

    // Handle doctor selection and fetch their appointments
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
                <label>Select Specialization:</label>
                <select onChange={handleSpecializationChange} value={selectedSpecialization}>
                    <option value="">-- Select a Specialization --</option>
                    {specializations.map((specialization) => (
                        <option key={specialization} value={specialization}>
                            {specialization}
                        </option>
                    ))}
                </select>
            </div>

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

export default Appointments;*/


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Appointments = () => {
    const [specializations, setSpecializations] = useState([]);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');  // New state for search query
   //token has to be staffs
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RhZTg5NTNmZjM5ZmE5ZmFlOTJiNSIsImlhdCI6MTczMjA5NTYyNiwiZXhwIjoxNzQwNzM1NjI2fQ.0IyL-Fq5nfCAuQ3x0IHrDhA0m0ZNYPElKuLM0Z3g01w';

    // Fetch specializations from the backend
    useEffect(() => {
        const fetchSpecializations = async () => {
            try {
                const response = await axios.get('http://localhost:4000/doctors/specializations', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSpecializations(response.data);
            } catch (err) {
                setError('Error fetching specializations');
            }
        };
        fetchSpecializations();
    }, [token]);

    // Fetch doctors with appointments, optionally filtered by specialization or search query
    const fetchDoctorsWithAppointments = async (specialization = '', search = '') => {
        try {
            const response = await axios.get(`http://localhost:4000/doctors/doctors-with-appointmentss?specialization=${specialization}&search=${search}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // Filter doctors based on the search query
            const filteredDoctors = response.data.filter((doctor) => {
                return doctor.name.toLowerCase().includes(search.toLowerCase()); // Ensure name matches the search query
            });
            setDoctors(filteredDoctors);  // Update the doctor list only with matching doctors
        } catch (err) {
            setError('Error fetching doctors with appointments');
        }
    };


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

    // Handle specialization change and fetch doctors accordingly
    const handleSpecializationChange = (e) => {
        const specialization = e.target.value;
        setSelectedSpecialization(specialization);
        fetchDoctorsWithAppointments(specialization, searchQuery);  // Fetch doctors based on specialization and search query
    };

    // Handle search query change
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        fetchDoctorsWithAppointments(selectedSpecialization, e.target.value);  // Search based on input
    };

    // Handle doctor selection and fetch their appointments
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
                <label>Select Specialization:</label>
                <select onChange={handleSpecializationChange} value={selectedSpecialization}>
                    <option value="">-- Select a Specialization --</option>
                    {specializations.map((specialization) => (
                        <option key={specialization} value={specialization}>
                            {specialization}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label>Search Doctor by Name:</label>  {/* New Search Input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Type doctor's name"
                />
            </div>

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
