/*// src/components/DigitalMedicalRecordForm.js
import React, { useState, useEffect } from 'react';
import { createDigitalMedicalRecord } from '../services/apiii';
import '../css/DigitalMedicalRecordForm.css';

const DigitalMedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        diagnosis: '',
        medications: [''],
        allergies: [''],
        medicalHistory: [{ condition: '', dateDiagnosed: '', status: '' }],
        visitNotes: [{ date: '', note: '' }],
        labResults: [{ testName: '', result: '', date: '' }],
        createdAt: '',
        updatedAt: ''
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZTFiMzY0ODM3NmZmNTFkYmIyNGQ2OSIsImlhdCI6MTcyNjA2NzU1NywiZXhwIjoxNzI4NjU5NTU3fQ.mGGQJqP5fsuVnSoBlfLtT10PnSRf1TIf_MalP2PYrgM'; 
    // Fetch patients and doctors for dropdown
    useEffect(() => {
        const loadData = async () => {
            try {
              *//*  const { patients, doctors } = await fetchPatientsAndDoctors();
                setPatients(patients.data);
                setDoctors(doctors.data);*//*
                const doctors = await axios.get('http://localhost:4000/doctors/', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Token added directly
                    }
                });
                setDoctors(doctors.data);
                const patients = await axios.get('http://localhost:4000/pati/pa', {
                    headers: {
                        Authorization: `Bearer ${token}`  // Token added directly
                    }
                });
                setPatients(patients.data);
            } catch (error) {
                console.error("Error loading patients and doctors", error);
            }
        };
        loadData();
    }, [token]);

    const handleInputChange = (e, field, index = null) => {
        if (index !== null) {
            // Update dynamic list inputs
            const updatedList = [...formData[field]];
            updatedList[index][e.target.name] = e.target.value;
            setFormData({ ...formData, [field]: updatedList });
        } else {
            // Update standard inputs
            setFormData({ ...formData, [field]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDigitalMedicalRecord(formData);
            alert("Record saved successfully!");
        } catch (error) {
            console.error("Error saving record", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {*//* Patient and Doctor Selection *//*}
            <div>
                <label>Patient:</label>
                <select value={formData.patientId} onChange={(e) => handleInputChange(e, 'patientId')}>
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient._id} value={patient._id}>{patient.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <label>Doctor:</label>
                <select value={formData.doctorId} onChange={(e) => handleInputChange(e, 'doctorId')}>
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>{doctor.name}</option>
                    ))}
                </select>
            </div>

            {*//* Diagnosis, Medications, Allergies *//*}
            <input
                type="text"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={(e) => handleInputChange(e, 'diagnosis')}
            />
            {*//* Medication List *//*}
            <div>
                <label>Medications</label>
                {formData.medications.map((med, index) => (
                    <input
                        key={index}
                        type="text"
                        value={med}
                        onChange={(e) => handleInputChange(e, 'medications', index)}
                    />
                ))}
            </div>

            {*//* Medical History *//*}
            <div>
                <label>Medical History</label>
                {formData.medicalHistory.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="condition"
                            placeholder="Condition"
                            value={item.condition}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="date"
                            name="dateDiagnosed"
                            value={item.dateDiagnosed}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="text"
                            name="status"
                            placeholder="Status"
                            value={item.status}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                    </div>
                ))}
            </div>

            {*//* Visit Notes *//*}
            <div>
                <label>Visit Notes</label>
                {formData.visitNotes.map((note, index) => (
                    <div key={index}>
                        <input
                            type="date"
                            name="date"
                            value={note.date}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                        <input
                            type="text"
                            name="note"
                            placeholder="Note"
                            value={note.note}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                    </div>
                ))}
            </div>

            {*//* Lab Results *//*}
            <div>
                <label>Lab Results</label>
                {formData.labResults.map((result, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="testName"
                            placeholder="Test Name"
                            value={result.testName}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="text"
                            name="result"
                            placeholder="Result"
                            value={result.result}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="date"
                            name="date"
                            value={result.date}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                    </div>
                ))}
            </div>

            {*//* CreatedAt, UpdatedAt *//*}
            <input
                type="date"
                value={formData.createdAt}
                onChange={(e) => handleInputChange(e, 'createdAt')}
            />
            <input
                type="date"
                value={formData.updatedAt}
                onChange={(e) => handleInputChange(e, 'updatedAt')}
            />

            {*//* Submit *//*}
            <button type="submit">Save Record</button>
        </form>
    );
};

export default DigitalMedicalRecordForm;
*/// src/components/DigitalMedicalRecordForm.js
// src/components/DigitalMedicalRecordForm.js
/*import React, { useState, useEffect } from 'react';
import { fetchPatientsAndDoctors, createDigitalMedicalRecord } from '../services/apiii';
import '../css/DigitalMedicalRecordForm.css';

const DigitalMedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        diagnosis: '',
        medications: [''],
        allergies: [''],
        medicalHistory: [{ condition: '', dateDiagnosed: '', status: '' }],
        visitNotes: [{ date: '', note: '' }],
        labResults: [{ testName: '', result: '', date: '' }],
        createdAt: '',
        updatedAt: ''
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // Fetch patients and doctors for dropdown
    useEffect(() => {
        const loadData = async () => {
            try {
                const { patients, doctors } = await fetchPatientsAndDoctors();
                setPatients(patients);
                setDoctors(doctors);
            } catch (error) {
                console.error("Error loading patients and doctors", error);
            }
        };
        loadData();
    }, []);

    const handleInputChange = (e, field, index = null) => {
        if (index !== null) {
            // Handle array updates like medications or allergies
            const updatedArray = [...formData[field]];
            updatedArray[index] = e.target.value; // Update specific index
            setFormData({ ...formData, [field]: updatedArray });
        } else {
            // Handle standard fields
            setFormData({ ...formData, [field]: e.target.value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDigitalMedicalRecord(formData);
            alert("Record saved successfully!");
        } catch (error) {
            console.error("Error saving record", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
           
            <div>
                <label>Select Patient:</label>
                <select value={formData.patientId} onChange={(e) => handleInputChange(e, 'patientId')} required>
                    <option value="">Select Patient</option>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name} 
                            </option>
                        ))
                    ) : (
                        <option disabled>No patients available</option>
                    )}
                </select>
            </div>

            <div>
                <label>Select Doctor:</label>
                <select value={formData.doctorId} onChange={(e) => handleInputChange(e, 'doctorId')} required>
                    <option value="">Select Doctor</option>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name} - {doctor.specialization} 
                            </option>
                        ))
                    ) : (
                        <option disabled>No doctors available</option>
                    )}
                </select>
            </div>
            <input
                type="text"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={(e) => handleInputChange(e, 'diagnosis')}
            />
            
            <div>
                <label>Medications</label>
                {formData.medications.map((med, index) => (
                    <input
                        key={index}
                        type="text"
                        value={med.medications}
                        onChange={(e) => handleInputChange(e, 'medications', index)}
                    />
                ))}
            </div>

      
            <div>
                <label>Medical History</label>
                {formData.medicalHistory.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="condition"
                            placeholder="Condition"
                            value={item.condition}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="date"
                            name="dateDiagnosed"
                            value={item.dateDiagnosed}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="text"
                            name="status"
                            placeholder="Status"
                            value={item.status}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                    </div>
                ))}
            </div>

           
            <div>
                <label>Visit Notes</label>
                {formData.visitNotes.map((note, index) => (
                    <div key={index}>
                        <input
                            type="date"
                            name="date"
                            value={note.date}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                        <input
                            type="text"
                            name="note"
                            placeholder="Note"
                            value={note.note}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                    </div>
                ))}
            </div>

         
            <div>
                <label>Lab Results</label>
                {formData.labResults.map((result, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="testName"
                            placeholder="Test Name"
                            value={result.testName}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="text"
                            name="result"
                            placeholder="Result"
                            value={result.result}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="date"
                            name="date"
                            value={result.date}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                    </div>
                ))}
            </div>

            
            <input
                type="date"
                value={formData.createdAt}
                onChange={(e) => handleInputChange(e, 'createdAt')}
            />
            <input
                type="date"
                value={formData.updatedAt}
                onChange={(e) => handleInputChange(e, 'updatedAt')}
            />

            { Submit }
            <button type="submit">Save Record</button>
        </form>
    );
};

export default DigitalMedicalRecordForm;*/

import React, { useState, useEffect } from 'react';
import { fetchPatientsAndDoctors, createDigitalMedicalRecord } from '../services/apiii';
import '../css/DigitalMedicalRecordForm.css';

const DigitalMedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        diagnosis: '',
        medications: '',
        allergies: '',
        medicalHistory: [{ condition: '', dateDiagnosed: '', status: '' }],
        visitNotes: [{ date: '', note: '' }],
        labResults: [{ testName: '', result: '', date: '' }],
        createdAt: '',
        updatedAt: ''
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // Fetch patients and doctors for dropdown
    useEffect(() => {
        const loadData = async () => {
            try {
                const { patients, doctors } = await fetchPatientsAndDoctors();
                setPatients(patients);
                setDoctors(doctors);
            } catch (error) {
                console.error("Error loading patients and doctors", error);
            }
        };
        loadData();
    }, []);

    const handleInputChange = (e, field, index = null) => {
        if (index !== null) {
            // Update dynamic list inputs
            const updatedList = [...formData[field]];
            updatedList[index][e.target.name] = e.target.value;
            setFormData({ ...formData, [field]: updatedList });
        } else {
            // Update standard inputs
            setFormData({ ...formData, [field]: e.target.value });
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDigitalMedicalRecord(formData);
            alert("Record saved successfully!");
        } catch (error) {
            console.error("Error saving record", error);
            alert("Record saved unsuccessfully!");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* Patient and Doctor Selection */}
            <div>
                <label>Select Patient:</label>
                <select value={formData.patientId} onChange={(e) => handleInputChange(e, 'patientId')} required>
                    <option value="">Select Patient</option>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name} {/* Display patient name */}
                            </option>
                        ))
                    ) : (
                        <option disabled>No patients available</option>
                    )}
                </select>
            </div>

            <div>
                <label>Select Doctor:</label>
                <select value={formData.doctorId} onChange={(e) => handleInputChange(e, 'doctorId')} required>
                    <option value="">Select Doctor</option>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name} - {doctor.specialization} {/* Display doctor name and specialization */}
                            </option>
                        ))
                    ) : (
                        <option disabled>No doctors available</option>
                    )}
                </select>
            </div>
           

            <input
                type="text"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={(e) => handleInputChange(e, 'diagnosis')}
            />
            <input
                type="text"
                placeholder="medications"
                value={formData.medications}
                onChange={(e) => handleInputChange(e, 'medications')}
            />
            <input
                type="text"
                placeholder="allerg"
                value={formData.allergies}
                onChange={(e) => handleInputChange(e, 'allergies')}
            />
            {/*<div>
                <label>Medications</label>
                {formData.medications.map((med, index) => (
                    <input
                        key={index}
                        type="text"
                        value={med.medications}
                        onChange={(e) => handleInputChange(e, 'medications', index)}
                    />
                ))}
            </div>*/}


            <div>
                <label>Medical History</label>
                {formData.medicalHistory.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="condition"
                            placeholder="Condition"
                            value={item.condition}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="date"
                            name="dateDiagnosed"
                            value={item.dateDiagnosed}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="text"
                            name="status"
                            placeholder="Status"
                            value={item.status}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                    </div>
                ))}
            </div>

            {/* Visit Notes */}
            <div>
                <label>Visit Notes</label>
                {formData.visitNotes.map((note, index) => (
                    <div key={index}>
                        <input
                            type="date"
                            name="date"
                            value={note.date}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                        <input
                            type="text"
                            name="note"
                            placeholder="Note"
                            value={note.note}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                    </div>
                ))}
            </div>

            {/* Lab Results */}
            <div>
                <label>Lab Results</label>
                {formData.labResults.map((result, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="testName"
                            placeholder="Test Name"
                            value={result.testName}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="text"
                            name="result"
                            placeholder="Result"
                            value={result.result}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="date"
                            name="date"
                            value={result.date}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                    </div>
                ))}
            </div>

            {/* CreatedAt, UpdatedAt */}
            <input
                type="date"
                value={formData.createdAt}
                onChange={(e) => handleInputChange(e, 'createdAt')}
            />
            <input
                type="date"
                value={formData.updatedAt}
                onChange={(e) => handleInputChange(e, 'updatedAt')}
            />

            {/* Submit */}
            <button type="submit">Save Record</button>
        </form>
    );
};

export default DigitalMedicalRecordForm;



/*import React, { useState, useEffect } from 'react';
import { fetchPatientsAndDoctors, createDigitalMedicalRecord } from '../services/apiii';
import '../css/DigitalMedicalRecordForm.css';

const DigitalMedicalRecordForm = () => {
    const [formData, setFormData] = useState({
        
        patientId: '',
        doctorId: '',
        diagnosis: '',
        medications: [''],
        allergies: [''],
        medicalHistory: [{ condition: '', dateDiagnosed: '', status: '' }],
        visitNotes: [{ date: '', note: '' }],
        labResults: [{ testName: '', result: '', date: '' }],
        createdAt: '',
        updatedAt: ''
    });

    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);

    // Fetch patients and doctors for dropdown
    useEffect(() => {
        const loadData = async () => {
            try {
                const { patients, doctors } = await fetchPatientsAndDoctors();
                setPatients(patients);
                setDoctors(doctors);
            } catch (error) {
                console.error("Error loading patients and doctors", error);
            }
        };
        loadData();
    }, []);

    const handleInputChange = (e, field, index = null) => {
        if (index !== null) {
            // Handle array updates like medications or allergies
            const updatedArray = [...formData[field]];
            updatedArray[index] = e.target.value; // Update specific index
            setFormData({ ...formData, [field]: updatedArray });
        } else {
            // Handle standard fields
            setFormData({ ...formData, [field]: e.target.value });
        }
    };

   *//* const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createDigitalMedicalRecord(formData);
            alert("Record saved successfully!");
        } catch (error) {
            console.error("Error saving record", error);
        }
    };*//*

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        // Validate form data
        const errors = validateFormData(formData);
        if (errors.length > 0) {
            alert(`Please fix the following errors:\n${errors.join("\n")}`);
            return;
        }

        try {
            // Send data to the API
            const response = await createDigitalMedicalRecord(formData);
            console.log("Server response:", response);
            alert("Record saved successfully!");
        } catch (error) {
            console.error("Error while saving the record:", error.message || error);
            alert(`Failed to save record. Error: ${error.message || "Unknown error"}`);
        }
    };



    return (
        <form onSubmit={handleSubmit}>
            {*//* Patient and Doctor Selection *//*}
            <div>
                <label>Select Patient:</label>
                <select
                    value={formData.patientId}
                    onChange={(e) => handleInputChange(e, 'patientId')}
                    required
                >
                    <option value="">Select Patient</option>
                    {patients.length > 0 ? (
                        patients.map((patient) => (
                            <option key={patient._id} value={patient._id}>
                                {patient.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No patients available</option>
                    )}
                </select>
            </div>

            <div>
                <label>Select Doctor:</label>
                <select
                    value={formData.doctorId}
                    onChange={(e) => handleInputChange(e, 'doctorId')}
                    required
                >
                    <option value="">Select Doctor</option>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <option key={doctor._id} value={doctor._id}>
                                {doctor.name} - {doctor.specialization}
                            </option>
                        ))
                    ) : (
                        <option disabled>No doctors available</option>
                    )}
                </select>
            </div>
         
            <input
                type="text"
                placeholder="Diagnosis"
                value={formData.diagnosis}
                onChange={(e) => handleInputChange(e, 'diagnosis')}
            />

            {*//* Medications *//*}
            <div>
                <label>Medications</label>
                {formData.medications.map((med, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={med}
                            onChange={(e) => handleInputChange(e, 'medications', index)}
                            placeholder="Enter medication"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() =>
                        setFormData({
                            ...formData,
                            medications: [...formData.medications, '']
                        })
                    }
                >
                    Add Medication
                </button>
            </div>

            {*//* Allergies *//*}
            <div>
                <label>Allergies</label>
                {formData.allergies.map((allergy, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={allergy}
                            onChange={(e) => handleInputChange(e, 'allergies', index)}
                            placeholder="Enter allergy"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() =>
                        setFormData({
                            ...formData,
                            allergies: [...formData.allergies, '']
                        })
                    }
                >
                    Add Allergy
                </button>
            </div>

            {*//* Medical History *//*}
            <div>
                <label>Medical History</label>
                {formData.medicalHistory.map((item, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="condition"
                            placeholder="Condition"
                            value={item.condition}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="date"
                            name="dateDiagnosed"
                            value={item.dateDiagnosed}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                        <input
                            type="text"
                            name="status"
                            placeholder="Status"
                            value={item.status}
                            onChange={(e) => handleInputChange(e, 'medicalHistory', index)}
                        />
                    </div>
                ))}
            </div>

            {*//* Visit Notes *//*}
            <div>
                <label>Visit Notes</label>
                {formData.visitNotes.map((note, index) => (
                    <div key={index}>
                        <input
                            type="date"
                            name="date"
                            value={note.date}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                        <input
                            type="text"
                            name="note"
                            placeholder="Note"
                            value={note.note}
                            onChange={(e) => handleInputChange(e, 'visitNotes', index)}
                        />
                    </div>
                ))}
            </div>

            {*//* Lab Results *//*}
            <div>
                <label>Lab Results</label>
                {formData.labResults.map((result, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            name="testName"
                            placeholder="Test Name"
                            value={result.testName}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="text"
                            name="result"
                            placeholder="Result"
                            value={result.result}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                        <input
                            type="date"
                            name="date"
                            value={result.date}
                            onChange={(e) => handleInputChange(e, 'labResults', index)}
                        />
                    </div>
                ))}
            </div>

            {*//* CreatedAt, UpdatedAt *//*}
            <input
                type="date"
                value={formData.createdAt}
                onChange={(e) => handleInputChange(e, 'createdAt')}
            />
            <input
                type="date"
                value={formData.updatedAt}
                onChange={(e) => handleInputChange(e, 'updatedAt')}
            />

            {*//* Submit *//*}
            <button type="submit">Save Record</button>
        </form>
    );
};

export default DigitalMedicalRecordForm;
*/