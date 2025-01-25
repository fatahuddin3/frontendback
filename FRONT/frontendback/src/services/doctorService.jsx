/*// src/services/doctorService.js
import axios from 'axios';

const API_URL = 'http://localhost:4000/doctors';


const registerDoctor = async (doctorData) => {
    return await axios.post('http://localhost:4000/doctors/register', doctorData, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
};


const loginDoctor = async (doctorData) => {
    return await axios.post(`${API_URL}/login`, doctorData);
};

const getDoctors = async (token) => {
    return await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const deleteDoctor = async (email, token) => {
    return await axios.delete(`${API_URL}/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export { registerDoctor, loginDoctor, getDoctors, deleteDoctor };*/
import axios from 'axios';

const API_URL = 'http://localhost:4000/userrr';

const Pat_URL = 'http://localhost:4000/userrr';
const REPORTS_URL = 'http://localhost:4000/reports';
const BILL_URL = 'http://localhost:4000/bills';
const BILLS_URL = 'http://localhost:4000/tele';
/*const appoint_URL = 'http://localhost:4000/appoint/doctor';*/
const registerDoctor = async (doctorData) => {
    return await axios.post(`${API_URL}/register`, doctorData, {
        headers: { 'Content-Type': 'application/json' }
    });
};
/*const registerPatient= async (doctorData) => {
    return await axios.post(`${Pat_URL}/register`, doctorData );
};*/


const registerPatient = async (doctorData) => {
    // Or get the token from context
    return await axios.post(
        `${Pat_URL}/register`,
        doctorData,
        {
            headers: {
                 // Include the token
                'Content-Type': 'multipart/form-data'
            }
        }
    );
};
const registerUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:4000/user/userreg', userData);
        return response; // Return the full response object for flexibility
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};
const loginUser = async (userData) => {
    try {
        const response = await axios.post('http://localhost:4000/user/userlog', userData);
        return response; // Return the full response object for flexibility
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};
const loginDoctor = async (doctorData) => {
    return await axios.post(`${API_URL}/login`, doctorData);
};

const getDoctors = async (token) => {
    return await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

/*const getDoctors = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response;
    } catch (error) {
        throw error; // Handle error properly in the calling code
    }
};*/

const getPatients = async (token) => {
    return await axios.get(`${Pat_URL}/pa`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
const deleteDoctor = async (email, token) => {
    return await axios.delete(`${API_URL}/${email}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
const deletePatient = async (contactNumber, token) => {
    return await axios.delete(`${Pat_URL}/${contactNumber}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
const updateDoctor = async (email, doctorData, token) => {
    return await axios.put(`${API_URL}/${email}`, doctorData, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });
};

const updatePatient = async (contactNumber, formData, token) => {
    return await axios.put(`${Pat_URL}/${contactNumber}`, formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'  //This line is not necessary mern automa creates it 
        }   //but 'Content-Type': 'application/json' we cannot use it ,in place of multipart/form-data
    });
};
const fetchPatientDetails = async (contactNumber, token) => {
    return await axios.get(`${Pat_URL}/${contactNumber}`, {
        headers: { Authorization: `Bearer ${token}`  }
    });
};
/*const fetchPatientDetails = async (contactNumber, token) => {
    try {
        const response = await axios.get(`${Pat_URL}/${contactNumber}`, {
            headers: {
                Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'  // Correct token structure
            }
        });
        return response;
    } catch (error) {
        // Log the error details for debugging
        console.error('Error fetching patient details:', error.response ? error.response.data : error.message);
        throw error; // Rethrow the error to be caught in the frontend
    }
};*/
const getReport = async (token) => {
    return await axios.get(`${REPORTS_URL}/`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

const getBillsByStatus = async (status, token) => {
    return await axios.get(BILL_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: { status }
    });
};
    const updateBillStatus = async (billId, newStatus, token) => {
        return await axios.put(`${BILL_URL}/${billId}/status`, { status: newStatus }, {
            headers: { Authorization: `Bearer ${token}` }
        });
};

/*const updateBillStatuss = async (billId, newStatus, token) => {
    return await axios.put(`${BILLS_URL}/status/patient/${billId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
    });
};
const getBillsByStatuss = async (patient_id, token) => {
    return await axios.get(`${BILLS_URL}/status/patient/${patient_id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: { patient_id }
    });
};*/

export { loginUser, registerUser,fetchPatientDetails, updatePatient, deletePatient, getPatients, registerPatient, updateBillStatus,getReport, registerDoctor, loginDoctor, getDoctors, deleteDoctor, updateDoctor, getBillsByStatus };
