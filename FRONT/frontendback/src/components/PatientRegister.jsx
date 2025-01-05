/*import React, { useState, useContext } from 'react';
import { registerPatient } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';
const DoctorLogin = () => {
    const [name, setname] = useState('');
    const [age, setage] = useState('');
    const [gender, setgender] = useState('');
    const [address, setaddress] = useState('');
    const [contactNumber, setcontactNumber] = useState('');
    const [medicalHistory, setmedicalHistory] = useState('');
    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();
    const validateForm = () => {
        if (!name || !age || !gender || !address || !contactNumber || !medicalHistory) {
            alert('Please fill up every box.');
            return false;
        }

        return true;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await registerPatient({
                name,
                age,
                gender,
                address,
                contactNumber,
                medicalHistory, });
            if (response && response.data) {
                setDoctor(response.data.doctor);
                setToken(response.data.token);
                navigate('/login');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Email is already used. Please try another one.');
            } else {
                alert(`Registration error: ${error.message}`);
            }
        }
    };
    
      
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                />
            </div>
            <div>
                <label>age:</label>
                <input
                    type="number"
                    value={age}
                    onChange={(e) => setage(e.target.value)}
                />
            </div>
            <div>
                <label>gender:</label>
                <input
                    type="text"
                    value={gender}
                    onChange={(e) => setgender(e.target.value)}
                />
            </div>
            <div>
                <label>address:</label>
                <input
                    type="text"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                />
            </div>
            <div>
                <label>contact:</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setcontactNumber(e.target.value)}
                />
            </div>
            <div>
                <label>medical History:</label>
                <input
                    type="text"
                    value={medicalHistory}
                    onChange={(e) => setmedicalHistory(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
            <div>
                <p>Has not registered yet? <button onClick={() => navigate('/register')}>Register</button></p>

            </div>
        </form>
    );
};

export default DoctorLogin;*/
/*
import React, { useState, useContext } from 'react';
import { registerPatient } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [image, setImage] = useState(null);  // For the image upload
    const [imagePreview, setImagePreview] = useState('');  // For image preview

    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));  // Generate image preview
    };
   

    const validateForm = () => {
        if (!name || !age || !gender || !address || !contactNumber || !medicalHistory ) {
            alert('Please fill up every box and upload an image.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();  // FormData to handle multipart data
        formData.append('name', name);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('contactNumber', contactNumber);
        formData.append('medicalHistory', medicalHistory);
        formData.append('image', image);  // Attach the image file

        try {
            const response = await registerPatient(formData);  // Send as form data
            if (response && response.data) {
                setDoctor(response.data.doctor);
                setToken(response.data.token);
                navigate('/login');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Email is already used. Please try another one.');
            } else {
                alert(`Registration error: ${error.message}`);
            }
        }
    };


    return (
        <form onSubmit={handleSubmit} >
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <label>Contact:</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
            </div>
            <div>
                <label>Medical History:</label>
                <input
                    type="text"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
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
            {imagePreview && <div>
                <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />
            </div>}
            <button type="submit">Register</button>
            <div>
                <p>Not registered yet? <button onClick={() => navigate('/register')}>Register</button></p>
            </div>
        </form>
    );
};

export default DoctorLogin;*/

/*import React, { useState, useContext } from 'react';
import { registerPatient } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate } from 'react-router-dom';

const PatientRegister = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [image, setImage] = useState(null);  // For the image upload
    const [imagePreview, setImagePreview] = useState('');  // For image preview

    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));  // Generate image preview
    };

    const validateForm = () => {
        if (!name || !age || !gender || !address || !contactNumber || !medicalHistory) {
            alert('Please fill up every box and upload an image.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();  // FormData to handle multipart data
        formData.append('name', name);
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('contactNumber', contactNumber);
        formData.append('medicalHistory', medicalHistory);
        if (image) {
            formData.append('image' , image);  // Attach the image file if available
        }

        try {
            const response = await registerPatient(formData);  // Send as form data
            if (response && response.data) {
                setDoctor(response.data.doctor);
                setToken(response.data.token);
                navigate('/login');
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            if (error.response && error.response.status === 409) {
                alert('Email is already used. Please try another one.');
            } else {
                alert(`Registration error: ${error.message}`);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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
                <label>Contact:</label>
                <input
                    type="text"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                />
            </div>
            <div>
                <label>Medical History:</label>
                <input
                    type="text"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
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
            {imagePreview && <div>
                <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />
            </div>}
            <button type="submit">Register</button>
        </form>
    );
};

export default PatientRegister;
*/

import React, { useState, useContext } from 'react';
import { registerPatient } from '../services/doctorService';
import { DoctorContext } from '../context/DoctorContext';
import { useNavigate, useParams } from 'react-router-dom';

const PatientRegister = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');  // New field
    const [password, setPassword] = useState('');  // New field
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [medicalHistory, setMedicalHistory] = useState('');
    const [image, setImage] = useState(null);  // For the image upload
    const [imagePreview, setImagePreview] = useState('');  // For image preview

    const { setDoctor, setToken } = useContext(DoctorContext);
    const navigate = useNavigate();
    const { doctorId } = useParams();  // Retrieve doctorId from route params

    // Handle image file selection and preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImagePreview(URL.createObjectURL(file));  // Generate image preview
    };

    const validateForm = () => {
        if (!name || !email || !password || !age || !gender || !address || !contactNumber || !medicalHistory) {
            alert('Please fill out all required fields and upload an image.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();  // FormData to handle multipart data
        formData.append('name', name);
        formData.append('email', email);  // Attach email
        formData.append('password', password);  // Attach password
        formData.append('age', age);
        formData.append('gender', gender);
        formData.append('address', address);
        formData.append('contactNumber', contactNumber);
        formData.append('medicalHistory', medicalHistory);
        if (image) {
            formData.append('image', image);  // Attach the image file if available
        }

        try {
            // Pass the doctorId in the API call
            const response = await registerPatient(doctorId, formData);  // Updated to send doctorId
            if (response && response.data) {
                setDoctor(response.data.doctor);
                
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
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Email:</label>  {/* New field */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>  {/* New field */}
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
                <label>Medical History:</label>
                <input
                    type="text"
                    value={medicalHistory}
                    onChange={(e) => setMedicalHistory(e.target.value)}
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
            {imagePreview && <div>
                <img src={imagePreview} alt="Image Preview" style={{ width: '100px', height: '100px' }} />
            </div>}
            <button type="submit">Register</button>
        </form>
    );
};

export default PatientRegister;
