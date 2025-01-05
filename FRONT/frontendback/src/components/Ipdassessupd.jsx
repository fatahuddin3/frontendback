


import React, { useState, useEffect } from 'react';
import { fetchAdmissions, updateAssessAllocation, fetchAssess } from '../services/api';

const RoomAllocationForm = () => {
    const [admissions, setAdmissions] = useState([]);
    const [assess, setAssess] = useState([]);
    const [selectedAdmission, setSelectedAdmission] = useState('');
    const [selectAssess, setSelectAssess] = useState('');
    const [formData, setFormData] = useState({
        vitals: {
            temperature: '',
            blood_pressure: '',
            pulse: '',
            respiration_rate: '',
        },
        notes: '',
        assessment_date: '',
    });
    const [message, setMessage] = useState('');
    const [updatedAdmission, setUpdatedAdmission] = useState(null);
    useEffect(() => {
        const getAdmissions = async () => {
            try {
                const data = await fetchAdmissions();
                setAdmissions(data);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };
        getAdmissions();
    }, []);

    useEffect(() => {
        const getAssessments = async () => {
            try {
                const data = await fetchAssess();
                setAssess(data);
            } catch (error) {
                console.error('Error fetching assessments:', error);
            }
        };
        getAssessments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle nested structure for vitals
        if (['temperature', 'blood_pressure', 'pulse', 'respiration_rate'].includes(name)) {
            setFormData((prev) => ({
                ...prev,
                vitals: {
                    ...prev.vitals,
                    [name]: value,
                },
            }));
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updateAssessAllocation(selectedAdmission, formData, selectAssess);
            setMessage(response.message || 'Room details updated successfully.');
            setUpdatedAdmission(response.admission);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error updating room details.');
        }
    };

    return (
        <div className="room-allocation-form">
            <h2>Room Allocation</h2>
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
                <label>
                    Select Assessment:
                    <select
                        value={selectAssess}
                        onChange={(e) => setSelectAssess(e.target.value)}
                        required
                    >
                        <option value="">-- Select Assessment --</option>
                        {assess.map((asse) => (
                            <option key={asse._id} value={asse._id}>
                                {asse._id}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Temperature:
                    <input
                        type="number"
                        name="temperature"
                        value={formData.vitals.temperature}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Blood Pressure:
                    <input
                        type="text"
                        name="blood_pressure"
                        value={formData.vitals.blood_pressure}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Pulse:
                    <input
                        type="number"
                        name="pulse"
                        value={formData.vitals.pulse}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Respiration Rate:
                    <input
                        type="number"
                        name="respiration_rate"
                        value={formData.vitals.respiration_rate}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Notes:
                    <input
                        type="text"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Assessment Date:
                    <input
                        type="date"
                        name="assessment_date"
                        value={formData.assessment_date}
                        onChange={handleChange}
                    />
                </label>

                <button type="submit">Submit</button>
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


                            
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default RoomAllocationForm;
//above and below code both are right just vitals are processed diff way
/*
import React, { useState, useEffect } from 'react';
import { fetchAdmissions, updateAssessAllocation, fetchAssess } from '../services/api';

const RoomAllocationForm = () => {
    const [admissions, setAdmissions] = useState([]);
    const [assess, setAssess] = useState([]);
    const [selectedAdmission, setSelectedAdmission] = useState('');
    const [selectAssess, setSelectAssess] = useState('');
    const [vitals, setVitals] = useState({
        temperature: '',
        blood_pressure: '',
        pulse: '',
        respiration_rate: '',
    });
    const [notes, setNotes] = useState('');
    const [assessmentDate, setAssessmentDate] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const getAdmissions = async () => {
            try {
                const data = await fetchAdmissions();
                setAdmissions(data);
            } catch (error) {
                console.error('Error fetching admissions:', error);
            }
        };
        getAdmissions();
    }, []);

    useEffect(() => {
        const getAssessments = async () => {
            try {
                const data = await fetchAssess();
                setAssess(data);
            } catch (error) {
                console.error('Error fetching assessments:', error);
            }
        };
        getAssessments();
    }, []);

    const handleVitalChange = (e) => {
        const { name, value } = e.target;
        setVitals({
            ...vitals,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Build the final payload
        const formData = {
            vitals,
            notes,
            assessment_date: assessmentDate,
        };

        try {
            const response = await updateAssessAllocation(selectedAdmission, formData, selectAssess);
            setMessage(response.message || 'Room details updated successfully.');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Error updating room details.');
        }
    };

    return (
        <div className="room-allocation-form">
            <h2>Room Allocation</h2>
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
                <label>
                    Select Assessment:
                    <select
                        value={selectAssess}
                        onChange={(e) => setSelectAssess(e.target.value)}
                        required
                    >
                        <option value="">-- Select Assessment --</option>
                        {assess.map((asse) => (
                            <option key={asse._id} value={asse._id}>
                                {asse._id}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Temperature:
                    <input
                        type="number"
                        name="temperature"
                        value={vitals.temperature}
                        onChange={handleVitalChange}
                        required
                    />
                </label>
                <label>
                    Blood Pressure:
                    <input
                        type="text"
                        name="blood_pressure"
                        value={vitals.blood_pressure}
                        onChange={handleVitalChange}
                        required
                    />
                </label>
                <label>
                    Pulse:
                    <input
                        type="number"
                        name="pulse"
                        value={vitals.pulse}
                        onChange={handleVitalChange}
                        required
                    />
                </label>
                <label>
                    Respiration Rate:
                    <input
                        type="number"
                        name="respiration_rate"
                        value={vitals.respiration_rate}
                        onChange={handleVitalChange}
                    />
                </label>
                <label>
                    Notes:
                    <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </label>
                <label>
                    Assessment Date:
                    <input
                        type="date"
                        value={assessmentDate}
                        onChange={(e) => setAssessmentDate(e.target.value)}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default RoomAllocationForm;*/
