import React, { useState, useEffect } from 'react';
import { fetchAdmissions, updateRoomAllocation } from '../services/api';

const RoomAllocationForm = () => {
    const [admissions, setAdmissions] = useState([]);
    const [selectedAdmission, setSelectedAdmission] = useState('');
    const [formData, setFormData] = useState({
        ward_type: '',
        room_number: '',
        bed_number: '',
        private_room: false,
        floor_preference: '',
    });
    const [message, setMessage] = useState('');
    const [updatedRoomDetails, setUpdatedRoomDetails] = useState(null);
    const [prefer,setPreferences ] = useState(null);
    useEffect(() => {
        const getAdmissions = async () => {
            try {
                const data = await fetchAdmissions();
                setAdmissions(data);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };
        getAdmissions();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedAdmission) {
            setMessage('Please select an admission ID.');
            return;
        }
        try {
            const response = await updateRoomAllocation(selectedAdmission, formData);
            setMessage(response.message || 'Room details updated successfully.');
            setUpdatedRoomDetails(response.room);
            setPreferences(response.room.preferences);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error updating room details.');
        }
    };

    return (
        <div className="room-allocation-form">
            <h2>Room Allocation</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Select Admission:
                    <select
                        value={selectedAdmission}
                        onChange={(e) => setSelectedAdmission(e.target.value)}
                        required
                    >
                        <option value="">-- Select Admission --</option>
                        {admissions.map((admission) => (
                            <option key={admission._id} value={admission._id}>
                                {admission._id}
                            </option>
                        ))}
                    </select>
                </label>

                <label>
                    Ward Type:
                    <input
                        type="text"
                        name="ward_type"
                        value={formData.ward_type}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Room Number:
                    <input
                        type="text"
                        name="room_number"
                        value={formData.room_number}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Bed Number:
                    <input
                        type="text"
                        name="bed_number"
                        value={formData.bed_number}
                        onChange={handleChange}
                        required
                    />
                </label>

                <label>
                    Private Room:
                    <input
                        type="checkbox"
                        name="private_room"
                        checked={formData.private_room}
                        onChange={handleChange}
                    />
                </label>

                <label>
                    Floor Preference:
                    <input
                        type="number"
                        name="floor_preference"
                        value={formData.floor_preference}
                        onChange={handleChange}
                    />
                </label>
                {updatedRoomDetails && (
                    <div className="updated-room-details">
                        <h3>Updated Room Details</h3>
                        <p>
                            <strong>Ward Type:</strong> {updatedRoomDetails.ward_type}
                        </p>
                        <p>
                            <strong>Room Number:</strong> {updatedRoomDetails.room_number}
                        </p>
                        <p>
                            <strong>Bed Number:</strong> {updatedRoomDetails.bed_number}
                        </p>
                        <p>
                            <strong>Floor prefer:</strong> {prefer.floor_preference}
                        </p>
                        
                    </div>
                )}
               
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};
export default RoomAllocationForm;