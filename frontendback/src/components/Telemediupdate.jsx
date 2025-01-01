import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [patients, setPatients] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [selectedPatient, setSelectedPatient] = useState('');
    const [start_time, setTimefrom] = useState('');
    const [end_time, setTimeto] = useState('');
    const [status, setstat] = useState('');
   
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
               status
            };

            const res = await axios.put('http://localhost:4000/tele/consulat', appointmentData, {
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
                    <label>status:</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setstat(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Book</button>
            </form>
        </div>
    );
};

export default AppointmentBooking;
