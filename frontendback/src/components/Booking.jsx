import React, { useState } from 'react';
import axios from 'axios';

const Booking = () => {
    const [timeFrom, setTimeFrom] = useState('');
    const [timeTo, setTimeTo] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');
    const [message, setMessage] = useState('');

    // Assume this token is stored in localStorage or some secure place after login
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2M4NTY3NjU0ODdmYmJiZDAxYzc0MCIsImlhdCI6MTczMjAxOTU1OSwiZXhwIjoxNzQwNjU5NTU5fQ.6n_5OFFDEXYioC4WHHbV6rN4nzoeDELGCBjA1IfpJcU';

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data to send to the backend
        const appointmentData = {
            date,
            reason,
            timefrom: timeFrom,
            timeto: timeTo
        };

        try {
            // Send a POST request with the token in the Authorization header
            const response = await axios.post('http://localhost:4000/appoint/booking', appointmentData, {
                headers: {
                    Authorization: `Bearer ${token}`  // Send token in the Authorization header
                }
            });

            // Check if the appointment was successfully created
            if (response.status === 201) {
                setMessage('Booked successfully!');
            }
        } catch (error) {
            // Check if the time slot is already booked
            if (error.response && error.response.data.message === 'This slot has been booked') {
                setMessage('Booked already!');
            } else {
                setMessage('An error occurred while booking the appointment.');
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label htmlFor="timeFrom">Time From:</label>
                    <input
                        type="text"
                        id="timeFrom"
                        value={timeFrom}
                        onChange={(e) => setTimeFrom(e.target.value)}
                        placeholder="e.g. 11:30am"
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="timeTo">Time To:</label>
                    <input
                        type="text"
                        id="timeTo"
                        value={timeTo}
                        onChange={(e) => setTimeTo(e.target.value)}
                        placeholder="e.g. 12:30pm"
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label htmlFor="reason">Reason:</label>
                    <input
                        type="text"
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Reason for appointment"
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Book</button>
            </form>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}; const styles = {
    container: {
        maxWidth: '400px',
        margin: '0 auto',
        padding: '20px',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    inputGroup: {
        marginBottom: '15px',
    },
    button: {
        padding: '10px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    message: {
        marginTop: '15px',
        color: 'green',
    }
};
 export default Booking;