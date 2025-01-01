

import React, { useState } from "react";
import axios from "axios";

const PatientRegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        contact: "",
        address: "",
        emergency_contact_name: "",
        emergency_contact_phone: "",
        insurance_details: ""
    });

    const [message, setMessage] = useState({ status: "", text: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            name,
            age,
            gender,
            contact,
            address,
            emergency_contact_name,
            emergency_contact_phone,
            insurance_details
        } = formData;

        if (!name || !age || !gender || !contact || !address || !emergency_contact_name || !emergency_contact_phone) {
            setMessage({ status: "error", text: "Please fill in all required fields." });
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/user/patients/register", {
                name,
                age,
                gender,
                contact,
                address,
                emergency_contact: {
                    name: emergency_contact_name,
                    phone: emergency_contact_phone
                },
                insurance_details
            });

            setMessage({ status: "success", text: response.data.message });
            setFormData({
                name: "",
                age: "",
                gender: "",
                contact: "",
                address: "",
                emergency_contact_name: "",
                emergency_contact_phone: "",
                insurance_details: ""
            });
        } catch (error) {
            setMessage({ status: "error", text: "Failed to register patient. Try again." });
        }
    };

    return (
        <div className="patient-form-container">
            <h2>Patient Registration</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} />
                </label>
                <label>
                    Age:
                    <input type="number" name="age" value={formData.age} onChange={handleChange} />
                </label>
                <label>
                    Gender:
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                </label>
                <label>
                    Contact:
                    <input type="text" name="contact" value={formData.contact} onChange={handleChange} />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} />
                </label>
                <label>
                    Emergency Contact Name:
                    <input type="text" name="emergency_contact_name" value={formData.emergency_contact_name} onChange={handleChange} />
                </label>
                <label>
                    Emergency Contact Phone:
                    <input type="text" name="emergency_contact_phone" value={formData.emergency_contact_phone} onChange={handleChange} />
                </label>
                <label>
                    Insurance Details (optional):
                    <input type="text" name="insurance_details" value={formData.insurance_details} onChange={handleChange} />
                </label>
                <button type="submit">Register Patient</button>
            </form>
            {message.text && (
                <p className={message.status === "error" ? "error-message" : "success-message"}>
                    {message.text}
                </p>
            )}
        </div>
    );
};

export default PatientRegistrationForm;
