import axios from 'axios';
// Add your manual token here
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MTM3MjExOWNkYmYyNWUxNTRmMzZhNiIsImlhdCI6MTcyOTMyNzYzNCwiZXhwIjoxNzMxOTE5NjM0fQ.0TY4fCj7ABB5wAJN5gupKpE3QK9gAQvmZbK4E-SPz4E';
// Axios instance with token attached
const api = axios.create({
    baseURL: 'http://localhost:4000', // Update with your backend URL
    headers: {
        Authorization: `Bearer ${token}`,
    }
});
export const fetchAdmissions = async () => {
    const response = await axios.get(`http://localhost:4000/user/admiss`);
    return response.data;
};
export const fetchAssess = async () => {
    const response = await axios.get(`http://localhost:4000/user/ass`);
    return response.data;
};


export const updateRoomAllocation = async (admissionId, roomData) => {
    const response = await axios.put(`http://localhost:4000/user/admissionsss/${admissionId}/room`, roomData);
    return response.data;
};
export const updateAssessAllocation = async (admissionId, roomData,assessmentId) => {
    const response = await axios.put(`http://localhost:4000/user/admissions/${admissionId}/assessments/${assessmentId}`, roomData);
    return response.data;
};
// Fetch doctors
export const getDoctors = () => api.get('/doctors/');

// Fetch patients
export const getPatients = () => api.get('/pati/pa');

// Book appointment
export const bookAppointment = (appointmentData) => api.post('/booki/bo', appointmentData);

export default api;
