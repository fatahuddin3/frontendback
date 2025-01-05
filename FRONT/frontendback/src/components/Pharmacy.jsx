
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacyOrderSystem = () => {
    const [pharmacy, setPharmacy] = useState(null); // Hold pharmacy info
    const [medications, setMedications] = useState([{ medicationName: '', quantity: 0 }]); // Medications array for order
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTVjNTNkMWQyYTczNzQ0NTNlNDBmMCIsImlhdCI6MTcyNjMzNDI2OSwiZXhwIjoxNzI4OTI2MjY5fQ.NgXYvjyAke6rSwgdu_U42TsdzO9Leq9ELrLIJQ5ZoZc'; // Attach token directly in the code

    // Fetch the single pharmacy ('CityPharmacy') on load
    useEffect(() => {
        const fetchPharmacy = async () => {
            try {
                const response = await axios.get('http://localhost:4000/phar/CityPharmacy'); // Fetch the specific pharmacy
                setPharmacy(response.data);
            } catch (error) {
                console.error('Error fetching pharmacy:', error);
            }
        };
        fetchPharmacy();
    }, []);

    // Handle order submission
    const submitOrder = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/phar/buy/CityPharmacy`, {
                items: medications
            }, {
                headers: { Authorization: `Bearer ${token}` } // Attach token in the headers
            });
            alert('Order placed successfully!');
            console.log(response.data);
        } catch (error) {
            alert('Failed to place the order.');
            console.error('Error placing order:', error);
        }
    };

    // Add more medication input fields
    const addMedicationField = () => {
        setMedications([...medications, { medicationName: '', quantity: 0 }]);
    };

    // Handle changes in medication fields
    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index][field] = value;
        setMedications(updatedMedications);
    };

    return (
        <div>
            <h1>Pharmacy Order System</h1>

            {*//* Show Pharmacy Info *//*}
            {pharmacy ? (
                <div>
                    <h3>{pharmacy.namee}</h3>
                    <p>Location: {pharmacy.location}</p>

                    {*//* Order Form *//*}
                    <h3>Order Medications:</h3>
                    {medications.map((medication, index) => (
                        <div key={index}>
                            <label>Medication Name: </label>
                            <input
                                type="text"
                                value={medication.medicationName}
                                onChange={(e) => handleMedicationChange(index, 'medicationName', e.target.value)}
                            />
                            <label>Quantity: </label>
                            <input
                                type="number"
                                value={medication.quantity}
                                onChange={(e) => handleMedicationChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    ))}

                    {*//* Add More Medications *//*}
                    <button onClick={addMedicationField}>Add Another Medication</button>

                    {*//* Submit Order *//*}
                    <button onClick={submitOrder}>Submit Order</button>
                </div>
            ) : (
                <p>Loading pharmacy details...</p>
            )}
        </div>
    );
};

export default PharmacyOrderSystem;*/

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacyOrderSystem = () => {
    const [pharmacy, setPharmacy] = useState(null); 
    const [medications, setMedications] = useState([{ medicationName: '', quantity: 0 }]); // Medications array for order
    const [orderHistory, setOrderHistory] = useState([]); // Keep track of all successful orders
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA2OWE4YzJhOTE2YWY0Y2RiZjc3MCIsImlhdCI6MTczMjI3NDYwMCwiZXhwIjoxNzQwOTE0NjAwfQ.So-8KT_7z0JaRkgKs5u11WY4kYqVj4kUWGUbpaP2Uhg';

   
    useEffect(() => {
        const fetchPharmacy = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/phar/${namee}`,{
                    headers: { Authorization: `Bearer ${token}` } // Attach token in the headers
                }); // Fetch the specific pharmacy
                setPharmacy(response.data);
            } catch (error) {
                console.error('Error fetching pharmacy:', error);
            }
        };
        fetchPharmacy();
    }, []);

    // Handle order submission
    const submitOrder = async () => {
        try {
            const response = await axios.post(`http://localhost:4000/phar/buy/${namee}`, {
                items: medications
            }, );

            // On success, update the order history
            setOrderHistory([...orderHistory, ...medications]);

            // Clear the input fields after successful order
            setMedications([{ medicationName: '', quantity: 0 }]);

            alert('Order placed successfully!');
            console.log(response.data);
        } catch (error) {
            alert('Failed to place the order.');
            console.error('Error placing order:', error);
        }
    };

    // Add more medication input fields
    const addMedicationField = () => {
        setMedications([...medications, { medicationName: '', quantity: 0 }]);
    };

    // Handle changes in medication fields
    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index][field] = value;
        setMedications(updatedMedications);
    };

    return (
        <div>
            <h1>Pharmacy Order System</h1>

            {*//* Show Pharmacy Info *//*}
            {pharmacy ? (
                <div>
                    <h3>{pharmacy.namee}</h3>
                    <p>Location: {pharmacy.location}</p>

                    {*//* Order Form *//*}
                    <h3>Order Medications:</h3>
                    {medications.map((medication, index) => (
                        <div key={index}>
                            <label>Medication Name: </label>
                            <input
                                type="text"
                                value={medication.medicationName}
                                onChange={(e) => handleMedicationChange(index, 'medicationName', e.target.value)}
                            />
                            <label>Quantity: </label>
                            <input
                                type="number"
                                value={medication.quantity}
                                onChange={(e) => handleMedicationChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    ))}

                    {*//* Add More Medications *//*}
                    <button onClick={addMedicationField}>Add Another Medication</button>

                    {*//* Submit Order *//*}
                    <button onClick={submitOrder}>Submit Order</button>
                </div>
            ) : (
                <p>Loading pharmacy details...</p>
            )}

            {*//* Order History Container *//*}
            {orderHistory.length > 0 && (
                <div>
                    <h3>Order History</h3>
                    <ul>
                        {orderHistory.map((order, index) => (
                            <li key={index}>
                                {order.medicationName} - Quantity: {order.quantity}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default PharmacyOrderSystem;*/


/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PharmacyOrderSystem = () => {
    const [pharmacy, setPharmacy] = useState(null);
    const [medications, setMedications] = useState([{ medicationName: '', quantity: 0 }]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // For loading state
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA2OWE4YzJhOTE2YWY0Y2RiZjc3MCIsImlhdCI6MTczMjI3NDYwMCwiZXhwIjoxNzQwOTE0NjAwfQ.So-8KT_7z0JaRkgKs5u11WY4kYqVj4kUWGUbpaP2Uhg'; // Use environment variable for token

    // Fetch pharmacy details
    useEffect(() => {
        const fetchPharmacy = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/phar/CityPharmacy`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPharmacy(response.data);
            } catch (error) {
                console.error('Error fetching pharmacy:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPharmacy();
    }, [token]);

    const submitOrder = async () => {
        try {
            const response = await axios.post(
                `http://localhost:4000/phar/buy/CityPharmacy`,
                { items: medications },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setOrderHistory([...orderHistory, ...medications]);
            setMedications([{ medicationName: '', quantity: 0 }]);
            alert('Order placed successfully!');
            console.log(response.data);
        } catch (error) {
            alert('Failed to place the order.');
            console.error('Error placing order:', error);
        }
    };

    const addMedicationField = () => {
        setMedications([...medications, { medicationName: '', quantity: 0 }]);
    };

    const handleMedicationChange = (index, field, value) => {
        const updatedMedications = [...medications];
        updatedMedications[index][field] = value;
        setMedications(updatedMedications);
    };

    if (isLoading) {
        return <p>Loading pharmacy details...</p>;
    }

    return (
        <div>
            <h1>Pharmacy Order System</h1>
            {pharmacy ? (
                <div>
                    <h3>{pharmacy.namee}</h3>
                    <p>Location: {pharmacy.location}</p>
                    <h3>Order Medications:</h3>
                    {medications.map((medication, index) => (
                        <div key={index}>
                            <label>Medication Name: </label>
                            <input
                                type="text"
                                value={medication.medicationName}
                                onChange={(e) => handleMedicationChange(index, 'medicationName', e.target.value)}
                            />
                            <label>Quantity: </label>
                            <input
                                type="number"
                                value={medication.quantity}
                                onChange={(e) => handleMedicationChange(index, 'quantity', e.target.value)}
                            />
                        </div>
                    ))}
                    <button onClick={addMedicationField}>Add Another Medication</button>
                    <button onClick={submitOrder}>Submit Order</button>
                </div>
            ) : (
                <p>Pharmacy details not found.</p>
            )}

            <div>
                <h3>Order History</h3>
                {orderHistory.length > 0 ? (
                    <ul>
                        {orderHistory.map((order, index) => (
                            <li key={index}>
                                {order.medicationName} - Quantity: {order.quantity}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No orders placed yet.</p>
                )}
            </div>
        </div>
    );
};

export default PharmacyOrderSystem;
*/

/*import React, { useState, useEffect } from 'react';


const PharmacyApp = () => {
    
    const [medicines, setMedicines] = useState([]);
    const [items, setItems] = useState([{ medicationName: '', quantity: 1 }]);
    const [purchaseResult, setPurchaseResult] = useState(null);
    const [fetchError, setFetchError] = useState('');
    const [purchaseError, setPurchaseError] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA2OWE4YzJhOTE2YWY0Y2RiZjc3MCIsImlhdCI6MTczMjI3NDYwMCwiZXhwIjoxNzQwOTE0NjAwfQ.So-8KT_7z0JaRkgKs5u11WY4kYqVj4kUWGUbpaP2Uhg';
    // Fetch medicines
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('http://localhost:4000/phar/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!response.ok) throw new Error('Failed to fetch medicines');
                const data = await response.json();
                setMedicines(data);
            } catch (err) {
                setFetchError(err.message);
            }
        };

        fetchMedicines();
    }, [token]);

    // Handle token input change
    const handleTokenChange = (e) => {
        setToken(e.target.value);
    };

    // Handle changes to items being purchased
    const handleItemChange = (index, field, value) => {
        const updatedItems = [...items];
        updatedItems[index][field] = field === 'quantity' ? parseInt(value) : value;
        setItems(updatedItems);
    };

    // Add another item to the purchase list
    const handleAddItem = () => {
        setItems([...items, { medicationName: '', quantity: 1 }]);
    };

    // Handle purchase submission
    const handlePurchase = async () => {
        setPurchaseError('');
        setPurchaseResult(null);

        try {
            const response = await fetch('http://localhost:4000/phar/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ items })
            });

            if (!response.ok) throw new Error('Failed to process purchase');
            const data = await response.json();
            setPurchaseResult(data);
        } catch (err) {
            setPurchaseError(err.message);
        }
    };

    return (
        <div className="app">
            <header>
                <h1>Pharmacy Management</h1>
               
            </header>

            <main>
               
                <section className="medicine-list">
                    <h2>Available Medicines</h2>
                    {fetchError ? (
                        <p className="error">{fetchError}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.map((med, index) => (
                                    <tr key={index}>
                                        <td>{med.name}</td>
                                        <td>{med.quantity}</td>
                                        <td>${med.price}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>

               
                <section className="purchase-medicines">
                    <h2>Purchase Medicines</h2>
                    {items.map((item, index) => (
                        <div key={index} className="item-row">
                            <input
                                type="text"
                                placeholder="Medication Name"
                                value={item.medicationName}
                                onChange={(e) => handleItemChange(index, 'medicationName', e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={item.quantity}
                                onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                                min="1"
                            />
                        </div>
                    ))}
                    <button onClick={handleAddItem}>Add Another Item</button>
                    <button onClick={handlePurchase}>Purchase</button>

                    {purchaseError && <p className="error">{purchaseError}</p>}
                    {purchaseResult && (
                        <div className="result">
                            <h3>Purchase Result</h3>
                            <pre>{JSON.stringify(purchaseResult, null, 2)}</pre>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default PharmacyApp;


*/


import React, { useState, useEffect } from 'react';

const PharmacyApp = () => {
    const [medicines, setMedicines] = useState([]);
    const [fetchError, setFetchError] = useState('');
    const [purchaseResult, setPurchaseResult] = useState(null);
    const [purchaseError, setPurchaseError] = useState('');
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDFiY2VhOTdmZTRlZmRkNjljNjNhMyIsImlhdCI6MTczMjM2MTQ1MSwiZXhwIjoxNzQxMDAxNDUxfQ.xdDHlGV_8WPil0grI6BKfGcckzEEaKZ3BI7SCIWzKHQ'; // Replace with a dynamic token if needed

    // Fetch medicines from the backend
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('http://localhost:4000/phar/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                if (!response.ok) throw new Error('Failed to fetch medicines');
                const data = await response.json();
                setMedicines(data);
            } catch (err) {
                setFetchError(err.message);
            }
        };

        fetchMedicines();
    }, [token]);

    // Handle quantity updates
    const handleQuantityChange = (index, value) => {
        const updatedMedicines = [...medicines];
        // Validate and parse the quantity value
        const parsedValue = Math.max(0, parseInt(value, 10) || 0); // Ensure a non-negative integer
        updatedMedicines[index].purchaseQuantity = parsedValue; // Update the `purchaseQuantity` field
        setMedicines(updatedMedicines);
    };


    // Handle purchase submission
    const handlePurchase = async () => {
        setPurchaseError('');
        setPurchaseResult(null);

        try {
            // Prepare purchase payload
            const purchasePayload = medicines
                .filter((med) => med.purchaseQuantity > 0) // Only include items with a purchase quantity > 0
                .map((med) => ({
                    name: med.name,
                    purchaseQuantity: med.purchaseQuantity,
                }));

            if (purchasePayload.length === 0) {
                setPurchaseError('No items selected for purchase.');
                return;
            }

            const response = await fetch('http://localhost:4000/phar/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ items: purchasePayload }),
            });

            if (!response.ok) throw new Error('Failed to process purchase');
            const data = await response.json();
            setPurchaseResult(data);
        } catch (err) {
            setPurchaseError(err.message);
        }
    };


    return (
        <div className="app">
            <header>
                <h1>Pharmacy Management</h1>
            </header>

            <main>
                <section className="medicine-list">
                    <h2>Available Medicines</h2>
                    {fetchError ? (
                        <p className="error">{fetchError}</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Purchase Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {medicines.map((med, index) => (
                                    <tr key={index}>
                                        <td>{med.name}</td>
                                        <td>{med.quantity}</td>
                                        <td>${med.price}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={med.purchaseQuantity || 0} // Default to 0 if undefined
                                                min="0"
                                                onChange={(e) => handleQuantityChange(index, e.target.value)}
                                            />

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>

                <button onClick={handlePurchase}>Purchase</button>

                {purchaseError && <p className="error">{purchaseError}</p>}
                {purchaseResult && (
                    <div className="result">
                        <h3>Purchase Result</h3>
                        <pre>{JSON.stringify(purchaseResult, null, 2)}</pre>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PharmacyApp;
