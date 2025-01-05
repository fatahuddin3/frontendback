/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsultationStatusUpdate = () => {
    const [patientId, setPatientId] = useState('');
    const [status, setStatus] = useState('');
    
    const [message, setMessage] = useState('');

    // Simulate fetching consultation details (patient_id) from the backend
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk1YmE4YTljOTg2ZjBhNTJlNzIxNiIsImlhdCI6MTcyNjU2OTM4NCwiZXhwIjoxNzI5MTYxMzg0fQ.4oKPYOgFm8GxQOsD0A-NKFs4WvOMJP33YKJqTEChmPc';
        useEffect(() => {
            async function fetchConsultation() {
                try {
                    // Replace this with actual API call to fetch consultation by patient ID
                    const consultation = await axios.get(`http://localhost:4000/status/patients/${patientId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
                    ); // Example endpoint
                    setPatientId(consultation.data.patient_id); // Assuming the patient_id comes here
                    setCurrentStatus(consultation.data.status); // Set current status of the consultation
                } catch (error) {
                    console.error('Error fetching consultation:', error);
                    setMessage('Error fetching consultation details.');
                }
            }

            fetchConsultation();
        }, []);
    // Handle status update form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/status/patient/${patientId}`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setMessage(response.data.message);
            setCurrentStatus(status); // Update the current status in the UI after success
        } catch (error) {
            console.error('Error updating status:', error);
            setMessage('Error updating consultation status.');
        }
    };

    return (
        <div>
            <h1>Update Consultation Status</h1>

            <p><strong>Patient ID:</strong> {patientId || 'Loading...'}</p>
            <p><strong>Current Status:</strong> {currentStatus || 'Loading...'}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    New Status:
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Enter new status (pending, completed, cancelled)"
                        required
                    />
                </label>
                <button type="submit">Update Status</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ConsultationStatusUpdate;
*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsultationStatusUpdate = () => {
    const [patientId, setPatientId] = useState('');
    const [status, setStatus] = useState('');
    const [currentStatus, setCurrentStatus] = useState(''); // Initialize currentStatus state
    const [message, setMessage] = useState('');

    // Simulate fetching consultation details (patient_id) from the backend
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTk1YmE4YTljOTg2ZjBhNTJlNzIxNiIsImlhdCI6MTcyNjU2OTM4NCwiZXhwIjoxNzI5MTYxMzg0fQ.4oKPYOgFm8GxQOsD0A-NKFs4WvOMJP33YKJqTEChmPc';
    useEffect(() => {
        async function fetchConsultation() {
            try {
                const response = await axios.get(`http://localhost:4000/status/patients/66ddea5339e79ae147d9622f`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                const consultation = response.data; // Use data directly (since it's findOne in backend now)
                setPatientId(consultation.patient_id); // Assuming the patient_id comes here
                setCurrentStatus(consultation.status); // Set current status of the consultation
            } catch (error) {
                console.error('Error fetching consultation:', error);
                setMessage('Error fetching consultation details.');
            }
        }

        fetchConsultation();
    }, [patientId]); // Fetches when patientId is updated

    // Handle status update form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/status/patient/66ddea5339e79ae147d9622f`, { status }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            setMessage(response.data.message);
            setCurrentStatus(status); // Update the current status in the UI after success
        } catch (error) {
            console.error('Error updating status:', error);
            setMessage('Error updating consultation status.');
        }
    };

    return (
        <div>
            <h1>Update Consultation Status</h1>

            <p><strong>Patient ID:</strong> {patientId || 'Loading...'}</p>
            <p><strong>Current Status:</strong> {currentStatus || 'Loading...'}</p>

            <form onSubmit={handleSubmit}>
                <label>
                    New Status:
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        placeholder="Enter new status (pending, completed, cancelled)"
                        required
                    />
                </label>
                <button type="submit">Update Status</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ConsultationStatusUpdate;
*/

/*import React, { useState, useEffect } from 'react';
import { getBillsByStatuss, updateBillStatuss } from '../services/doctorService';  // Include update service
import '../css/BillManagement.css';

const BillManagement = () => {
    const [bills, setBills] = useState([]);
    const [status, setStatus] = useState('');  // Paid or Unpaid
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGQzY2QxMGFhZTIxY2FhMzFlYjU4MSIsImlhdCI6MTcyNTc3NTA1NywiZXhwIjoxNzI4MzY3MDU3fQ.BbvLvkrc6UqRfOJV7kvasO-YxQhYn9JjVcO6vKAQ0x0';  // Use hardcoded token in code

    // Fetch bills whenever the status changes
    useEffect(() => {
        if (status) {
            const fetchBills = async () => {
                try {
                    const response = await getBillsByStatuss(status, token);
                    const filteredBills = response.data.filter(bill => bill.status === status);
                    setBills(filteredBills);
                } catch (error) {
                    console.error('Error fetching bills:', error);
                    alert('Error fetching bills. Check your token or backend connection.');
                }
            };

            fetchBills();
        }
    }, [status]);

    // Assuming updateBillStatus and getBillsByStatus are correctly imported

    const handleStatusUpdate = async (billId, currentStatus) => {
        // Toggle between 'paid' and 'unpaid'
        const newStatus = currentStatus === 'pending' ? 'cancelled':'cancelled' ;

        try {
            // Call backend to update status
            const updateResponse = await updateBillStatuss(billId, newStatus, token);

            if (updateResponse.status === 200) {
                // Fetch updated bills list based on the current status
                const response = await getBillsByStatus(status, token);
                const filteredBills = response.data.filter(bill => bill.status === status);
                setBills(filteredBills);  // Update the list to reflect the changes
                alert(updateResponse.data.message); // Show success message
            } else {
                throw new Error(updateResponse.data.message || 'Failed to update bill status.');
            }
        } catch (error) {
            console.error('Error updating bill status:', error);
            alert('Error updating bill status. ' + (error.message || 'Check backend connection.'));
        }
    };

    return (
        <div className="bill-management">
            <h2>Bill Management</h2>

            {*//* Buttons for filtering Paid/Unpaid *//*}
            <div className="status-buttons">
                <button onClick={() => setStatus('pending')}>Paid Bills</button>
                <button onClick={() => setStatus('cancelled')}>Unpaid Bills</button>
            </div>
            {*//* Display the bills list *//*}
            <div className="bill-list">
                {bills.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                {status && <th>Actions</th>}  {*//* Show actions for both paid and unpaid *//*}
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill._id}>
                                    <td>{bill.diagnosis}</td>
                                    <td>{bill.symptoms}</td>
                                    <td>{bill.prescription}</td>
                                    <td>
                                        {*//* Button toggles between 'Mark as Paid' or 'Mark as Unpaid' based on status *//*}
                                        <button onClick={() => handleStatusUpdate(bill.patient_id, bill.status)}>
                                            {bill.status === 'pending' ? 'Mark as Paid' : 'Mark as Unpaid'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No {status} bills found.</p>
                )}
            </div>
        </div>
    );
};

export default BillManagement;*/

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = () => {
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [status, setstat] = useState('');
    const [message, setMessage] = useState(''); // Add message state

    // Replace this with your actual token
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTg3MTVlMzYyOTljYjZjN2JkNjk1ZSIsImlhdCI6MTcyNjUwOTQwNywiZXhwIjoxNzI5MTAxNDA3fQ.j5tGP51NAgnev6gZASkOoz8zoo9_Kh-7ZMxxXbmGAjk';

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch patients data
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
                status
            };

            // Pass selectedPatient in the URL as patient_id
            const res = await axios.put(
                `http://localhost:4000/tele/status/patient/${selectedPatient}`,
                appointmentData,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setMessage('Status updated successfully!');
        } catch (error) {
            setMessage('Error: ' + (error.response ? error.response.data.message : 'Something went wrong'));
            console.error(error); // Log the error for debugging
        }
    };

    return (
        <div>
            <h2>Update Patient Status</h2>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
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
                    <label>Status:</label>
                    <input
                        type="text"
                        value={status}
                        onChange={(e) => setstat(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Update Status</button>
            </form>
        </div>
    );
};

export default AppointmentBooking;



