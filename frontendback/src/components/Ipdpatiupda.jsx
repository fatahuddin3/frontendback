/*import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [patients, setPatients] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [admissionId, setAdmissionId] = useState("");
    const [formData, setFormData] = useState({
        reason_for_admission: "",
        preferred_ward: "",
        room_number: "",
        bed_number: "",
        ward_type: "",
        preferences: {
            private_room: false,
            floor_preference: "",
        },
        signed_by: "",
        relationship_to_patient: "",
        date_signed: "",
        documents: [{ type: "", url: "" }],
        vitals: {
            temperature: "",
            blood_pressure: "",
            pulse: "",
            respiration_rate: "",
        },
        notes: "",
        nurse_id: "",
        assessment_date: "",
    });
    const [updatedAdmission, setUpdatedAdmission] = useState(null);

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

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        // Handle nested preferences and vitals updates
        if (name.includes("preferences.") || name.includes("vitals.")) {
            const [key, subKey] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                [key]: {
                    ...prev[key],
                    [subKey]: type === "checkbox" ? checked : value,
                },
            }));
        }
        // Handle array-based documents
        else if (name.startsWith("documents.")) {
            const [_, index, subKey] = name.split(".");
            setFormData((prev) => {
                const updatedDocuments = [...prev.documents];
                updatedDocuments[index][subKey] = value;
                return { ...prev, documents: updatedDocuments };
            });
        }
        // Handle other fields
        else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleAddDocument = () => {
        setFormData((prev) => ({
            ...prev,
            documents: [...prev.documents, { type: "", url: "" }],
        }));
    };

    const handleRemoveDocument = (index) => {
        setFormData((prev) => {
            const updatedDocuments = prev.documents.filter((_, i) => i !== index);
            return { ...prev, documents: updatedDocuments };
        });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                recommendation_details: [
                    {
                        reason_for_admission: formData.reason_for_admission,
                        preferred_ward: formData.preferred_ward,
                    },
                ],
                room_allocation: {
                    room_number: formData.room_number,
                    bed_number: formData.bed_number,
                    ward_type: formData.ward_type,
                    preferences: formData.preferences,
                },
                consent: {
                    documents: formData.documents,
                    consent: {
                        signed_by: formData.signed_by,
                        relationship_to_patient: formData.relationship_to_patient,
                        date_signed: formData.date_signed,
                    },
                },
                assessments: [
                    {
                        vitals: formData.vitals,
                        notes: formData.notes,
                        nurse_id: formData.nurse_id,
                        assessment_date: formData.assessment_date,
                    },
                ],
            };

            const { data } = await axios.put(
                `http://localhost:4000/user/patientss/${patientId}/admissions/${admissionId}`,
                payload
            );
            setUpdatedAdmission(data.admission);
            alert("Admission updated successfully!");
        } catch (err) {
            console.error("Error updating admission:", err.response?.data || err);
            alert(err.response?.data?.message || "Error updating admission.");
        }
    };

    return (
        <div>
            <h1>Manage Admissions</h1>
            <form onSubmit={handleUpdate}>
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

                <h3>Update Fields:</h3>
                <label>Reason for Admission:</label>
                <input
                    type="text"
                    name="reason_for_admission"
                    value={formData.reason_for_admission}
                    onChange={handleChange}
                />
                <label>Preferred Ward:</label>
                <input
                    type="text"
                    name="preferred_ward"
                    value={formData.preferred_ward}
                    onChange={handleChange}
                />

                <h4>Room Allocation:</h4>
                <label>Room Number:</label>
                <input
                    type="text"
                    name="room_number"
                    value={formData.room_number}
                    onChange={handleChange}
                />
                <label>Bed Number:</label>
                <input
                    type="text"
                    name="bed_number"
                    value={formData.bed_number}
                    onChange={handleChange}
                />
                <label>Ward Type:</label>
                <input
                    type="text"
                    name="ward_type"
                    value={formData.ward_type}
                    onChange={handleChange}
                />
                <label>Private Room:</label>
                <input
                    type="checkbox"
                    name="preferences.private_room"
                    checked={formData.preferences.private_room}
                    onChange={handleChange}
                />
                <label>Floor Preference:</label>
                <input
                    type="number"
                    name="preferences.floor_preference"
                    value={formData.preferences.floor_preference}
                    onChange={handleChange}
                />

                <h4>Consent:</h4>
                {formData.documents.map((doc, index) => (
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
                        <button type="button" onClick={() => handleRemoveDocument(index)}>
                            Remove Document
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddDocument}>
                    Add Document
                </button>
                <label>Signed By:</label>
                <input
                    type="text"
                    name="signed_by"
                    value={formData.signed_by}
                    onChange={handleChange}
                />
                <label>Relationship to Patient:</label>
                <input
                    type="text"
                    name="relationship_to_patient"
                    value={formData.relationship_to_patient}
                    onChange={handleChange}
                />
                <label>Date Signed:</label>
                <input
                    type="date"
                    name="date_signed"
                    value={formData.date_signed}
                    onChange={handleChange}
                />

                <h4>Assessment:</h4>
                <label>Temperature:</label>
                <input
                    type="number"
                    name="vitals.temperature"
                    value={formData.vitals.temperature}
                    onChange={handleChange}
                />
                <label>Blood Pressure:</label>
                <input
                    type="text"
                    name="vitals.blood_pressure"
                    value={formData.vitals.blood_pressure}
                    onChange={handleChange}
                />
                <label>Pulse:</label>
                <input
                    type="number"
                    name="vitals.pulse"
                    value={formData.vitals.pulse}
                    onChange={handleChange}
                />
                <label>Respiration Rate:</label>
                <input
                    type="number"
                    name="vitals.respiration_rate"
                    value={formData.vitals.respiration_rate}
                    onChange={handleChange}
                />
                <label>Notes:</label>
                <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                />
                <label>Nurse ID:</label>
                <input
                    type="text"
                    name="nurse_id"
                    value={formData.nurse_id}
                    onChange={handleChange}
                />
                <label>Assessment Date:</label>
                <input
                    type="date"
                    name="assessment_date"
                    value={formData.assessment_date}
                    onChange={handleChange}
                />

                <button type="submit">Update Admission</button>
            </form>

            {updatedAdmission && (
                <div>
                    <h2>Updated Admission Details</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {*//* Patient Details *//*}
                            <tr>
                                <td>Patient</td>
                                <td>{updatedAdmission.patient_id?.name || "N/A"}</td>
                            </tr>

                            {*//* Recommendation Details *//*}
                            <tr>
                                <td>Reason for Admission</td>
                                <td>
                                    {updatedAdmission.recommendation_details.map((rec, index) => (
                                        <div key={index}>
                                            <strong>Reason:</strong> {rec.reason_for_admission}, <strong>Preferred Ward:</strong> {rec.preferred_ward}
                                        </div>
                                    ))}
                                </td>
                            </tr>

                            {*//* Room Allocation *//*}
                            <tr>
                                <td>Room Allocation</td>
                                <td>
                                    Room: {updatedAdmission.room_allocation?.room_number || "N/A"}, Bed:{" "}
                                    {updatedAdmission.room_allocation?.bed_number || "N/A"}, Ward:{" "}
                                    {updatedAdmission.room_allocation?.ward_type || "N/A"} <br />
                                    <strong>Preferences:</strong>{" "}
                                    {updatedAdmission.room_allocation?.preferences?.private_room
                                        ? "Private Room"
                                        : "Shared Room"}{" "}
                                    | Floor:{" "}
                                    {updatedAdmission.room_allocation?.preferences?.floor_preference || "N/A"}
                                </td>
                            </tr>

                            {*//* Consent Details *//*}
                            <tr>
                                <td>Consent</td>
                                <td>
                                    <strong>Signed By:</strong> {updatedAdmission.consent?.consent?.signed_by || "N/A"} <br />
                                    <strong>Relationship:</strong> {updatedAdmission.consent?.consent?.relationship_to_patient || "N/A"} <br />
                                    <strong>Date Signed:</strong>{" "}
                                    {updatedAdmission.consent?.consent?.date_signed
                                        ? new Date(updatedAdmission.consent?.consent?.date_signed).toLocaleDateString()
                                        : "N/A"} <br />
                                    <strong>Documents:</strong>
                                    <ul>
                                        {updatedAdmission.consent?.documents?.map((doc, index) => (
                                            <li key={index}>
                                                {doc.type}: <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.url}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>

                            {*//* Assessment Details *//*}
                            <tr>
                                <td>Assessments</td>
                                <td>
                                    {updatedAdmission.assessments.map((assess, index) => (
                                        <div key={index}>
                                            <strong>Vitals:</strong> <br />
                                            Temperature: {assess.vitals.temperature || "N/A"}, BP: {assess.vitals.blood_pressure || "N/A"}, Pulse:{" "}
                                            {assess.vitals.pulse || "N/A"}, Respiration Rate: {assess.vitals.respiration_rate || "N/A"} <br />
                                            <strong>Notes:</strong> {assess.notes || "N/A"} <br />
                                            <strong>Nurse:</strong> {assess.nurse_id?.name || "N/A"} <br />
                                            <strong>Assessment Date:</strong>{" "}
                                            {assess.assessment_date
                                                ? new Date(assess.assessment_date).toLocaleDateString()
                                                : "N/A"}
                                        </div>
                                    ))}
                                </td>
                            </tr>

                            {*//* Doctor Details *//*}
                            <tr>
                                <td>Doctor</td>
                                <td>
                                    {updatedAdmission.doctor_id?.name || "N/A"} (
                                    {updatedAdmission.doctor_id?.specialization || "N/A"})
                                </td>
                            </tr>

                            {*//* Admission Date *//*}
                            <tr>
                                <td>Admission Date</td>
                                <td>
                                    {updatedAdmission.admission_date
                                        ? new Date(updatedAdmission.admission_date).toLocaleDateString()
                                        : "N/A"}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};


export default App;*/


/*import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [patients, setPatients] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [admissionId, setAdmissionId] = useState("");
    const [formData, setFormData] = useState({
        reason_for_admission: "",
        preferred_ward: "",
        room_number: "",
        bed_number: "",
        ward_type: "",
        preferences: {
            private_room: null,
            floor_preference: null,
        },
        signed_by: "",
        relationship_to_patient: "",
        date_signed: "",
        documents: [{ type: "", url: "" }],
        vitals: {
            temperature: null,
            blood_pressure: "",
            pulse: null,
            respiration_rate: null,
        },
        notes: "",
        nurse_id: "",
        assessment_date: "",
    });
    const [updatedAdmission, setUpdatedAdmission] = useState(null);

    useEffect(() => {
        axios
            .get("/pa")
            .then(({ data }) => setPatients(data))
            .catch((err) => console.error("Error fetching patients:", err));

        axios
            .get("/admiss")
            .then(({ data }) => setAdmissions(data))
            .catch((err) => console.error("Error fetching admissions:", err));
    }, []);

    useEffect(() => {
        // Fetch existing admission data when admissionId changes
        if (admissionId) {
            axios
                .get(`/patientss/${patientId}/admissions/${admissionId}`)
                .then(({ data }) => {
                    const admission = data.admission;
                    setFormData({
                        reason_for_admission: admission?.recommendation_details?.[0]?.reason_for_admission || "",
                        preferred_ward: admission?.recommendation_details?.[0]?.preferred_ward || "",
                        room_number: admission?.room_allocation?.room_number || "",
                        bed_number: admission?.room_allocation?.bed_number || "",
                        ward_type: admission?.room_allocation?.ward_type || "",
                        preferences: admission?.room_allocation?.preferences || { private_room: null, floor_preference: null },
                        signed_by: admission?.consent?.consent?.signed_by || "",
                        relationship_to_patient: admission?.consent?.consent?.relationship_to_patient || "",
                        date_signed: admission?.consent?.consent?.date_signed || "",
                        documents: admission?.consent?.documents || [{ type: "", url: "" }],
                        vitals: admission?.assessments?.[0]?.vitals || {
                            temperature: null,
                            blood_pressure: "",
                            pulse: null,
                            respiration_rate: null,
                        },
                        notes: admission?.assessments?.[0]?.notes || "",
                        nurse_id: admission?.assessments?.[0]?.nurse_id || "",
                        assessment_date: admission?.assessments?.[0]?.assessment_date || "",
                    });
                })
                .catch((err) => console.error("Error fetching admission details:", err));
        }
    }, [admissionId, patientId]);

    const handleChange = (e) => {
        const { name, value, checked, type } = e.target;

        // Handle nested preferences and vitals updates
        if (*/
/*import React, { useState, useEffect } from "react";
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
            .get("/pa")
            .then(({ data }) => setPatients(data))
            .catch((err) => console.error("Error fetching patients:", err));

        axios
            .get("/admiss")
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

        // Handle nested preferences and vitals updates
        if (name.includes("preferences.") || name.includes("vitals.")) {
            const [key, subKey] = name.split(".");
            setFormData((prev) => ({
                ...prev,
                room_allocation: {
                    ...prev.room_allocation,
                    preferences: {
                        ...prev.room_allocation.preferences,
                        [subKey]: type === "checkbox" ? checked : value
                    }
                }
            }));
        }
        // Handle array-based documents
        else if (name.startsWith("documents.")) {
            const [_, index, subKey] = name.split(".");
            setFormData((prev) => {
                const updatedDocuments = [...prev.consent.documents];
                updatedDocuments[index][subKey] = value;
                return {
                    ...prev,
                    consent: {
                        ...prev.consent,
                        documents: updatedDocuments
                    }
                };
            });
        }
        // Handle assessments
        else if (name.startsWith("assessments.")) {
            const [_, index, key, subKey] = name.split(".");
            setFormData((prev) => {
                const updatedAssessments = [...prev.assessments];
                updatedAssessments[index][key][subKey] = value;
                return { ...prev, assessments: updatedAssessments };
            });
        }
        // Handle other fields
        else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleAddDocument = () => {
        setFormData((prev) => ({
            ...prev,
            consent: {
                ...prev.consent,
                documents: [...prev.consent.documents, { type: "", url: "" }]
            }
        }));
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
                    }))
                },
                assessments: formData.assessments.map((assessment) => ({
                    vitals: {
                        ...assessment.vitals,
                        pulse: assessment.vitals.pulse || undefined
                    },
                    notes: assessment.notes || undefined,
                    nurse_id: assessment.nurse_id || undefined,
                    assessment_date: assessment.assessment_date || undefined
                }))
            };

            const { data } = await axios.put(`/patientss/${patientId}/admissions/${admissionId}`, payload);
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
                        </div>
                    ))}
                    <button type="button" onClick={handleAddDocument}>Add Document</button>
                    <label>Signed By:</label>
                    <input
                        type="text"
                        name="signed_by"
                        value={formData.consent.signed_by}
                        onChange={handleChange}
                    />
                    <label>Relationship to Patient:</label>
                    <input
                        type="text"
                        name="relationship_to_patient"
                        value={formData.consent.relationship_to_patient}
                        onChange={handleChange}
                    />
                    <label>Date Signed:</label>
                    <input
                        type="date"
                        name="date_signed"
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
                        </div>
                    ))}

                    <button type="submit">Update Admission</button>
                </form>
            ) : (
                <p>Select a patient and admission to view details.</p>
            )}
        </div>
    );
};

export default App;*/

import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
    const [patients, setPatients] = useState([]);
    const [admissions, setAdmissions] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [admissionId, setAdmissionId] = useState("");
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updatedAdmission, setUpdatedAdmission] = useState(null);
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
            setFormData(data.admission);
            setUpdatedAdmission(data.admission);
            // Refresh the form with updated values
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

            {updatedAdmission && (
                <div>
                    <h2>Updated Admission Details</h2>
                    <table border="1">
                        <thead>
                            <tr>
                                <th>Field</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                          
                                <tr>
                                    <td>Patient</td>
                                <td>
                                    <strong>Name:</strong> {updatedAdmission.patient_id?.name || "N/A"}<br/>
                                                                                                     
                                </td>
                               
                                </tr>

                         
                                <tr>
                                    <td>Reason for Admission</td>
                                    <td>
                                        {updatedAdmission.recommendation_details.map((rec, index) => (
                                            <div key={index}>
                                                <strong>Reason:</strong> {rec.reason_for_admission}, <strong>Preferred Ward:</strong> {rec.preferred_ward}
                                            </div>
                                        ))}
                                    </td>
                                </tr>

                            
                                <tr>
                                    <td>Room Allocation</td>
                                    <td>
                                        Room: {updatedAdmission.room_allocation?.room_number || "N/A"}, Bed:{" "}
                                        {updatedAdmission.room_allocation?.bed_number || "N/A"}, Ward:{" "}
                                        {updatedAdmission.room_allocation?.ward_type || "N/A"} <br />
                                        <strong>Preferences:</strong>{" "}
                                        {updatedAdmission.room_allocation?.preferences?.private_room
                                            ? "Private Room"
                                            : "Shared Room"}{" "}
                                        | Floor:{" "}
                                        {updatedAdmission.room_allocation?.preferences?.floor_preference || "N/A"}
                                    </td>
                                </tr>

                         
                                <tr>
                                    <td>Consent</td>
                                    <td>
                                        <strong>Signed By:</strong> {updatedAdmission.consent?.consent?.signed_by || "N/A"} <br />
                                        <strong>Relationship:</strong> {updatedAdmission.consent?.consent?.relationship_to_patient || "N/A"} <br />
                                        <strong>Date Signed:</strong>{" "}
                                        {updatedAdmission.consent?.consent?.date_signed
                                            ? new Date(updatedAdmission.consent?.consent?.date_signed).toLocaleDateString()
                                            : "N/A"} <br />
                                        <strong>Documents:</strong>
                                        <ul>
                                            {updatedAdmission.consent?.documents?.map((doc, index) => (
                                                <li key={index}>
                                                    {doc.type}: <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.url}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>

                            
                                <tr>
                                    <td>Assessments</td>
                                    <td>
                                        {updatedAdmission.assessments.map((assess, index) => (
                                            <div key={index}>
                                                <strong>Vitals:</strong> <br />
                                                Temperature: {assess.vitals.temperature || "N/A"}, BP: {assess.vitals.blood_pressure || "N/A"}, Pulse:{" "}
                                                {assess.vitals.pulse || "N/A"}, Respiration Rate: {assess.vitals.respiration_rate || "N/A"} <br />
                                                <strong>Notes:</strong> {assess.notes || "N/A"} <br />
                                                <strong>Nurse:</strong> {assess.nurse_id || "N/A"} <br />
                                                <strong>Assessment Date:</strong>{" "}
                                                {assess.assessment_date
                                                    ? new Date(assess.assessment_date).toLocaleDateString()
                                                    : "N/A"}
                                            </div>
                                        ))}
                                    </td>
                                </tr>

                           
                                <tr>
                                    <td>Doctor</td>
                                    <td>
                                        {updatedAdmission.doctor_id?.name || "N/A"} (
                                        {updatedAdmission.doctor_id?.specialization || "N/A"})
                                    </td>
                                </tr>

                          
                                <tr>
                                    <td>Admission Date</td>
                                    <td>
                                        {updatedAdmission.admission_date
                                            ? new Date(updatedAdmission.admission_date).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                </tr>
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default App;

