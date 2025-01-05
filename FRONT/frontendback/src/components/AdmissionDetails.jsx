/*// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Component to fetch all admissions


// Component to fetch and display admission details
const App = () => {
    const [admission, setAdmission] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/user/admissions/${id}`)
            .then(response => setAdmission(response.data.admission))
            .catch(err => setError("Failed to fetch admission details: " + err.message));
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!admission) return <p>Loading admission details...</p>;

    return (
        <div>
            <h2>Admission Details</h2>
            <p><strong>Patient Name:</strong> {admission.patient_id.name}</p>
            <p><strong>Patient Age:</strong> {admission.patient_id.age}</p>
            <p><strong>Patient Gender:</strong> {admission.patient_id.gender}</p>

            <p><strong>Doctor Name:</strong> {admission.doctor_id.name}</p>
            <p><strong>Doctor Specialization:</strong> {admission.doctor_id.specialization}</p>

            <p><strong>Room Number:</strong> {admission.room_allocation.room_number}</p>
            <p><strong>Bed Number:</strong> {admission.room_allocation.bed_number}</p>
            <p><strong>Ward Type:</strong> {admission.room_allocation.ward_type}</p>

            <p><strong>Vitals:</strong> {admission.assessments?.vitals}</p>
            <p><strong>Notes:</strong> {admission.assessments?.notes}</p>

            <p><strong>Consent Documents:</strong> {admission.consent.documents}</p>
        </div>
    );
};

export default App;*/

// AdmissionDetails.js
/*import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AdmissionDetails = () => {
    const [admission, setAdmission] = useState(null);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        const fetchAdmission = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/user/admissions/${id}`);
                setAdmission(response.data.admission);
            } catch (err) {
                setError(`Failed to fetch admission details: ${err.message}`);
            }
        };
        fetchAdmission();
    }, [id]);

    if (error) return <p style={{ color: 'red' }}>{error}</p>;
    if (!admission) return <p>Loading admission details...</p>;

    return (
        <div>
            <h2>Admission Details</h2>
            <p><strong>Patient Name:</strong> {admission?.patient_id?.name}</p>
            <p><strong>Patient Age:</strong> {admission?.patient_id?.age}</p>
            <p><strong>Patient Gender:</strong> {admission?.patient_id?.gender}</p>

            <p><strong>Doctor Name:</strong> {admission?.doctor_id?.name}</p>
            <p><strong>Doctor Specialization:</strong> {admission?.doctor_id?.specialization}</p>

            <p><strong>Room Number:</strong> {admission?.room_allocation?.room_number}</p>
            <p><strong>Bed Number:</strong> {admission?.room_allocation?.bed_number}</p>
            <p><strong>Ward Type:</strong> {admission?.room_allocation?.ward_type}</p>
            <h3>Assessments</h3>
            <ul>
                {admission.assessments.map((assessment) => (
                    <li key={assessment._id}>
                        <p><strong>Vitals:</strong></p>
                        <ul>
                            <li><strong>Temperature:</strong> {assessment.vitals?.temperature}</li>
                            <li><strong>Blood Pressure:</strong> {assessment.vitals?.blood_pressure}</li>
                            <li><strong>Pulse:</strong> {assessment.vitals?.pulse}</li>
                            <li><strong>Respiration Rate:</strong> {assessment.vitals?.respiration_rate}</li>
                        </ul>
                        <p><strong>Notes:</strong> {assessment.notes}</p>
                    </li>
                ))}
            </ul>
            <h3>Consent</h3>
            <p><strong>Documents:</strong></p>
            <ul>
                {admission.consent?.documents.map((document, index) => (
                    <li key={index}>
                        <p><strong>Type:</strong> {document.type}</p>
                        <p><strong>URL:</strong> <a href={document.url} target="_blank" rel="noopener noreferrer">{document.url}</a></p>
                    </li>
                ))}
            </ul>
            <p><strong>Consent Signed By:</strong> {admission.consent?.consent?.signed_by}</p>
            <p><strong>Relationship to Patient:</strong> {admission.consent?.consent?.relationship_to_patient}</p>
            <p><strong>Date Signed:</strong> {new Date(admission.consent?.consent?.date_signed).toLocaleDateString()}</p>
           
        </div>
    );
};

export default AdmissionDetails;*/
