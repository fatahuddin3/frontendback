/*// src/components/Appointments.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [token, setToken] = useState('');
    const [doctorsWithAppointments, setDoctorsWithAppointments] = useState([]);
    const [doctorsWithoutAppointments, setDoctorsWithoutAppointments] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchDoctorData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/doctors/appoin', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { doctorsWithAppointments, doctorsWithoutAppointments } = response.data;

            setDoctorsWithAppointments(doctorsWithAppointments);
            setDoctorsWithoutAppointments(doctorsWithoutAppointments);
            setError('');
        } catch (err) {
            setError('Error fetching data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-4">
            <h1>Doctor Appointments Status</h1>

            {*//* Token Input *//*}
            <div className="mb-3">
                <label htmlFor="tokenInput" className="form-label">Enter Token:</label>
                <input
                    type="text"
                    className="form-control"
                    id="tokenInput"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter JWT token"
                />
                <button className="btn btn-primary mt-3" onClick={fetchDoctorData}>
                    Fetch Data
                </button>
            </div>

            {*//* Loading Spinner *//*}
            {loading && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}

            {*//* Error Display *//*}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            {*//* Doctors with Appointments *//*}
            <div>
                <h2>Doctors with Appointments</h2>
                {doctorsWithAppointments.length > 0 ? (
                    <ul className="list-group">
                        {doctorsWithAppointments.map((doctor) => (
                            <li className="list-group-item" key={doctor._id}>
                                {doctor.name} - {doctor.specialization}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No doctors with appointments found.</p>
                )}
            </div>

            {*//* Doctors without Appointments *//*}
            <div>
                <h2>Doctors without Appointments</h2>
                {doctorsWithoutAppointments.length > 0 ? (
                    <ul className="list-group">
                        {doctorsWithoutAppointments.map((doctor) => (
                            <li className="list-group-item" key={doctor._id}>
                                {doctor.name} - {doctor.specialization}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>All doctors have appointments.</p>
                )}
            </div>
        </div>
    );
};

export default Appointments;*/
// src/components/Appointments.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Appointments = () => {
    const [token, setToken] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [viewDoctorDetails, setViewDoctorDetails] = useState(null);
    
    const fetchDoctorData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4000/doctors/appoin', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const { doctorsWithAppointments, doctorsWithoutAppointments } = response.data;

            // Group doctors by specialization
            const groupedBySpecialization = groupBySpecialization(doctorsWithAppointments, doctorsWithoutAppointments);

            setDoctorData(groupedBySpecialization);
            setError('');
            setSelectedSpecialization(''); // Reset selected specialization when fetching new data
        } catch (err) {
            setError('Error fetching data: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    // Group doctors by specialization
    const groupBySpecialization = (withAppointments, withoutAppointments) => {
        const specializationGroups = {};

        // Group doctors with appointments
        withAppointments.forEach((doctor) => {
            const { specialization } = doctor;
            if (!specializationGroups[specialization]) {
                specializationGroups[specialization] = { withAppointments: [], withoutAppointments: [] };
            }
            specializationGroups[specialization].withAppointments.push(doctor);
        });

        // Group doctors without appointments
        withoutAppointments.forEach((doctor) => {
            const { specialization } = doctor;
            if (!specializationGroups[specialization]) {
                specializationGroups[specialization] = { withAppointments: [], withoutAppointments: [] };
            }
            specializationGroups[specialization].withoutAppointments.push(doctor);
        });

        return specializationGroups;
    };

    // Show doctor details when a doctor name is clicked
    const showDoctorDetails = (doctor) => {
        setViewDoctorDetails(doctor);
    };

    return (
        <div className="container mt-4">
            <h1>Doctor Appointments by Specialization</h1>

            {/* Token Input */}
            <div className="mb-3">
                <label htmlFor="tokenInput" className="form-label">Enter Token:</label>
                <input
                    type="text"
                    className="form-control"
                    id="tokenInput"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Enter JWT token"
                />
                <button className="btn btn-primary mt-3" onClick={fetchDoctorData}>
                    Fetch Data
                </button>
            </div>

            {/* Loading Spinner */}
            {loading && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}

            {/* Error Display */}
            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            {/* Specialization List */}
            {doctorData && (
                <div>
                    <h2>Specializations</h2>
                    <ul className="list-group">
                        {Object.keys(doctorData).map((specialization) => (
                            <li
                                key={specialization}
                                className="list-group-item"
                                onClick={() => setSelectedSpecialization(specialization)}
                            >
                                {specialization}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display Doctors by Specialization */}
            {selectedSpecialization && (
                <div>
                    <h3>{selectedSpecialization}</h3>
                    <div className="mt-3">
                        <h4>Doctors with Appointments</h4>
                        <ul className="list-group">
                            {doctorData[selectedSpecialization].withAppointments.length > 0 ? (
                                doctorData[selectedSpecialization].withAppointments.map((doctor) => (
                                    <li
                                        key={doctor._id}
                                        className="list-group-item"
                                        onClick={() => showDoctorDetails(doctor)}
                                    >
                                        {doctor.name} - {doctor.specialization}
                                    </li>
                                ))
                            ) : (
                                <p>No doctors with appointments in this specialization.</p>
                            )}
                        </ul>

                        <h4 className="mt-4">Doctors without Appointments</h4>
                        <ul className="list-group">
                            {doctorData[selectedSpecialization].withoutAppointments.length > 0 ? (
                                doctorData[selectedSpecialization].withoutAppointments.map((doctor) => (
                                    <li
                                        key={doctor._id}
                                        className="list-group-item"
                                        onClick={() => showDoctorDetails(doctor)}
                                    >
                                        {doctor.name} - {doctor.specialization}
                                    </li>
                                ))
                            ) : (
                                <p>All doctors have appointments in this specialization.</p>
                            )}
                        </ul>
                    </div>
                </div>
            )}

            {/* Doctor Details View */}
            {viewDoctorDetails && (
                <div className="card mt-5">
                    <div className="card-body">
                        <h5 className="card-title">{viewDoctorDetails.name}</h5>
                        <p className="card-text">
                            <strong>Specialization:</strong> {viewDoctorDetails.specialization}<br />
                            <strong>Email:</strong> {viewDoctorDetails.email}<br />
                            <strong>Phone:</strong> {viewDoctorDetails.phone}
                        </p>
                        <button className="btn btn-secondary" onClick={() => setViewDoctorDetails(null)}>
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Appointments;
