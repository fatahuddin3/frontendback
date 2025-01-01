/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
    const [patients, setPatients] = useState([]);
    const [inventory, setInventory] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [newValues, setNewValues] = useState({
        newname: '',
        newdosage: '',
       
    });
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDFiYjkxOTdmZTRlZmRkNjljNjM5YiIsImlhdCI6MTczMjM2MTEwNiwiZXhwIjoxNzQxMDAxMTA2fQ.BKVkmyxJpnDqTTufM189WN1OEoNYb3zjot3BXRm9eEk';

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:4000/phar/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patient list:', error);
            }
        };
        fetchPatients();
    }, []);

    const fetchMedicalRecords = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4000/phar/pharmacy/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching medical records:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewValues({
            ...newValues,
            [name]: value
        });
    };
    const updateMedicalHistory = async (recordIndex, medIndex) => {
        const currentRecord = inventory[recordIndex];
        const currentMedication = currentRecord.inventory[medIndex];
        const { _id: medicationId } = currentMedication; // Get unique ID
        const { newname, newdosage } = newValues;

        try {
            await axios.put(
                'http://localhost:4000/phar/medireco/history/update',
                {
                    updates: [
                        {
                            medicationId,
                            newname,
                            newdosage,
                           
                        }
                    ]
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            alert('Medical history updated successfully');
            fetchMedicalRecords(currentRecord._id); // Refresh the updated medical records
        } catch (error) {
            console.error('Error updating medical history:', error);
        }
    };


    return (
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>

            <div style={{ flex: 1, padding: '1rem', borderRight: '1px solid #ccc' }}>
                <h1>Patient List</h1>
                <ul>
                    {patients.map((patient) => (
                        <li key={patient._id} onClick={() => fetchMedicalRecords(patient._id)}>
                            {patient.name}
                        </li>
                    ))}
                </ul>
            </div>


            <div style={{ flex: 2, padding: '1rem' }}>
                {inventory.length > 0 ? (
                    <div>
                        <h2>Medical Records</h2>
                        {inventory.map((record, recordIndex) => (
                            <div key={record._id} style={{ marginBottom: '1rem', border: '1px solid #ddd', padding: '1rem' }}>
                                <h3>Prescription ID: {record._id}</h3>
                                {record.inventory.map((medication, medIndex) => (
                                    <div key={medIndex}>
                                        <h4>Medication {medIndex + 1}</h4>
                                        <p>name: {medication.name || 'N/A'}</p>
                                        <p>dosage: {medication.quantity || 'N/A'}</p>
                                        
                                        <button onClick={() => setEditIndex(`${recordIndex}-${medIndex}`)}>Update</button>

                                        {editIndex === `${recordIndex}-${medIndex}` && (
                                            <div>
                                                <input
                                                    type="text"
                                                    name="newname"
                                                    placeholder="New name"
                                                    value={newValues.newname || medication.name}
                                                    onChange={handleInputChange}
                                                />
                                                <input
                                                    type="number"
                                                    name="newdosage"
                                                    placeholder="New dosage"
                                                    value={newValues.newdosage || medication.quantity}
                                                    onChange={handleInputChange}
                                                />
                                               
                                                <button onClick={() => updateMedicalHistory(recordIndex, medIndex)}>Submit Update</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Select a patient to view their prescriptions.</p>
                )}
            </div>
        </div>
    );
};

export default App;*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [inventory, setInventory] = useState([]); // Holds fetched inventory
    const [selectedItem, setSelectedItem] = useState(null); // Item being edited
    const [error, setError] = useState(''); // Error message

    // Hardcoded values for token and pharmacyId
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA2OWE4YzJhOTE2YWY0Y2RiZjc3MCIsImlhdCI6MTczMjI3NDYwMCwiZXhwIjoxNzQwOTE0NjAwfQ.So-8KT_7z0JaRkgKs5u11WY4kYqVj4kUWGUbpaP2Uhg'; // Replace with your actual token
    const pharmacyId = '6740ca38cf8cf9f83b54fe07'; // Replace with your actual pharmacy ID

    const BASE_URL = 'http://localhost:4000'; // Update with your backend URL

    // Fetch inventory when the component mounts
    useEffect(() => {
        axios
            .get(`${BASE_URL}/phar/pharmacy/${pharmacyId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => setInventory(response.data.inventory))
            .catch((err) => setError('Failed to load inventory. Check your token or pharmacy ID.'));
    }, []); // Runs only once after the component mounts

    const handleEdit = (item) => {
        setSelectedItem(item); // Set selected item for editing
    };

    const handleCancel = () => {
        setSelectedItem(null); // Clear selected item
    };

    const handleSave = (medicationId, newName, newQuantity) => {
        const updates = [
            {
                medicationId,
                newname: newName,
                newdosage: newQuantity,
            },
        ];

        axios
            .put(
                `${BASE_URL}/phar/medireco/history/update`,
                { updates },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            .then(() => {
                // Update state locally
                setInventory((prev) =>
                    prev.map((item) =>
                        item._id === medicationId
                            ? { ...item, name: newName, quantity: newQuantity }
                            : item
                    )
                );
                setSelectedItem(null);
                alert('Inventory updated successfully!');
            })
            .catch((err) => setError('Failed to update inventory.'));
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Pharmacy Inventory System</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {selectedItem ? (
                <div>
                    <h2>Update Inventory</h2>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSave(
                                selectedItem._id,
                                e.target.name.value,
                                parseInt(e.target.quantity.value, 10)
                            );
                        }}
                    >
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                defaultValue={selectedItem.name}
                            />
                        </label>
                        <br />
                        <label>
                            Quantity:
                            <input
                                type="number"
                                name="quantity"
                                defaultValue={selectedItem.quantity}
                            />
                        </label>
                        <br />
                        <button type="submit">Save</button>
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </form>
                </div>
            ) : (
                <div>
                    <h2>Inventory List</h2>
                    {inventory.length === 0 ? (
                        <p>No inventory items found. Please check your Pharmacy ID.</p>
                    ) : (
                        <ul>
                            {inventory.map((item) => (
                                <li key={item._id}>
                                    <b>{item.name}</b> (Quantity: {item.quantity}){' '}
                                    <button onClick={() => handleEdit(item)}>Edit</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
};

export default App;



