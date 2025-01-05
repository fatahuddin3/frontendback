/*// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000'; // Adjust the URL if needed
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTFiMzY0ODM3NmZmNTFkYmIyNGQ2OSIsImlhdCI6MTcyNjA2NzU1NywiZXhwIjoxNzI4NjU5NTU3fQ.mGGQJqP5fsuVnSoBlfLtT10PnSRf1TIf_MalP2PYrgM'; 
// Fetch patients and doctors for the dropdown list
export const fetchPatientsAndDoctors = async () => {
    try {
        const response = await axios.get(`${API_URL}/pati/pa`,  {
            headers: { Authorization: `Bearer ${token}` }
        });
        const responsee = await axios.get(`${API_URL}/doctors/`,  {
            headers: { Authorization: `Bearer ${token}` }
        });
        return {response: response, responsee: responsee };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Post the digital medical record
export const createDigitalMedicalRecord = async (data) => {
    try {
        // Replace with manual token
        const response = await axios.post(`${API_URL}/digi/medireco`, data, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating record:', error);
        throw error;
    }
};
*/
// src/services/api.js
// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:4000';  // Adjust the URL if needed
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3M2RhZTg5NTNmZjM5ZmE5ZmFlOTJiNSIsImlhdCI6MTczMjA5NTYyNiwiZXhwIjoxNzQwNzM1NjI2fQ.0IyL-Fq5nfCAuQ3x0IHrDhA0m0ZNYPElKuLM0Z3g01w';  // Add your manually generated JWT token here

// Fetch patients and doctors for the dropdown list
export const fetchPatientsAndDoctors = async () => {
    try {
        const patients = await axios.get(`${API_URL}/pati/pa`, {
            headers: {
                Authorization: `Bearer ${token}`,  // Add JWT token to headers
            },
        });
        const doctors = await axios.get(`${API_URL}/doctors/`, {
            headers: {
                Authorization: `Bearer ${token}`,  // Add JWT token to headers
            },
        });
        return { patients: patients.data, doctors: doctors.data };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// Post the digital medical record
export const createDigitalMedicalRecord = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/digi/medireco`, data, {
            headers: {
                Authorization: `Bearer ${token}`,  // Add JWT token to headers
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating record:', error);
        throw error;
    }
};
