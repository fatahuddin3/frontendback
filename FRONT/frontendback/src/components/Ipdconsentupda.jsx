/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsentForm = () => {
    const [admissions, setAdmissions] = useState([]);
    const [selectedAdmission, setSelectedAdmission] = useState('');
    const [consentDetails, setConsentDetails] = useState({
        signed_by: '',
        relationship_to_patient: '',
        date_signed: '',
    });
    const [documents, setDocuments] = useState([]);
    const [newDocument, setNewDocument] = useState({
        type: '',
        url: '',
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchAdmissions = async () => {
            try {
                const response = await axios.get('http://localhost:4000/user/admiss');
                setAdmissions(response.data);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };
        fetchAdmissions();
    }, []);

    const handleConsentChange = (e) => {
        const { name, value } = e.target;
        setConsentDetails({
            ...consentDetails,
            [name]: value,
        });
    };

    const handleDocumentChange = (e) => {
        const { name, value } = e.target;
        setNewDocument({
            ...newDocument,
            [name]: value,
        });
    };

    const addDocument = () => {
        if (newDocument.type && newDocument.url) {
            setDocuments([...documents, newDocument]);
            setNewDocument({ type: '', url: '' });
        } else {
            setMessage('Please provide both type and URL for the document.');
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAdmission) {
            setMessage('Please select an admission.');
            return;
        }

        if (!consentDetails.signed_by || !consentDetails.date_signed) {
            setMessage('Please fill in all required consent details.');
            return;
        }

        const payload = {
            consentDetails,
            documents,
        };

        try {
            const response = await axios.put(`http://localhost:4000/user/admissions/${selectedAdmission}/consent`, payload);
            setMessage(response.data.message || 'Consent details updated successfully.');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error updating consent details.');
        }
    };
   
    return (
        <div className="consent-form">
            <h2>Consent Form</h2>
            {message && <p className="message">{message}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Select Admission:
                    <select
                        value={selectedAdmission}
                        onChange={(e) => setSelectedAdmission(e.target.value)}
                        required
                    >
                        <option value="">-- Select Admission --</option>
                        {admissions.map((admission) => (
                            <option key={admission._id} value={admission._id}>
                                {admission._id}
                            </option>
                        ))}
                    </select>
                </label>

                <h3>Consent Details</h3>
                <label>
                    Signed By:
                    <input
                        type="text"
                        name="signed_by"
                        value={consentDetails.signed_by}
                        onChange={handleConsentChange}
                        required
                    />
                </label>
                <label>
                    Relationship to Patient:
                    <input
                        type="text"
                        name="relationship_to_patient"
                        value={consentDetails.relationship_to_patient}
                        onChange={handleConsentChange}
                        required
                    />
                </label>
                <label>
                    Date Signed:
                    <input
                        type="date"
                        name="date_signed"
                        value={consentDetails.date_signed}
                        onChange={handleConsentChange}
                        required
                    />
                </label>

                <h3>Documents</h3>
                {documents.map((doc, index) => (
                    <div key={index} className="document-entry">
                        <p>
                            <strong>Type:</strong> {doc.type} | <strong>URL:</strong> {doc.url}
                        </p>
                    </div>
                ))}
                <div className="document-input">
                    <label>
                        Document Type:
                        <input
                            type="text"
                            name="type"
                            value={newDocument.type}
                            onChange={handleDocumentChange}
                        />
                    </label>
                    <label>
                        Document URL:
                        <input
                            type="text"
                            name="url"
                            value={newDocument.url}
                            onChange={handleDocumentChange}
                        />
                    </label>
                    <button type="button" onClick={addDocument}>
                        Add Document
                    </button>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ConsentForm;*/


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
            const { data } = await axios.put(`http://localhost:4000/user/patientsss/${patientId}/admissions/${admissionId}`);
            setFormData({
                
                consent: {
                    documents: data.admission.consent?.documents?.length > 0
                        ? data.admission.consent.documents
                        : [{ type: "", url: "" }],
                    signed_by: data.admission.consent?.consent?.signed_by || "",
                    relationship_to_patient: data.admission.consent?.consent?.relationship_to_patient || "",
                    date_signed: data.admission.consent?.consent?.date_signed || ""
                },
                
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
            
            // Handle nested fields for documents in consent
             if (name.startsWith("documents.")) {
                const [_, index, subKey] = name.split(".");
                updatedFormData.consent.documents[index][subKey] = value;
            }

            // Handle nested fields for assessments
            

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
               
                consent: {
                    ...formData.consent,
                    documents: formData.consent.documents.map((doc) => ({
                        type: doc.type || undefined,
                        url: doc.url || undefined
                    })),

                },
                
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


                            

                            
                           
                        </tbody>
                    </table>
                </div>
            )}

        </div>
    );
};

export default App;