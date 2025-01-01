/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Booking2 = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [timefrom, setTimefrom] = useState('');
    const [timeto, setTimeto] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    // Manually add the JWT token here
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGYzZGRjOWYyMGVmM2I4ZDlkYmZkYSIsImlhdCI6MTcyNTkwNjM5NywiZXhwIjoxNzI4NDk4Mzk3fQ.IWS5uy7AMRehha4YaQGT54WGvoLe_Iu1ZtULkSN0kCM';  // Add your manually generated JWT token here

    // Fetch all doctors from the backend
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const res = await axios.get('http://localhost:4000/doctors/', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Token added directly
                    }
                });
                setDoctors(res.data);
            } catch (error) {
                console.error('Error fetching doctors', error);
            }
        };
        fetchDoctors();
    }, [token]);

    // Handle booking submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointmentData = {
                doctorId: selectedDoctor,
                patientId: '66ddbf5e1392622c8efafe0d',  // You can hardcode or fetch the patientId elsewhere
                timefrom,
                timeto,
                date,
                reason
            };

            const res = await axios.post('http://localhost:4000/bookings/book', appointmentData, {
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
                    <label>Date:</label>
                    <input
                        type="date"
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

export default Booking2;*/
import React, { useState, useEffect } from 'react';
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2M4NTY3NjU0ODdmYmJiZDAxYzc0MCIsImlhdCI6MTczMjAxOTU1OSwiZXhwIjoxNzQwNjU5NTU5fQ.6n_5OFFDEXYioC4WHHbV6rN4nzoeDELGCBjA1IfpJcU';  // Add your manually generated JWT token here

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

            const res = await axios.post('http://localhost:4000/bookings/book', appointmentData, {
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

            {/* Show a success or error message */}
            {message && <p>{message}</p>}

            {/* Appointment form */}
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
                                {patient.name}   {/* Assuming patients have name and email fields */}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Date:</label>
                    <input
                        type="date"
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
