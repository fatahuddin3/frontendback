/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateConsultation = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [symptoms, setSymptoms] = useState('');
    const [diagnosis, setDiagnosis] = useState('');
    const [prescription, setPrescription] = useState('');
    const [message, setMessage] = useState('');

    // Fetch doctors
    useEffect(() => {
        async function fetchDoctors() {
            const { data } = await axios.get('http://localhost:4000/doctors/'); // Backend API to fetch doctors
            setDoctors(data);
        }
        fetchDoctors();
    }, []);

    // Fetch patients
    useEffect(() => {
        async function fetchPatients() {
            const { data } = await axios.get('http://localhost:4000/pati/pa'); // Backend API to fetch patients
            setPatients(data);
        }
        fetchPatients();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Manually set the token
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTg1OGE2NzRmNzdkNmI0Mzg2MDhiMyIsImlhdCI6MTcyNjUwMzA3OSwiZXhwIjoxNzI5MDk1MDc5fQ.vPjzucYLciubof2XCewKDH6lN_KYAwgwLhc1cS8KFNU'; // Replace with the token you want to use

        try {
            const { data } = await axios.post('http://localhost:4000/tele/creat', {
                doctor_id: selectedDoctor,
                patient_id: selectedPatient,
                start_time: startTime,
                end_time: endTime,
                symptoms,
                diagnosis,
                prescription,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setMessage(`Success: ${data.message}`);
        } catch (error) {
            setMessage(`Error: ${error.response.data.message}`);
        }
    };

    return (
        <div>
            <h2>Create a Consultation</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Doctor</label>
                    <select value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} required>
                        <option value=''>Select Doctor</option>
                        {doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>{doctor.name} - {doctor.specialization}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Patient</label>
                    <select value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} required>
                        <option value=''>Select Patient</option>
                        {patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>{patient.name} - {patient.age} years</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Start Time</label>
                    <input type='time' value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
                </div>
                <div>
                    <label>End Time</label>
                    <input type='time' value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
                </div>
                <div>
                    <label>Symptoms</label>
                    <input type='text' value={symptoms} onChange={(e) => setSymptoms(e.target.value)} required />
                </div>
                <div>
                    <label>Diagnosis</label>
                    <input type='text' value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required />
                </div>
                <div>
                    <label>Prescription</label>
                    <input type='text' value={prescription} onChange={(e) => setPrescription(e.target.value)} required />
                </div>
                <button type='submit'>Submit Consultation</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default CreateConsultation;*/
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]); // Add state for patients
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedPatient, setSelectedPatient] = useState(''); // Add state for selected patient
    const [start_time, setTimefrom] = useState('');
    const [end_time, setTimeto] = useState('');
   
    const [symptoms, setsym] = useState('');
    const [diagnosis, setdia] = useState('');
    const [prescription, setpres] = useState('');
    // Manually add the JWT token here
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTg3MTVlMzYyOTljYjZjN2JkNjk1ZSIsImlhdCI6MTcyNjUwOTQwNywiZXhwIjoxNzI5MTAxNDA3fQ.j5tGP51NAgnev6gZASkOoz8zoo9_Kh-7ZMxxXbmGAjk';  // Add your manually generated JWT token here

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
                doctor_id: selectedDoctor,
                patient_id: selectedPatient,  // Use selected patientId instead of hardcoding
                start_time,
                end_time,
                symptoms,
                diagnosis,
                prescription,
                
            };

            const res = await axios.post('http://localhost:4000/tele/creat', appointmentData, {
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
                    <label>Time From (e.g. 8:00am):</label>
                    <input
                        type="text"
                        value={start_time}
                        onChange={(e) => setTimefrom(e.target.value)}
                        placeholder="e.g. 8:00am"
                        required
                    />
                </div>

                <div>
                    <label>Time To (e.g. 9:00am):</label>
                    <input
                        type="text"
                        value={end_time}
                        onChange={(e) => setTimeto(e.target.value)}
                        placeholder="e.g. 9:00am"
                        required
                    />
                </div>

                <div>
                    <label>Reason for Appointment:</label>
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setsym(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Reason for Appointment:</label>
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setdia(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Reason for Appointment:</label>
                    <input
                        type="text"
                        value={prescription}
                        onChange={(e) => setpres(e.target.value)}
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
import axios from 'axios';

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [start_time, setTimefrom] = useState('');
    const [end_time, setTimeto] = useState('');
    const [symptoms, setsym] = useState('');
    const [diagnosis, setdia] = useState('');
    const [prescription, setpres] = useState('');
    const [message, setMessage] = useState(''); // Add message state

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTg3MTVlMzYyOTljYjZjN2JkNjk1ZSIsImlhdCI6MTcyNjUwOTQwNywiZXhwIjoxNzI5MTAxNDA3fQ.j5tGP51NAgnev6gZASkOoz8zoo9_Kh-7ZMxxXbmGAjk';

    useEffect(() => {
        const fetchData = async () => {
            try {
                const doctorRes = await axios.get('http://localhost:4000/doctors/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setDoctors(doctorRes.data);

                const patientRes = await axios.get('http://localhost:4000/pati/pa', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(patientRes.data);
            } catch (error) {
                console.error('Error fetching data', error);
            }
        };
        fetchData();
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const appointmentData = {
                doctorId: selectedDoctor,
                patientId: selectedPatient,
                start_time,
                end_time,
                symptoms,
                diagnosis,
                prescription,
            };

            const res = await axios.post('http://localhost:4000/tele/creat', appointmentData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setMessage('Appointment booked successfully!');
        } catch (error) {
            setMessage('Error: ' + (error.response ? error.response.data.message : 'Something went wrong'));
        }
    };

    return (
        <div>
            <h2>Book an Appointment</h2>

            {message && <p>{message}</p>}

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
                                {patient.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Time From:</label>
                    <input
                        type="text"
                        value={start_time}
                        onChange={(e) => setTimefrom(e.target.value)}
                        required
                    />
                </div>
               {/*input type model e jeta deya frontend eo tai thakte hobe like: start_from ekhane type text coz model e type string deya so ekhane type time dile okhaneo tai korte hobe time dite hobe*/}
                <div>
                    <label>Time To:</label>
                    <input
                        type="text"
                        value={end_time}
                        onChange={(e) => setTimeto(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Symptoms:</label>
                    <input
                        type="text"
                        value={symptoms}
                        onChange={(e) => setsym(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Diagnosis:</label>
                    <input
                        type="text"
                        value={diagnosis}
                        onChange={(e) => setdia(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Prescription:</label>
                    <input
                        type="text"
                        value={prescription}
                        onChange={(e) => setpres(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Book</button>
            </form>
        </div>
    );
};

export default AppointmentBooking;
