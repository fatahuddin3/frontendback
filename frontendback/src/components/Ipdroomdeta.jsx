import React, { useState, useEffect } from "react";
import axios from "axios";

const Assessments = () => {
    const [admissions, setAdmissions] = useState([]); // Store all admissions
    const [selectedAdmission, setSelectedAdmission] = useState(null); // Selected admission details
    const [assessments, setAssessments] = useState([]); // Store assessments for the selected admission
    const [error, setError] = useState(null);

    // Fetch all admissions on component load
    useEffect(() => {
        axios
            .get("http://localhost:4000/user/admiss") // Backend endpoint to fetch all admissions
            .then((response) => {
                console.log("Admissions fetched:", response.data); // Debugging
                setAdmissions(response.data); // Store admissions data
            })
            .catch((err) => {
                console.error("Error fetching admissions:", err); // Debugging
                setError("Failed to fetch admissions.");
            });
    }, []);

    // Fetch assessments for a specific admission
    const fetchAssessments = (admissionId) => {
        setError(null); // Reset errors
        setAssessments([]); // Reset assessments
        setSelectedAdmission(admissionId); // Store the admission ID
        axios
            .get(`http://localhost:4000/user/admissions/${admissionId}/assessments`) // Backend endpoint for assessments
            .then((response) => {
                console.log("Assessments fetched:", response.data); // Debugging
                setAssessments(response.data.assessments); // Store assessments data
            })
            .catch((err) => {
                console.error("Error fetching assessments:", err); // Debugging
                setError("Failed to fetch assessments for this admission.");
            });
    };

    return (
        <div>
            <h1>Admissions and Assessments</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* List of admissions */}
            <h2>All Admissions</h2>
            {admissions.length > 0 ? (
                <ul>
                    {admissions.map((admission) => (
                        <li key={admission._id}>
                            <button onClick={() => fetchAssessments(admission._id)}>
                                View Assessments for Admission {admission._id}
                            </button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No admissions available.</p>
            )}

            {/* Display assessments for the selected admission */}
            {selectedAdmission && (
                <div>
                    <h2>Assessments for Admission: {selectedAdmission}</h2>
                    {assessments.length > 0 ? (
                        <ul>
                            {assessments.map((assessment) => (
                                <li key={assessment._id}>
                                    <p><strong>Assessment Date:</strong> {new Date(assessment.assessment_date).toLocaleDateString()}</p>
                                    <p><strong>Vitals:</strong></p>
                                    <ul>
                                        <li><strong>Temperature:</strong> {assessment.vitals?.temperature}°C</li>
                                        <li><strong>Blood Pressure:</strong> {assessment.vitals?.blood_pressure}</li>
                                        <li><strong>Pulse:</strong> {assessment.vitals?.pulse} bpm</li>
                                        <li><strong>Respiration Rate:</strong> {assessment.vitals?.respiration_rate} breaths/min</li>
                                    </ul>
                                    <p><strong>Notes:</strong> {assessment.notes}</p>
                                    <p><strong>Nurse ID:</strong> {assessment.nurse_id}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No assessments available for this admission.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Assessments;
