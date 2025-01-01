/*// src/components/BillsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDZiNWY2ZTM2YzExZmQ0NWU4YTE5MCIsImlhdCI6MTcyODQ5MzA0NiwiZXhwIjoxNzMxMDg1MDQ2fQ.hB68OQb_Gj7R4NLaQCEduHZJ_MBH3lufU11KStUfs9k'; // Manually set token
                const response = await axios.get('http://localhost:4000/bills', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setBills(response.data);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        fetchBills();
    }, []);

    const fetchBillDetails = async (id) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDZiNWY2ZTM2YzExZmQ0NWU4YTE5MCIsImlhdCI6MTcyODQ5MzA0NiwiZXhwIjoxNzMxMDg1MDQ2fQ.hB68OQb_Gj7R4NLaQCEduHZJ_MBH3lufU11KStUfs9k'; // Manually set token
            const response = await axios.get(`http://localhost:4000/bills/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSelectedBill(response.data);
        } catch (error) {
            console.error('Error fetching bill details:', error);
        }
    };

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {*//* List of Bills *//*}
            <div style={{ flex: 1, marginRight: '20px' }}>
                <h2>All Bills</h2>
                <ul>
                    {bills.map((bill) => (
                        <li
                            key={bill._id}
                            onClick={() => fetchBillDetails(bill._id)}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            {bill.patientName}
                        </li>
                    ))}
                </ul>
            </div>

            {*//* Bill Details *//*}
            <div style={{ flex: 2 }}>
                {selectedBill ? (
                    <div>
                        <h2>Bill Details</h2>
                        <p><strong>Patient Name:</strong> {selectedBill.patientName}</p>
                        <p><strong>Doctor:</strong> {selectedBill.doctor.name} ({selectedBill.doctor.specialization})</p>
                        <p><strong>Amount:</strong> ${selectedBill.amount}</p>
                        <p><strong>Status:</strong> {selectedBill.status}</p>
                        <p><strong>Issue Date:</strong> {new Date(selectedBill.issueDate).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p>Select a patient to see their bill details</p>
                )}
            </div>
        </div>
    );
};

export default BillsPage;*/

// src/components/BillsPage.js
/*import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDZiNWY2ZTM2YzExZmQ0NWU4YTE5MCIsImlhdCI6MTcyODQ5MzA0NiwiZXhwIjoxNzMxMDg1MDQ2fQ.hB68OQb_Gj7R4NLaQCEduHZJ_MBH3lufU11KStUfs9k'; // Manually set token
                const response = await axios.get('http://localhost:4000/bills', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setBills(response.data);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        fetchBills();
    }, []);

    const fetchBillDetails = async (id) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDZiNWY2ZTM2YzExZmQ0NWU4YTE5MCIsImlhdCI6MTcyODQ5MzA0NiwiZXhwIjoxNzMxMDg1MDQ2fQ.hB68OQb_Gj7R4NLaQCEduHZJ_MBH3lufU11KStUfs9k'; // Manually set token
            const response = await axios.get(`http://localhost:4000/bills/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSelectedBill(response.data);
            setShowImage(false); // Hide the image when selecting a new bill
        } catch (error) {
            console.error('Error fetching bill details:', error);
        }
    };

    const renderImage = () => {
        setShowImage(true);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = 'src/exp.jpg'; // Replace with the correct path to the image

        image.onload = () => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            context.font = '16px Arial';
            context.fillStyle = '#000';

            // Overlay text
            context.fillText(`Name: ${selectedBill.patientName}`, 20, 40);
            context.fillText(`Age: ${selectedBill.amount}`, 20, 80);
            context.fillText(`Sex: ${selectedBill.status}`, 20, 120);
            context.fillText(`Diagnosis: ${selectedBill.amount}`, 20, 160);
        };
    };

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {*//* List of Bills *//*}
            <div style={{ flex: 1, marginRight: '20px' }}>
                <h2>All Bills</h2>
                <ul>
                    {bills.map((bill) => (
                        <li
                            key={bill._id}
                            onClick={() => fetchBillDetails(bill._id)}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            {bill.patientName}
                        </li>
                    ))}
                </ul>
            </div>

            {*//* Bill Details *//*}
            <div style={{ flex: 2 }}>
                {selectedBill ? (
                    <div>
                        <h2>Bill Details</h2>
                        <p><strong>Patient Name:</strong> {selectedBill.patientName}</p>
                        <p><strong>Doctor:</strong> {selectedBill.doctor.name} ({selectedBill.doctor.specialization})</p>
                        <p><strong>Amount:</strong> ${selectedBill.amount}</p>
                        <p><strong>Status:</strong> {selectedBill.status}</p>
                        <p><strong>Issue Date:</strong> {new Date(selectedBill.issueDate).toLocaleDateString()}</p>

                        {*//* View Image Button *//*}
                        <button onClick={renderImage} style={{ marginTop: '20px' }}>
                            View Image
                        </button>

                        {*//* Render the image in a canvas *//*}
                        {showImage && (
                            <canvas
                                ref={canvasRef}
                                width={500}
                                height={600}
                                style={{ border: '1px solid #000', marginTop: '20px' }}
                            ></canvas>
                        )}
                    </div>
                ) : (
                    <p>Select a patient to see their bill details</p>
                )}
            </div>
        </div>
    );
};

export default BillsPage;*/

// src/components/BillsPage.js
// src/components/BillsPage.js
/*import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc2OGU3YTQ4NWExMzlmNDE3YTdjMCIsImlhdCI6MTcyOTU4NzQzMSwiZXhwIjoxNzMyMTc5NDMxfQ.64eEqcTA_Q0brDlj1CLQPUtqKT0YNUOZWJLJZbPaxBM'; // Manually set token
                const response = await axios.get('http://localhost:4000/bills', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setBills(response.data);
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        fetchBills();
    }, []);

    const fetchBillDetails = async (id) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc2OGU3YTQ4NWExMzlmNDE3YTdjMCIsImlhdCI6MTcyOTU4NzQzMSwiZXhwIjoxNzMyMTc5NDMxfQ.64eEqcTA_Q0brDlj1CLQPUtqKT0YNUOZWJLJZbPaxBM'; // Manually set token
            const response = await axios.get(`http://localhost:4000/bills/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSelectedBill(response.data);
            setShowImage(false); // Hide the image when selecting a new bill
        } catch (error) {
            console.error('Error fetching bill details:', error);
        }
    };

    const renderImage = () => {
        setShowImage(true);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = 'src/exp.jpg'; // Replace with the correct path to the image

        image.onload = () => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            context.font = '16px Arial';
            context.fillStyle = '#000';

            // Overlaying the text values in the positions of the existing fields
            context.fillText(selectedBill.patientName, 130, 53); // Adjust these coordinates
            context.fillText(selectedBill.amount.toString(), 100, 80); // Adjust these coordinates
            context.fillText(selectedBill.status, 100, 120); // Adjust these coordinates
            context.fillText(selectedBill.amount.toString(), 100, 160); // Adjust these coordinates
        };
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg'); // Convert canvas to a data URL for JPEG format
        link.download = `${selectedBill.patientName}-bill.jpg`; // Set a default filename for the downloaded image
        link.click();
    };

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {*//* List of Bills *//*}
            <div style={{ flex: 1, marginRight: '20px' }}>
                <h2>All Bills</h2>
                <ul>
                    {bills.map((bill) => (
                        <li
                            key={bill._id}
                            onClick={() => fetchBillDetails(bill._id)}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            {bill.patientName}
                        </li>
                    ))}
                </ul>
            </div>

            {*//* Bill Details *//*}
            <div style={{ flex: 2 }}>
                {selectedBill ? (
                    <div>
                        <h2>Bill Details</h2>
                        <p><strong>Patient Name:</strong> {selectedBill.patientName}</p>
                        <p><strong>Doctor:</strong> {selectedBill.doctor.name} ({selectedBill.doctor.specialization})</p>
                        <p><strong>Amount:</strong> ${selectedBill.amount}</p>
                        <p><strong>Status:</strong> {selectedBill.status}</p>
                        <p><strong>Issue Date:</strong> {new Date(selectedBill.issueDate).toLocaleDateString()}</p>

                        {*//* View Image Button *//*}
                        <button onClick={renderImage} style={{ marginTop: '20px' }}>
                            View Image
                        </button>

                        {*//* Render the image in a canvas *//*}
                        {showImage && (
                            <div>
                                <canvas
                                    ref={canvasRef}
                                    width={500}
                                    height={600}
                                    style={{ border: '1px solid #000', marginTop: '20px' }}
                                ></canvas>
                                <button onClick={downloadImage} style={{ marginTop: '10px' }}>
                                    Download Image
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Select a patient to see their bill details</p>
                )}
            </div>
        </div>
    );
};

export default BillsPage;*/

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const BillsPage = () => {
    const [bills, setBills] = useState([]);
    const [filteredBills, setFilteredBills] = useState([]);
    const [selectedBill, setSelectedBill] = useState(null);
    const [showImage, setShowImage] = useState(false);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTc2OGU3YTQ4NWExMzlmNDE3YTdjMCIsImlhdCI6MTcyOTU4NzQzMSwiZXhwIjoxNzMyMTc5NDMxfQ.64eEqcTA_Q0brDlj1CLQPUtqKT0YNUOZWJLJZbPaxBM'; // Manually set token
                const response = await axios.get('http://localhost:4000/bills', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setBills(response.data);
                setFilteredBills(response.data); // Initialize filteredBills with all bills
            } catch (error) {
                console.error('Error fetching bills:', error);
            }
        };

        fetchBills();
    }, []);

    // Function to filter bills by search term
    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredBills(
            bills.filter((bill) => bill.patientName.toLowerCase().includes(value))
        );
    };

    const fetchBillDetails = async (id) => {
        try {
            const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NGRjNzg1ZWViOTYyZTczODRlOGNkZCIsImlhdCI6MTczMzE1MDU5OCwiZXhwIjoxNzQxNzkwNTk4fQ.fKpLq2Wt5u6zeuRHtHONl_RAEq2reC9itQJ5FwZ9uH0'; // Manually set token
            const response = await axios.get(`http://localhost:4000/bills/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setSelectedBill(response.data);
            setShowImage(false); // Hide the image when selecting a new bill
        } catch (error) {
            console.error('Error fetching bill details:', error);
        }
    };

    const renderImage = () => {
        setShowImage(true);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = 'src/exp.jpg'; // Replace with the correct path to the image

        image.onload = () => {
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            context.font = '16px Arial';
            context.fillStyle = '#000';

            // Overlaying the text values in the positions of the existing fields
            context.fillText(selectedBill.patientName, 130, 53); // Adjust these coordinates
            context.fillText(selectedBill.amount.toString(), 100, 80); // Adjust these coordinates
            context.fillText(selectedBill.status, 100, 120); // Adjust these coordinates
            context.fillText(selectedBill.amount.toString(), 100, 160); // Adjust these coordinates
        };
    };

    const downloadImage = () => {
        const canvas = canvasRef.current;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/jpeg'); // Convert canvas to a data URL for JPEG format
        link.download = `${selectedBill.patientName}-bill.jpg`; // Set a default filename for the downloaded image
        link.click();
    };

    return (
        <div style={{ display: 'flex', padding: '20px' }}>
            {/* List of Bills */}
            <div style={{ flex: 1, marginRight: '20px' }}>
                <h2>All Bills</h2>
                {/* Search input */}
                <input
                    type="text"
                    placeholder="Search by patient name"
                    value={searchTerm}
                    onChange={handleSearch}
                    style={{ marginBottom: '20px', padding: '5px' }}
                />
                <ul>
                    {filteredBills.map((bill) => (
                        <li
                            key={bill._id}
                            onClick={() => fetchBillDetails(bill._id)}
                            style={{ cursor: 'pointer', marginBottom: '10px' }}
                        >
                            {bill.patientName}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Bill Details */}
            <div style={{ flex: 2 }}>
                {selectedBill ? (
                    <div>
                        <h2>Bill Details</h2>
                        <p><strong>Patient Name:</strong> {selectedBill.patientName}</p>
                        <p><strong>Doctor:</strong> {selectedBill.doctor.name} ({selectedBill.doctor.specialization})</p>
                        <p><strong>Amount:</strong> ${selectedBill.amount}</p>
                        <p><strong>Status:</strong> {selectedBill.status}</p>
                        <p><strong>Issue Date:</strong> {new Date(selectedBill.issueDate).toLocaleDateString()}</p>

                        {/* View Image Button */}
                        <button onClick={renderImage} style={{ marginTop: '20px' }}>
                            View Image
                        </button>

                        {/* Render the image in a canvas */}
                        {showImage && (
                            <div>
                                <canvas
                                    ref={canvasRef}
                                    width={500}
                                    height={600}
                                    style={{ border: '1px solid #000', marginTop: '20px' }}
                                ></canvas>
                                <button onClick={downloadImage} style={{ marginTop: '10px' }}>
                                    Download Image
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Select a patient to see their bill details</p>
                )}
            </div>
        </div>
    );
};

export default BillsPage;

/*
import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [patients, setPatients] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [admissionId, setAdmissionId] = useState("");
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch patients and admissions data on component mount
    useEffect(() => {
        axios
            .get("http://localhost:4000/pati/pa")
            .then(({ data }) => setPatients(data))
            .catch((err) => console.error("Error fetching patients:", err));

        axios
            .get("http://localhost:4000/user/admiss")
            .then(({ data }) => setAdmissions(data))
            .catch((err) => console.error("Error fetching admissions:", err));
    }, []);

    // Fetch specific admission details and prepopulate the form
    const fetchAdmissionDetails = async () => {
        if (!patientId || !admissionId) return;

        setLoading(true);
        try {
            const { data } = await axios.put(`http://localhost:4000/user/patientss/${patientId}/admissions/${admissionId}`);
            setFormData({
                room_allocation: {
                    ward_type: data.admission.room_allocation?.ward_type || "",
                    preferences: {
                        private_room: data.admission.room_allocation?.preferences?.private_room || false,
                        floor_preference: data.admission.room_allocation?.preferences?.floor_preference || ""
                    },
                    room_number: data.admission.room_allocation?.room_number || "",
                    bed_number: data.admission.room_allocation?.bed_number || ""
                },
                consent: {
                    documents: data.admission.consent?.documents?.length > 0
                        ? data.admission.consent.documents
                        : [{ type: "", url: "" }],
                    signed_by: data.admission.consent?.consent?.signed_by || "",
                    relationship_to_patient: data.admission.consent?.consent?.relationship_to_patient || "",
                    date_signed: data.admission.consent?.consent?.date_signed || ""
                },
                assessments: data.admission.assessments.map((assessment) => ({
                    vitals: {
                        temperature: assessment.vitals?.temperature || "",
                        blood_pressure: assessment.vitals?.blood_pressure || "",
                        pulse: assessment.vitals?.pulse || "",
                        respiration_rate: assessment.vitals?.respiration_rate || ""
                    },
                    notes: assessment.notes || "",
                    nurse_id: assessment.nurse_id || "",
                    assessment_date: assessment.assessment_date || ""
                }))
            });
        } catch (err) {
            console.error("Error fetching admission details:", err);
        }
        setLoading(false);
    };

    // Trigger fetching admission details when both patientId and admissionId are selected
    useEffect(() => {
        fetchAdmissionDetails();
    }, [patientId, admissionId]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        setFormData((prev) => {
            const updatedFormData = { ...prev };

            // Handle nested fields for room_allocation preferences
            if (name.startsWith("preferences.")) {
                const [_, subKey] = name.split(".");
                updatedFormData.room_allocation.preferences[subKey] =
                    type === "checkbox" ? checked : value;
            }

            // Handle nested fields for documents in consent
            else if (name.startsWith("documents.")) {
                const [_, index, subKey] = name.split(".");
                updatedFormData.consent.documents[index][subKey] = value;
            }

            // Handle nested fields for assessments
            else if (name.startsWith("assessments.")) {
                const [_, index, key, subKey] = name.split(".");
                if (key === "vitals") {
                    updatedFormData.assessments[index].vitals[subKey] = value;
                } else {
                    updatedFormData.assessments[index][key] = value;
                }
            }

            // Handle all other fields
            else {
                const [key, subKey] = name.split(".");
                if (subKey) {
                    updatedFormData[key][subKey] = value;
                } else {
                    updatedFormData[name] = value;
                }
            }

            return updatedFormData;
        });
    };


    const handleUpdate = async (e) => {
        e.preventDefault();

        if (!formData) return;

        try {
            const payload = {
                room_allocation: {
                    ...formData.room_allocation,
                    preferences: {
                        ...formData.room_allocation.preferences,
                        floor_preference: formData.room_allocation.preferences.floor_preference || undefined
                    }
                },
                consent: {
                    ...formData.consent,
                    documents: formData.consent.documents.map((doc) => ({
                        type: doc.type || undefined,
                        url: doc.url || undefined
                    })),

                },
                assessments: formData.assessments.map((assessment) => ({
                    vitals: {
                        ...assessment.vitals,
                        pulse: assessment.vitals.pulse || undefined,
                        temperature: assessment.vitals.temperature || undefined,
                        blood_pressure: assessment.vitals.blood_pressure || undefined,
                        respiration_rate: assessment.vitals.respiration_rate || undefined
                    },
                    notes: assessment.notes || undefined,
                    nurse_id: assessment.nurse_id || undefined,
                    assessment_date: assessment.assessment_date || undefined
                }))
            };

            const { data } = await axios.put(`http://localhost:4000/user/patientss/${patientId}/admissions/${admissionId}`, payload);
            alert("Admission updated successfully!");
            setFormData(data.admission); // Refresh the form with updated values
        } catch (err) {
            console.error("Error updating admission:", err.response?.data || err);
            alert(err.response?.data?.message || "Error updating admission.");
        }
    };

    return (
        <div>
            <h1>Manage Admissions</h1>
            <div>
                <label>Patient:</label>
                <select onChange={(e) => setPatientId(e.target.value)}>
                    <option value="">-- Select Patient --</option>
                    {patients.map((p) => (
                        <option key={p._id} value={p._id}>
                            {p.name}
                        </option>
                    ))}
                </select>
                <label>Admission:</label>
                <select onChange={(e) => setAdmissionId(e.target.value)}>
                    <option value="">-- Select Admission --</option>
                    {admissions.map((a) => (
                        <option key={a._id} value={a._id}>
                            {a._id}
                        </option>
                    ))}
                </select>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : formData ? (
                <form onSubmit={handleUpdate}>
                    <h3>Room Allocation</h3>
                    <label>Ward Type:</label>
                    <input
                        type="text"
                        name="room_allocation.ward_type"
                        value={formData.room_allocation.ward_type}
                        onChange={handleChange}
                    />
                    <label>Private Room:</label>
                    <input
                        type="checkbox"
                        name="preferences.private_room"
                        checked={formData.room_allocation.preferences.private_room}
                        onChange={handleChange}
                    />
                    <label>Floor Preference:</label>
                    <input
                        type="number"
                        name="preferences.floor_preference"
                        value={formData.room_allocation.preferences.floor_preference}
                        onChange={handleChange}
                    />
                    <label>Room Number:</label>
                    <input
                        type="text"
                        name="room_allocation.room_number"
                        value={formData.room_allocation.room_number}
                        onChange={handleChange}
                    />
                    <label>Bed Number:</label>
                    <input
                        type="text"
                        name="room_allocation.bed_number"
                        value={formData.room_allocation.bed_number}
                        onChange={handleChange}
                    />
                    <h3>Consent</h3>
                    {formData.consent.documents.map((doc, index) => (
                        <div key={index}>
                            <label>Document Type:</label>
                            <input
                                type="text"
                                name={`documents.${index}.type`}
                                value={doc.type}
                                onChange={handleChange}
                            />
                            <label>Document URL:</label>
                            <input
                                type="text"
                                name={`documents.${index}.url`}
                                value={doc.url}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => {
                                        const updatedDocuments = prev.consent.documents.filter(
                                            (_, docIndex) => docIndex !== index
                                        );
                                        return {
                                            ...prev,
                                            consent: { ...prev.consent, documents: updatedDocuments },
                                        };
                                    })
                                }
                            >
                                Remove Document
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setFormData((prev) => ({
                                ...prev,
                                consent: {
                                    ...prev.consent,
                                    documents: [...prev.consent.documents, { type: "", url: "" }],
                                },
                            }))
                        }
                    >
                        Add Document
                    </button>
                    <label>Signed By:</label>
                    <input
                        type="text"
                        name="consent.signed_by"
                        value={formData.consent.signed_by}
                        onChange={handleChange}
                    />
                    <label>Relationship to Patient:</label>
                    <input
                        type="text"
                        name="consent.relationship_to_patient"
                        value={formData.consent.relationship_to_patient}
                        onChange={handleChange}
                    />
                    <label>Date Signed:</label>
                    <input
                        type="date"
                        name="consent.date_signed"
                        value={formData.consent.date_signed}
                        onChange={handleChange}
                    />
                    <h3>Assessments</h3>
                    {formData.assessments.map((assessment, index) => (
                        <div key={index}>
                            <h4>Assessment {index + 1}</h4>
                            <label>Temperature:</label>
                            <input
                                type="number"
                                name={`assessments.${index}.vitals.temperature`}
                                value={assessment.vitals.temperature}
                                onChange={handleChange}
                            />
                            <label>Blood Pressure:</label>
                            <input
                                type="text"
                                name={`assessments.${index}.vitals.blood_pressure`}
                                value={assessment.vitals.blood_pressure}
                                onChange={handleChange}
                            />
                            <label>Pulse:</label>
                            <input
                                type="number"
                                name={`assessments.${index}.vitals.pulse`}
                                value={assessment.vitals.pulse}
                                onChange={handleChange}
                            />
                            <label>Respiration Rate:</label>
                            <input
                                type="number"
                                name={`assessments.${index}.vitals.respiration_rate`}
                                value={assessment.vitals.respiration_rate}
                                onChange={handleChange}
                            />
                            <label>Notes:</label>
                            <input
                                type="text"
                                name={`assessments.${index}.notes`}
                                value={assessment.notes}
                                onChange={handleChange}
                            />
                            <label>Nurse ID:</label>
                            <input
                                type="text"
                                name={`assessments.${index}.nurse_id`}
                                value={assessment.nurse_id}
                                onChange={handleChange}
                            />
                            <label>Assessment Date:</label>
                            <input
                                type="date"
                                name={`assessments.${index}.assessment_date`}
                                value={assessment.assessment_date}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setFormData((prev) => {
                                        const updatedAssessments = prev.assessments.filter(
                                            (_, assessIndex) => assessIndex !== index
                                        );
                                        return {
                                            ...prev,
                                            assessments: updatedAssessments,
                                        };
                                    })
                                }
                            >
                                Remove Assessment
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={() =>
                            setFormData((prev) => ({
                                ...prev,
                                assessments: [
                                    ...prev.assessments,
                                    {
                                        vitals: { temperature: "", blood_pressure: "", pulse: "", respiration_rate: "" },
                                        notes: "",
                                        nurse_id: "",
                                        assessment_date: "",
                                    },
                                ],
                            }))
                        }
                    >
                        Add Assessment
                    </button>


                    <button type="submit">Update Admission</button>
                </form>
            ) : (
                <p>Select a patient and admission to view details.</p>
            )}
        </div>
    );
};

export default App;

*/