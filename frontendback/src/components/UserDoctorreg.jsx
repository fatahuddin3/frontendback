import React, { useState } from 'react';
import { registerUser } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
        specialization:'',
        phone:''// Default role
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            console.log('Sending data:', formData); // Debug input data
            const response = await registerUser(formData);
            console.log('Received response:', response); // Debug API response
            if (response?.data?.token) {
                localStorage.setItem('token', response.data.token);
                setSuccess('Registration successful! Redirecting to login...');
                navigate('/userreg');
            } else {
                throw new Error('Registration failed: No token received');
            }
        } catch (err) {
            console.error('Registration error:', err);
            setError(err.message || 'An error occurred during registration.');
        }
    };


    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Register User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Speci</label>
                    <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        required
                    />
                </div>


                <div>
                    <label>Role</label>
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Select a role</option>
                        <option value="admin">Admin</option>
                        <option value="doctor">Doctor</option>
                        <option value="patient">Patient</option>
                    </select>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;
