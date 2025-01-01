/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]); // Add state for patients
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(''); // Add state for selected patient
    const [timefrom, setTimefrom] = useState('');
    const [timeto, setTimeto] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    // Manually add the JWT token here
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTAxODMwNjlmNDc5MTVlY2U5NTkyYSIsImlhdCI6MTcyNTk2MjI4OSwiZXhwIjoxNzI4NTU0Mjg5fQ.9brh9RqHhgWS6JMXnDTCHZvJQ46xDzmSe8cX_CrDeLE';  // Add your manually generated JWT token here

    // Fetch all doctors and patients from the backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch doctors
                const doctorRes = await axios.get('http://localhost:4000/doctors/', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Token added directly
                    }
                });
                setDoctors(doctorRes.data);

                // Fetch patients
                const patientRes = await axios.get('http://localhost:4000/pati/pa', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Token added directly
                    }
                });
                setPatients(patientRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [token]);

    // Handle booking submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointmentData = {
                doctorId: selectedDoctor,
                patientId: selectedPatient,  // Use selected patientId instead of hardcoding
                timefrom,
                timeto,
                date,
                reason
            };

            const res = await axios.post('http://localhost:4000/booki/bo', appointmentData, {
                headers: {
                    Authorization: `Bearer ${token}`  // Token included in request headers
                }
            });

            setMessage('Appointment booked successfully!');
        } catch (error) {
            setMessage('Error: ' + (error.response ? error.response.data.message : 'Something went wrong'));
        }
    };

    return (
        <div>
            <h2>Book an Appointment</h2>

            {*//* Show a success or error message *//*}
            {message && <p>{message}</p>}

            {*//* Appointment form *//*}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Select Doctor:</label>
                    <select
                        value={selectedDoctor}
                        onChange={(e) => setSelectedDoctor(e.target.value)}
                        required
                    >
                        <option value="">Select a doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name} - {doctor.specialization}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Select Patient:</label>
                    <select
                        value={selectedPatient}
                        onChange={(e) => setSelectedPatient(e.target.value)}
                        required
                    >
                        <option value="">Select a patient</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}   {*//* Assuming patients have name and email fields *//*}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Date:</label>
                    <input
                        type="text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Time From (e.g. 8:00am):</label>
                    <input
                        type="text"
                        value={timefrom}
                        onChange={(e) => setTimefrom(e.target.value)}
                        placeholder="e.g. 8:00am"
                        required
                    />
                </div>

                <div>
                    <label>Time To (e.g. 9:00am):</label>
                    <input
                        type="text"
                        value={timeto}
                        onChange={(e) => setTimeto(e.target.value)}
                        placeholder="e.g. 9:00am"
                        required
                    />
                </div>

                <div>
                    <label>Reason for Appointment:</label>
                    <input
                        type="text"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Book</button>
            </form>
        </div>
    );
};

export default AppointmentBooking;
*/
import React, { useState, useEffect } from 'react';
import { getDoctors, getPatients, bookAppointment } from '../services/api';
import '../css/bookin.css';
const AppointmentForm = () => {
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [timefrom, setTimefrom] = useState('');
    const [timeto, setTimeto] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch patients and doctors when the component mounts
        async function fetchData() {
            try {
                const patientsResponse = await getPatients();
                setPatients(patientsResponse.data);
                const doctorsResponse = await getDoctors();
                setDoctors(doctorsResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const appointmentData = {
                patientId: selectedPatient,
                doctorId: selectedDoctor,
                date,
                reason,
                timefrom,
                timeto,
            };

            const response = await bookAppointment(appointmentData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Failed to book appointment. ' + error.response.data.message);
        }
    };

    return (
        <div className="appointment-form">
            <h2>Book an Appointment</h2>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Patient:
                    <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} required>
                        <option value="">Select a patient</option>
                        {patients.map(patient => (
                            <option key={patient._id} value={patient._id}>{patient.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Doctor:
                    <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                        <option value="">Select a doctor</option>
                        {doctors.map(doctor => (
                            <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Date:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
                </label>

                <label>
                    Reason:
                    <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} required />
                </label>

                <label>
                    Time From:
                    <input type="text" value={timefrom} onChange={(e) => setTimefrom(e.target.value)} required />
                </label>

                <label>
                    Time To:
                    <input type="text" value={timeto} onChange={(e) => setTimeto(e.target.value)} required />
                </label>

                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default AppointmentForm;
