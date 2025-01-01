/*import React, { useState } from 'react';
import { loginUser } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
       
        email: '',
        password: '',
       // Default role
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
            const response = await loginUser(formData);
            console.log('Received response:', response); // Debug API response
            if (response?.data?.token) {
                localStorage.setItem('token', response.data.token);
                setSuccess('Registration successful! Redirecting to login...');
                navigate('/usedel');
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
            <h2>Login User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
              
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
                
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterForm;*/


import React, { useState } from 'react';
import { loginUser } from '../services/doctorService';
import { useNavigate } from 'react-router-dom';

const LogForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
            const response = await loginUser(formData);
            console.log('Received response:', response); // Debug API response

            if (response?.data?.token && response?.data?.user?.role) {
                localStorage.setItem('token', response.data.token);

                // Role-based navigation
                const role = response.data.user.role;
                if (role === 'doctor') {
                    navigate('/login');
                } else if (role === 'staff') {
                    navigate('/register');
                } else {
                    navigate('/docup'); // Handle other roles or fallback
                }

                setSuccess('Login successful! Redirecting...');
            } else {
                throw new Error('Login failed: Invalid credentials or role not found.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'An error occurred during login.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto' }}>
            <h2>Login User</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LogForm;




