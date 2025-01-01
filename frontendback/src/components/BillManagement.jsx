/*import React, { useState, useEffect } from 'react';
import { getBillsByStatus, updateBillStatus } from '../services/doctorService';  // Include update service
import '../css/BillManagement.css';

const BillManagement = () => {
    const [bills, setBills] = useState([]);
    const [status, setStatus] = useState('');  // Paid or Unpaid
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZGQzY2QxMGFhZTIxY2FhMzFlYjU4MSIsImlhdCI6MTcyNTc3NTA1NywiZXhwIjoxNzI4MzY3MDU3fQ.BbvLvkrc6UqRfOJV7kvasO-YxQhYn9JjVcO6vKAQ0x0';  // Use hardcoded token in code

    // Fetch bills whenever the status changes
    useEffect(() => {
        if (status) {
            const fetchBills = async () => {
                try {
                    const response = await getBillsByStatus(status, token);
                    const filteredBills = response.data.filter(bill => bill.status === status);
                    setBills(filteredBills);
                } catch (error) {
                    console.error('Error fetching bills:', error);
                    alert('Error fetching bills. Check your token or backend connection.');
                }
            };

            fetchBills();
        }
    }, [status]);
    
    // Assuming updateBillStatus and getBillsByStatus are correctly imported

    const handleStatusUpdate = async (billId) => {
        try {
            // Call backend to update status
            const updateResponse = await updateBillStatus(billId, 'paid', token);

            if (updateResponse.status === 200) {
                // Fetch updated bills list if the update was successful
                const response = await getBillsByStatus('unpaid', token);
                const filteredBills = response.data.filter(bill => bill.status === 'unpaid');
                setBills(filteredBills);  // Update the list to exclude the now-paid bill
                alert(updateResponse.data.message); // Show success message
            } else {
                throw new Error(updateResponse.data.message || 'Failed to update bill status.');
            }
        } catch (error) {
            console.error('Error updating bill status:', error);
            alert('Error updating bill status. ' + (error.message || 'Check backend connection.'));
        }
    };

    return (
        <div className="bill-management">
            <h2>Bill Management</h2>

            {*//* Buttons for filtering Paid/Unpaid *//*}
            <div className="status-buttons">
                <button onClick={() => setStatus('paid')}>Paid Bills</button>
                <button onClick={() => setStatus('unpaid')}>Unpaid Bills</button>
            </div>
            {*//* Display the bills list *//*}
            <div className="bill-list">
                {bills.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                {status === 'unpaid' && <th>Actions</th>}  {*//* Show actions only for unpaid *//*}
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill._id}>
                                    <td>{bill.patientName}</td>
                                    <td>{bill.status}</td>
                                    <td>{bill.doctor.name}</td>
                                    {status === 'unpaid' && (
                                        <td>
                                            <button onClick={() => handleStatusUpdate(bill._id)}>
                                                Mark as Paid
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No {status} bills found.</p>
                )}
            </div>
        </div>
    );
};

export default BillManagement;*/

import React, { useState, useEffect } from 'react';
import { getBillsByStatus, updateBillStatus } from '../services/doctorService';  // Include update service
import '../css/BillManagement.css';

const BillManagement = () => {
    const [bills, setBills] = useState([]);
    const [status, setStatus] = useState('');  // Paid or Unpaid
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDY5OGE4NTkxNjU1YWZlNTQ4NDkxOCIsImlhdCI6MTcyODQ4NTU0NSwiZXhwIjoxNzMxMDc3NTQ1fQ.zN2s0bDyZBChxAubvXx8nD456ABKnTJ-WA0H8jluaxY';  // Use hardcoded token in code

    // Fetch bills whenever the status changes
    useEffect(() => {
        if (status) {
            const fetchBills = async () => {
                try {
                    const response = await getBillsByStatus(status, token);
                    const filteredBills = response.data.filter(bill => bill.status === status);
                    setBills(filteredBills);
                } catch (error) {
                    console.error('Error fetching bills:', error);
                    alert('Error fetching bills. Check your token or backend connection.');
                }
            };

            fetchBills();
        }
    }, [status]);

    // Assuming updateBillStatus and getBillsByStatus are correctly imported

    const handleStatusUpdate = async (billId, currentStatus) => {
        // Toggle between 'paid' and 'unpaid'
        const newStatus = currentStatus === 'paid' ? 'unpaid' : 'paid';

        try {
            // Call backend to update status
            const updateResponse = await updateBillStatus(billId, newStatus, token);

            if (updateResponse.status === 200) {
                // Fetch updated bills list based on the current status
                const response = await getBillsByStatus(status, token);
                const filteredBills = response.data.filter(bill => bill.status === status);
                setBills(filteredBills);  // Update the list to reflect the changes
                alert(updateResponse.data.message); // Show success message
            } else {
                throw new Error(updateResponse.data.message || 'Failed to update bill status.');
            }
        } catch (error) {
            console.error('Error updating bill status:', error);
            alert('Error updating bill status. ' + (error.message || 'Check backend connection.'));
        }
    };

    return (
        <div className="bill-management">
            <h2>Bill Management</h2>

            {/* Buttons for filtering Paid/Unpaid */}
            <div className="status-buttons">
                <button onClick={() => setStatus('paid')}>Paid Bills</button>
                <button onClick={() => setStatus('unpaid')}>Unpaid Bills</button>
            </div>
            {/* Display the bills list */}
            <div className="bill-list">
                {bills.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Status</th>
                                <th>Doctor Name</th>
                                {status && <th>Actions</th>}  {/* Show actions for both paid and unpaid */}
                            </tr>
                        </thead>
                        <tbody>
                            {bills.map((bill) => (
                                <tr key={bill._id}>
                                    <td>{bill.patientName}</td>
                                    <td>{bill.status}</td>
                                    <td>{bill.doctor.name}</td>
                                    <td>
                                        {/* Button toggles between 'Mark as Paid' or 'Mark as Unpaid' based on status */}
                                        <button onClick={() => handleStatusUpdate(bill._id, bill.status)}>
                                            {bill.status === 'unpaid' ? 'Mark as Paid' : 'Mark as Unpaid'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No {status} bills found.</p>
                )}
            </div>
        </div>
    );
};

export default BillManagement;


