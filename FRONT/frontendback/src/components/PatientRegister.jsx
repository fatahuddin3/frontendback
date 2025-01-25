
import React, { useState } from 'react';
import { registerPatient } from '../services/doctorService';

import { useNavigate } from 'react-router-dom';
import './PatientRegister.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');


    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const validateForm = () => {
        if (!name || !email || !password || !age || !gender || !address || !contactNumber) {
            alert('Please fill out all required fields and upload an image.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('contactNumber', contactNumber);
        if (image) {
            formData.append('image', image);
        }

        try {
            const response = await registerPatient(formData);
            if (response && response.data) {

                navigate('/login');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Contact number is already used. Please try another one.');
            } else {
                alert(`Registration error: ${error.message}`);
            }
        }
    };

    return (
        <form className="form-container" onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <label>Age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
            </div>
            <div>
                <label>Gender:</label>
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <div>
                <label>Contact Number:</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </div>
            {imagePreview && (
                <div className="image-preview">
                    <img src={imagePreview} alt="Image Preview" />
                </div>
            )}
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
