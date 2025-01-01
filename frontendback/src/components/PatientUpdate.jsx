/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePatient } from '../services/doctorService';

const PatientUpdate = () => {
    const [existingContactNumber, setExistingContactNumber] = useState('');
    const [newContactNumber, setNewContactNumber] = useState('');
    const [newName, setNewName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZjYzM2MzMGFlYWVlMDNiODAxN2YyYyIsImlhdCI6MTcyNzQxMTE0MCwiZXhwIjoxNzMwMDAzMTQwfQ.PSXD4NezMjn_3xTvUaEVibRdAghre6K1YmiRehk5ZyU'; // Manually set the token here
    const navigate = useNavigate();

    const handleUpdate = async () => {
        try {
            const patientData = {
                name: newName,
                contactNumber: newContactNumber,
                age,
                address,
                medicalHistory,
            };
            await updatePatient(existingContactNumber, patientData, token);
            alert('Patient updated successfully');
            
        } catch (error) {
            console.error('Error updating patient:', error);
            alert('Error updating patient. Please check the console for more details.');
        }
    };

    return (
        <div>
            <h2>Update Patient</h2>
            <div>
                <label>Existing Contact Number:</label>
                <input
                    type="text"
                    value={existingContactNumber}
                    onChange={(e) => setExistingContactNumber(e.target.value)}
                    placeholder="Enter the existing contact number"
                />
            </div>
            <div>
                <label>New Contact Number:</label>
                <input
                    type="text"
                    value={newContactNumber}
                    onChange={(e) => setNewContactNumber(e.target.value)}
                    placeholder="Enter the new contact number"
                />
            </div>
            <div>
                <label>New Name:</label>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter the new name"
                />
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter the age"
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter the address"
                />
            </div>
            <div>
                <label>Medical History:</label>
                <textarea
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    placeholder="Enter medical history"
                />
            </div>
            <button onClick={handleUpdate}>Update Patient</button>
        </div>
    );
};

export default PatientUpdate;*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updatePatient } from '../services/doctorService';

const PatientUpdate = () => {
    const [existingContactNumber, setExistingContactNumber] = useState('');
    const [newContactNumber, setNewContactNumber] = useState('');
    const [newName, setNewName] = useState('');
    const [age, setAge] = useState('');
    const [address, setAddress] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [image, setImage] = useState(null);  // State for image file
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZmQ2M2Y4MzE5MGQ1YzdiZmY3ZTkxZSIsImlhdCI6MTcyNzg4MjIzMiwiZXhwIjoxNzMwNDc0MjMyfQ.5GxHzXo_FboXZeq-TcQY9vfW3PD-V2XLaHiyAW0fNpc'; // Manually set the token here
    const navigate = useNavigate();

    // Handle file input change
    const handleFileChange = (e) => {
        setImage(e.target.files[0]); // Set the selected image file
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', newName);
            formData.append('contactNumber', newContactNumber);
            formData.append('age', age);
            formData.append('address', address);
            formData.append('medicalHistory', medicalHistory);

            if (image) {
                formData.append('image', image);  // Append the image file to form data
            }

            await updatePatient(existingContactNumber, formData, token);  // Pass FormData instead of plain JSON
            alert('Patient updated successfully');
            navigate('/success');  // Redirect to success page
        } catch (error) {
            console.error('Error updating patient:', error);
            alert('Error updating patient. Please check the console for more details.');
        }
    };

    return (
        <div>
            <h2>Update Patient</h2>
            <div>
                <label>Existing Contact Number:</label>
                <input
                    type="text"
                    value={existingContactNumber}
                    onChange={(e) => setExistingContactNumber(e.target.value)}
                    placeholder="Enter the existing contact number"
                />
            </div>
            <div>
                <label>New Contact Number:</label>
                <input
                    type="text"
                    value={newContactNumber}
                    onChange={(e) => setNewContactNumber(e.target.value)}
                    placeholder="Enter the new contact number"
                />
            </div>
            <div>
                <label>New Name:</label>
                <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Enter the new name"
                />
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Enter the age"
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter the address"
                />
            </div>
            <div>
                <label>Medical History:</label>
                <textarea
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
                    placeholder="Enter medical history"
                />
            </div>
            <div>
                <label>Upload Image:</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"  // Only accept image file types
                />
            </div>
            <button onClick={handleUpdate}>Update Patient</button>
        </div>
    );
};

export default PatientUpdate;
