/*import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        patientName: "",
        amount: "",
        inventory: [{ name: "", quantity: "", expirationDate: "" }],
        status: "unpaid",
        issueDate: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA2OWE4YzJhOTE2YWY0Y2RiZjc3MCIsImlhdCI6MTczMjI3NDYwMCwiZXhwIjoxNzQwOTE0NjAwfQ.So-8KT_7z0JaRkgKs5u11WY4kYqVj4kUWGUbpaP2Uhg';
    // Fetch doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:4000/doctors/",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    // Handle doctor selection
    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor._id);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle inventory changes
    const handleInventoryChange = (index, e) => {
        const { name, value } = e.target;
        const newInventory = [...formData.inventory];
        newInventory[index][name] = value;
        setFormData({ ...formData, inventory: newInventory });
    };

    // Add inventory field
    const addInventoryField = () => {
        setFormData({
            ...formData,
            inventory: [...formData.inventory, { name: "", quantity: "", expirationDate: "" }],
        });
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, doctor: selectedDoctor };
            const response = await axios.post("http://localhost:4000/bills/bi", payload);
            setSuccessMessage("Bill created successfully!");
            setErrorMessage("");
            console.log(response.data);
        } catch (error) {
            setErrorMessage("Error creating bill. Please try again.");
            setSuccessMessage("");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Doctor Billing System</h1>

            {*//* List of doctors *//*}
            <h2>Select a Doctor</h2>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor._id} onClick={() => handleDoctorSelect(doctor)}>
                        {doctor.name}
                    </li>
                ))}
            </ul>

            {selectedDoctor && (
                <div>
                    <h2>Selected Doctor ID: {selectedDoctor}</h2>

                    {*//* Form to create bill *//*}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Patient Name:</label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Amount:</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Inventory:</label>
                            {formData.inventory.map((item, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={item.name}
                                        onChange={(e) => handleInventoryChange(index, e)}
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleInventoryChange(index, e)}
                                    />
                                    <input
                                        type="text"
                                        name="expirationDate"
                                        placeholder="Expiration Date"
                                        value={item.expirationDate}
                                        onChange={(e) => handleInventoryChange(index, e)}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={addInventoryField}>
                                Add Inventory
                            </button>
                        </div>
                        <div>
                            <label>Status:</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="unpaid">Unpaid</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                        <div>
                            <label>Issue Date:</label>
                            <input
                                type="date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Create Bill</button>
                    </form>

                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            )}
        </div>
    );
};

export default App;*/

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [formData, setFormData] = useState({
        patientName: "",
        amount: "",
        inventory: [{ name: "", quantity: "", expirationDate: "" }],
        status: "unpaid",
        issueDate: "",
    });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [generatedBill, setGeneratedBill] = useState(null); // Stores the bill data for display
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA2OWE4YzJhOTE2YWY0Y2RiZjc3MCIsImlhdCI6MTczMjI3NDYwMCwiZXhwIjoxNzQwOTE0NjAwfQ.So-8KT_7z0JaRkgKs5u11WY4kYqVj4kUWGUbpaP2Uhg';
    // Fetch doctors on component mount
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get("http://localhost:4000/doctors/",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setDoctors(response.data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };
        fetchDoctors();
    }, []);

    // Handle doctor selection
    const handleDoctorSelect = (doctor) => {
        setSelectedDoctor(doctor._id);
    };

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle inventory changes
    const handleInventoryChange = (index, e) => {
        const { name, value } = e.target;
        const newInventory = [...formData.inventory];
        newInventory[index][name] = value;
        setFormData({ ...formData, inventory: newInventory });
    };

    // Add inventory field
    const addInventoryField = () => {
        setFormData({
            ...formData,
            inventory: [...formData.inventory, { name: "", quantity: "", expirationDate: "" }],
        });
    };

    // Submit the form
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = { ...formData, doctor: selectedDoctor };
            const response = await axios.post("http://localhost:4000/bills/bi", payload);
            setSuccessMessage("Bill created successfully!");
            setErrorMessage("");
            setGeneratedBill(response.data.record); // Save the generated bill for display
        } catch (error) {
            setErrorMessage("Error creating bill. Please try again.");
            setSuccessMessage("");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Doctor Billing System</h1>

            {/* List of doctors */}
            <h2>Select a Doctor</h2>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor._id} onClick={() => handleDoctorSelect(doctor)}>
                        {doctor.name}
                    </li>
                ))}
            </ul>

            {selectedDoctor && (
                <div>
                    <h2>Selected Doctor ID: {selectedDoctor}</h2>

                    {/* Form to create bill */}
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Patient Name:</label>
                            <input
                                type="text"
                                name="patientName"
                                value={formData.patientName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Amount:</label>
                            <input
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label>Inventory:</label>
                            {formData.inventory.map((item, index) => (
                                <div key={index}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={item.name}
                                        onChange={(e) => handleInventoryChange(index, e)}
                                    />
                                    <input
                                        type="number"
                                        name="quantity"
                                        placeholder="Quantity"
                                        value={item.quantity}
                                        onChange={(e) => handleInventoryChange(index, e)}
                                    />
                                    <input
                                        type="text"
                                        name="expirationDate"
                                        placeholder="Expiration Date"
                                        value={item.expirationDate}
                                        onChange={(e) => handleInventoryChange(index, e)}
                                    />
                                </div>
                            ))}
                            <button type="button" onClick={addInventoryField}>
                                Add Inventory
                            </button>
                        </div>
                        <div>
                            <label>Status:</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >
                                <option value="unpaid">Unpaid</option>
                                <option value="paid">Paid</option>
                            </select>
                        </div>
                        <div>
                            <label>Issue Date:</label>
                            <input
                                type="date"
                                name="issueDate"
                                value={formData.issueDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Create Bill</button>
                    </form>

                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>
            )}

            {/* Bill Display Section */}
            {generatedBill && (
                <div style={{ position: "relative", width: "850px", height: "800px", margin: "20px auto" }}>
                    <img
                        src="src/expp.png"
                        alt="Bill Background"
                        style={{ width: "100%", height: "100%", position: "absolute", zIndex: 0 }}
                    />
                    <div
                        style={{
                            position: "absolute",
                            zIndex: 1,
                            top: "30px",
                            left: "600px",
                            color: "black",
                            fontSize: "22px",
                            /*marginRight: "60px",*/
                            display:"flex"
                        }}
                    >
                        <h3>Bill Details</h3>
                        <p style={{ marginRight: "50px" }} > {generatedBill.patientName}</p>
                        <p> ${generatedBill.amount}</p>
                        <p>{generatedBill.status}</p>
                        <p style={{marginBottom:"60px" } }> {generatedBill.issueDate}</p>
                   
                        {generatedBill.inventory.map((item, index) => (
                            <p style={{ marginBottom: "50px" }} key={index}>
                                {item.name} - {item.quantity} units (Exp: {item.expirationDate})
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
