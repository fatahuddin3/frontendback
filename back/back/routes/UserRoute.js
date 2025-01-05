/*const express = require("express");
const router = express.Router();


const {
    getUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
} = require('../controllers/UserController.js')



router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', saveUser);
router.patch('/users/:id' , updateUser);
router.delete('/users/:id' , deleteUser);

module.exports = router*/

const express = require("express");
const router = express.Router();
const Patient = require('../models/Patient');
const Ipdnurse = require('../models/Ipdnurses');
const NurseActivityLog = require('../models/Nurseactvity');
const Admission = require('../models/Admission');
const Room = require('../models/Room');
const Consent = require('../models/Consent');
const Assessment = require('../models/Assessment');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');
const {
    registerDoctor,
    loginUser,
    getAllUsers,
    getUserById,
    updateUser,
    addPatient,
    getPatients,
    updatePatient,
    deletePatient,
    registerStaff,
    registerNurse,
} = require('../controllers/UserController.js')



const { protect } = require('../middlewares/protected');
// routes/users.js
router.post('/userreg', registerDoctor); // User registration route
router.post('/userlog', loginUser); // User login route
router.get('/users',protect, getAllUsers);           // Get all users (Admin only)
router.get('/users/:id', protect, getUserById);       // Get user by ID (Admin or user themselves)
router.put('/users/:id', protect, updateUser);     

/*router.post('/patients', protect, addPatient); // Add a patient - unique route for patient registration
router.get('/patients',authdoc,  getPatients);
router.put('/patients/:id',authdoc,   updatePatient);
router.delete('/patients/:id',authdoc,  deletePatient);*/
//
router.post('/:doctorId/patients', protect, addPatient);
router.get('/:doctorId/patients', protect, getPatients);
router.put('/:doctorId/patients/:patientId', protect, updatePatient);
router.delete('/:doctorId/patients/:patientId', protect, deletePatient);

router.post('/staf', registerStaff);
router.post('/nurs', registerNurse);
//nurse_id or patient_id vul dile direct seta bole na je vul bole amuk array reading null,undefined
router.post('/nurse-activities/:nurse_id/:patient_id',  async (req, res) => {
   
    try {
        const {  task, scheduled_time, priority } = req.body;
       
        const nurse = await Ipdnurse.findById( req.params.nurse_id  );
        const patient = await Patient.findById(req.params.patient_id);
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Check if patient exists
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Validate input
        if ( !task || !scheduled_time || !priority) {
            return res.status(400).json({ error: 'All fields are required' });
        }

              
        // Create task for nurse
        const taskForNurse = {
            patient: patient._id,
            task,
            priority,
            scheduled_time,
            status: 'Pending'
        };

        // Update nurse's tasksAssigned
        nurse.tasksAssigned.push(taskForNurse);
        await nurse.save();

        // Create task for patient
        const taskForPatient = {
            task,
            nurse: nurse._id,
            priority,
            scheduled_time,
            status: 'Pending'
        };

        // Update patient's assignedTasks
        patient.assignedTasks.push(taskForPatient);
        await patient.save();

        return res.status(200).json({
            message: 'Nurse assigned to patient task successfully',
            task: taskForPatient
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/nurse-activities/assignments/:nurse_id', async (req, res) => {
    try {
        const { nurse_id } = req.params;

        // Find the nurse and populate patient information in tasksAssigned
        const nurse = await Ipdnurse.findById(nurse_id).populate({
            path: 'tasksAssigned.patient',
            select: 'name age gender' // Populate only specific fields from Patient model
        });

        
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Prepare and return the tasks
        const assignments = nurse.tasksAssigned.map((assignment) => ({
            assignment_id: assignment._id,
            patient_id: assignment.patient ? assignment.patient._id : null,
            task: assignment.task,
            status: assignment.status,
            scheduled_time: assignment.scheduled_time,
            priority: assignment.priority
        }));

        return res.status(200).json(assignments);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
router.post('/nurse-activities/logs/:nurse_id/:patient_id', async (req, res) => {
    try {
        const {  activity, timestamp, notes } = req.body;

        // Validate input
        if ( !activity || !timestamp) {
            return res.status(400).json({ error: 'All fields are required except notes.' });
        }

        // Find the nurse and patient
        const nurse = await Ipdnurse.findById(req.params.nurse_id);
        const patient = await Patient.findById(req.params.patient_id);

        // Check if nurse exists
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Check if patient exists
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Create the activity log
        const activityLog = new NurseActivityLog({
            nurse: nurse._id,
            patient: patient._id,
            activity,
            timestamp,
            notes
        });

        // Save the activity log to the database
        await activityLog.save();

        nurse.activityLogs.push({
            patient: patient._id,
            activity,
            timestamp,
            notes
        });
        await nurse.save();
        return res.status(201).json({
            message: 'Activity log created successfully',
            log: activityLog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
router.post('/nurse-shifts/:nurse_id', async (req, res) => {
    try {
        const {  start_time, end_time, assigned_ipd_patients } = req.body;

        // Validate input
        if (  !start_time || !end_time || !Array.isArray(assigned_ipd_patients)) {
            return res.status(400).json({ error: 'All fields are required and assigned_ipd_patients must be an array.' });
        }

        // Find the nurse
        const nurse = await Ipdnurse.findById(req.params.nurse_id);
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Validate patients
        const validPatients = [];
        for (const patientId of assigned_ipd_patients) {
            const patient = await Patient.findById(patientId);
            if (!patient) {
                return res.status(404).json({ error: `Patient with ID ${patientId} not found` });
            }
            validPatients.push(patient._id);
        }

        // Create a new shift
        const newShift = {
            start_time,
            end_time,
            assigned_patients: validPatients
        };

        // Add the shift to the nurse's shifts
        nurse.shifts.push(newShift);
        await nurse.save();

        return res.status(201).json({
            message: 'Shift scheduled successfully',
            shift: newShift
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
router.get('/nurse-activities/status/patient/:patient_id', async (req, res) => {
    try {
        const { patient_id } = req.params;

        // Find the patient
        const patient = await Patient.findById(patient_id).populate({
            path: 'assignedTasks.nurse',
            select: 'name specialization' // Populate nurse details
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Format response for each assigned task
        const tasks = patient.assignedTasks.map((task) => ({
            assignment_id: task._id,
            nurse_name: task.nurse ? task.nurse.name : null,
            task: task.task,
            status: task.status,
            scheduled_time: task.scheduled_time,
            completed_time: task.completed_time || null // Return null if not completed
        }));

        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
router.get('/nurse-shifts/nurse/:nurse_id', async (req, res) => {
    try {
        const { nurse_id } = req.params;

        // Find the nurse and populate patient details in shifts
        const nurse = await Ipdnurse.findById(nurse_id).populate({
            path: 'shifts.assigned_patients',
            select: 'name age gender'
        });

        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        
        const response = {
            nurse_id: nurse._id,
            shifts: nurse.shifts.map(shift => ({
                start_time: shift.start_time,
                end_time: shift.end_time,
                assigned_ipd_patients: shift.assigned_patients.map(patient => ({
                    patient_id: patient._id,
                    name: patient.name
                }))
            }))
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
router.get('/nurse-shifts/patient/:patient_id', async (req, res) => {
    try {
        const { patient_id } = req.params;

        // Find the nurse shifts associated with the given patient
        const nurses = await Ipdnurse.find({
            'shifts.assigned_patients': patient_id
        }).select('name shifts');

        if (nurses.length === 0) {
            return res.status(404).json({ error: 'No nurse shifts found for the patient' });
        }

        // Prepare response
        const response = nurses.flatMap(nurse =>
            nurse.shifts
                .filter(shift =>
                    shift.assigned_patients.some(p => p.toString() === patient_id)
                )
                .map(shift => ({
                    nurse_id: nurse._id,
                    nurse_name: nurse.name,
                    shift_start: shift.start_time,
                    shift_end: shift.end_time
                }))
        );

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
router.put('/nurse-activities/:assignment_id/status', async (req, res) => {
    try {
        const { assignment_id } = req.params;
        const { status, timestamp } = req.body;

        // Validate input
        if (!status || !timestamp) {
            return res.status(400).json({ error: 'Status and timestamp are required' });
        }

        // Find and update the task in the patient's assignedTasks array
        const patient = await Patient.findOneAndUpdate(
            { 'assignedTasks._id': assignment_id },
            {
                $set: {
                    'assignedTasks.$.status': status,
                    'assignedTasks.$.completed_time': timestamp
                }
            },
            { new: true }
        );

        if (!patient) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        return res.status(200).json({
            message: 'Activity status updated successfully',
            updated_task: patient.assignedTasks.find(
                task => task._id.toString() === assignment_id
            )
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/nurse-activities/assignments/patient/:patient_id', async (req, res) => {
    try {
        const { patient_id } = req.params;

        // Find the patient
        const patient = await Patient.findById(patient_id).populate({
            path: 'assignedTasks.nurse',
            select: 'name specialization'
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Prepare response
        const tasks = patient.assignedTasks.map(task => ({
            assignment_id: task._id,
            nurse_name: task.nurse ? task.nurse.name : null,
            task: task.task,
            status: task.status,
            scheduled_time: task.scheduled_time,
            priority: task.priority
        }));

        return res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/nurse-activities/logs/nurse/:nurse_id', async (req, res) => {
    try {
        const { nurse_id } = req.params;

        // Find the nurse
        const nurse = await Ipdnurse.findById(nurse_id).populate({
            path: 'activityLogs.patient',
            select: 'name age gender'
        });

        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Prepare response
        const logs = nurse.activityLogs.map(log => ({
            log_id: log._id,
            Patient_name: log.patient ? log.patient.name : null,
            activity: log.activity,
            timestamp: log.timestamp,
            notes: log.notes
        }));

        return res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

// GET /reports/nurse-activities/daily/:nurse_id
router.get('/reports/nurse-activities/daily/:nurse_id', async (req, res) => {
    try {
        const { nurse_id } = req.params;

        // Fetch nurse and their activity logs
        const nurse = await Ipdnurse.findById(nurse_id).populate({
            path: 'activityLogs.patient',
            select: 'name age gender'
        });

        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Filter logs for today's date
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));
        const endOfDay = new Date(today.setHours(23, 59, 59, 999));

        const dailyActivities = nurse.activityLogs.filter(log =>
            new Date(log.timestamp) >= startOfDay && new Date(log.timestamp) <= endOfDay
        );

        // Prepare response
        const response = {
            date: startOfDay.toISOString().split('T')[0], // ISO date format
            nurse_id: nurse._id,
            activities: dailyActivities.map(log => ({
                patient_name: log.patient ? log.patient.name : null,
                activity: log.activity,
                timestamp: log.timestamp,
                status: "Completed" // Assuming logs are for completed activities
            }))
        };
      

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});


// GET /reports/ipd-patient/:patient_id/activities
router.get('/reports/ipd-patient/:patient_id/activities', async (req, res) => {
    try {
        const { patient_id } = req.params;

        // Find patient and their assigned tasks
        const patient = await Patient.findById(patient_id).populate({
            path: 'assignedTasks.nurse',
            select: 'name specialization'
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Prepare response
        const response = {
            patient_id: patient._id,
            admission_date: patient.createdAt,
            activities: patient.assignedTasks.map(task => ({
                activity: task.task,
                nurse_name: task.nurse ? task.nurse.name : null,
                timestamp: task.scheduled_time,
                notes: `Priority: ${task.priority}, Status: ${task.status}`
            }))
        };

        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/allnur',  async (req, res) => {
    
    const nurse = await Ipdnurse.find();
    return res.status(200).json(nurse);
});

/*router.post('/nurse-activities/discharge/:patient_id', async (req, res) => {
    try {
        const { name, dose, frequency, duration, treatment_summary } = req.body;
        // Create a new discharge document from the request body
        
     
        const patient = await Patient.findById(req.params.patient_id);
       

        // Check if patient exists
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        //extra below
        if (!name || !dose || !frequency || !duration || !treatment_summary) {
            return res.status(400).json({ error: 'All fieldsf are required' });
        }

        const patient_discharge = {
            name,dose,frequency,duration
        };

        // Update nurse's tasksAssigned
        patient.medications_to_continue.push(patient_discharge);
        patient.treatment_summary = treatment_summary;
        
        await patient.save();
        
        // Return the saved discharge record as a response
        res.status(201).json({
            message: 'Patient discharged successfully',
            discharge_info: patient_discharge
        });
    } catch (error) {
        // Handle any errors during saving
        res.status(500).json({ message: 'Failed to create discharge record', error });
    }
});
*/


/*router.post('/nurse-activities/discharg/:nurse_id/:patient_id', async (req, res) => {

    try {
        const { name, dose, frequency, duration, treatment_summary } = req.body;

        const nurse = await Ipdnurse.findById(req.params.nurse_id);
        const patient = await Patient.findById(req.params.patient_id);
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Check if patient exists
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Validate input
        if (!name || !dose || !frequency || !duration || !treatment_summary ) {
            return res.status(400).json({ error: 'All fieldsf are required' });
        }

        const patient_discharge = {
            name, dose, frequency, duration
        };



        // Create task for nurse
        patient.medications_to_continue.push(patient_discharge);
        patient.treatment_summary = treatment_summary;

        await patient.save();

        // Create task for patient
       
        return res.status(200).json({
            message: 'Nurse discharged info to patient  successfully',
           
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});*/


router.put('/nurse-activitiess/:patient_id/status', async (req, res) => {
    try {
        const { dischargedate } = req.body;

        // Update the discharge status and discharge date
        const patient = await Patient.findByIdAndUpdate(
            req.params.patient_id,
            {
                $set: {
                    dischargeStatus: 'Pending',
                    dischargedate: dischargedate, // Set the discharge date
                },
            },
            { new: true } // Return the updated document
        );

        // If patient is not found
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient discharged successfully', patient });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

router.get('/disc', async (req, res) => {
    try {
        const patients = await Patient.find({ dischargeStatus: 'Pending' });
        res.status(200).json({patients });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});




/*router.post('/doctor-activities/discharge/:nurse_id', async (req, res) => {
    try {
        const { medications_for_disch_patient, treatment_summary_disc_patient } = req.body;

        // Find the nurse by ID
        const nurse = await Ipdnurse.findById(req.params.nurse_id);

        // Check if nurse exists
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Validate that medications_for_disch_patient is an array
        if (!Array.isArray(medications_for_disch_patient) || medications_for_disch_patient.length === 0) {
            return res.status(400).json({
                error: 'medications_for_disch_patient must be a non-empty array',
            });
        }

        // Validate each medication object
        medications_for_disch_patient.forEach((medication, index) => {
            if (!medication.patient || !medication.name || !medication.dose || !medication.frequency || !medication.duration) {
                throw new Error(`Medication at index ${index} is missing required fields`);
            }
        });

        // Add all medications to the nurse's medications_for_disch_patient
        nurse.medications_for_disch_patient.push(...medications_for_disch_patient);

        // Update the treatment summary
        nurse.treatment_summary_disc_patient = treatment_summary_disc_patient;

        // Save updated nurse document
        await nurse.save();

        // Return the saved discharge record as a response
        res.status(201).json({
            message: 'Discharge information saved successfully',
            medications_for_disch_patient,
        });
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        res.status(500).json({
            message: 'Failed to save discharge information',
            error: error.message || 'Unknown error',
        });
    }
});*/
router.post('/doctor-activities/discharge/:nurse_id/:patient_id', async (req, res) => {
    try {
        const { medications_for_disch_patient, treatment_summary_disc_patient } = req.body;

        // Find the nurse and patient by IDs
        const nurse = await Ipdnurse.findById(req.params.nurse_id);
        const patient = await Patient.findById(req.params.patient_id);

        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Validate that medications_for_disch_patient is a non-empty array
        if (!Array.isArray(medications_for_disch_patient) || medications_for_disch_patient.length === 0) {
            return res.status(400).json({ error: 'medications_for_disch_patient must be a non-empty array' });
        }

        // Append the patient ID to each medication in the array
        const updatedMedications = medications_for_disch_patient.map((medication, index) => {
            if (!medication.name || !medication.dose || !medication.frequency || !medication.duration) {
                throw new Error(`Medication at index ${index} is missing required fields`);
            }
            return {
                ...medication,
                patient: patient._id,
                patient_name: patient.name
                // Add patient ID
            };
        });

        // Create a new discharge record
        const newDischargeRecord = {
            treatment_summary_disc_patient,
            medications_for_disch_patient: updatedMedications,
           
        };

        // Push the new record into discharge_records array
        nurse.discharge_records.push(newDischargeRecord);

        // Save updated nurse document
        await nurse.save();

        res.status(201).json({
            message: 'New discharge record added successfully',
            discharge_record: newDischargeRecord,
        });
    } catch (error) {
        console.error('Error:', error); // Log for debugging
        res.status(500).json({
            message: 'Failed to add discharge record',
            error: error.message || 'Unknown error',
        });
    }
});
router.post('/nurse-activities/discharg/:nurse_id/:patient_id', async (req, res) => {

    try {
        const { medications_to_continue , treatment_summary } = req.body;

        const nurse = await Ipdnurse.findById(req.params.nurse_id);
        const patient = await Patient.findById(req.params.patient_id);
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Check if patient exists
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        // Validate input
        if (!Array.isArray(medications_to_continue) || medications_to_continue .length === 0) {
            return res.status(400).json({ error: 'medications_for_disch_patient must be a non-empty array' });
        }

        const updatedMedications = medications_to_continue.map((medication, index) => {
            if (!medication.name || !medication.dose || !medication.frequency || !medication.duration) {
                throw new Error(`Medication at index ${index} is missing required fields`);
            }
            return {
                ...medication,
                nurse: nurse._id,
               
                 // Add patient ID
            };
        });
        const newDischargeRecord = {
            treatment_summary,
            medications_to_continue: updatedMedications,
        };

        // Create task for nurse
        patient.discharge_records.push(newDischargeRecord);

        await patient.save();

        // Create task for patient

        return res.status(200).json({
            message: 'Nurse discharged info to patient  successfully',

        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});
router.get('/doctor-activities/discharge-records/:nurse_id', async (req, res) => {
    try {
        // Find the nurse by ID
        const nurse = await Ipdnurse.findById(req.params.nurse_id).populate({
            path: 'discharge_records.medications_for_disch_patient.patient',
            select: 'name',
        });

        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }

        // Return the discharge records
        res.status(200).json({
            message: 'Discharge records retrieved successfully',
            discharge_records: nurse.discharge_records,
        });
    } catch (error) {
        console.error('Error:', error); // Log for debugging
        res.status(500).json({
            message: 'Failed to retrieve discharge records',
            error: error.message || 'Unknown error',
        });
    }
});

/*const admissions = [];
const patients = [];

// POST /api/admissions/initiate
router.post('/api/admissions/initiate', (req, res) => {
    const { patient_id, doctor_id, recommendation_details } = req.body;

    // Validate the request body
    if (!patient_id || !doctor_id || !recommendation_details || !recommendation_details.reason_for_admission || !recommendation_details.preferred_ward) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields in request body."
        });
    }

    // Create a new admission record
    const newAdmission = {
        admission_id: `AD${admissions.length + 1}`, // Example admission ID
        patient_id,
        doctor_id,
        recommendation_details,
        admission_date: new Date().toISOString()
    };

    admissions.push(newAdmission);

    return res.status(201).json({
        status: "success",
        message: "Admission initiated.",
        admission_id: newAdmission.admission_id
    });
});

// POST /api/patients/register
router.post('/api/patients/register', (req, res) => {
    const { name, age, gender, contact, address, emergency_contact, insurance_details } = req.body;

    // Validate the request body
    if (!name || !age || !gender || !contact || !address || !emergency_contact || !emergency_contact.name || !emergency_contact.phone) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields in request body."
        });
    }

    // Create a new patient record
    const newPatient = {
        patient_id: `P${patients.length + 1}`, // Example patient ID
        name,
        age,
        gender,
        contact,
        address,
        emergency_contact,
        insurance_details,
        uhid: `UH${Math.random().toString(36).substr(2, 9).toUpperCase()}` // Example UHID
    };

    patients.push(newPatient);

    return res.status(201).json({
        status: "success",
        message: "Patient registered successfully.",
        patient_id: newPatient.patient_id,
        uhid: newPatient.uhid
    });
});*/

// Import required modules

// Import models
// POST /api/patients/register
router.post('/patients/register', async (req, res) => {
    const { name, age, gender, contact, address, emergency_contact, insurance_details } = req.body;

    if (!name || !age || !gender || !contact || !address || !emergency_contact?.name || !emergency_contact?.phone) {
        return res.status(400).json({
            status: "error",
            message: "Missing required fields in request body."
        });
    }

    try {
        const newPatient = await Patient.create({
            name,
            age,
            gender,
            contact,
            address,
            emergency_contact,
            insurance_details,
            uhid: `UH${Math.random().toString(36).substr(2, 9).toUpperCase()}`
        });

        return res.status(201).json({
            status: "success",
            message: "Patient registered successfully.",
            patient_id: newPatient._id,
            uhid: newPatient.uhid
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error." });
    }
});

// POST /api/admissions/initiate
/*router.post('/admissions/initiate/:patient_id/:doctor_id', async (req, res) => {
    try {
        const { recommendation_details } = req.body;

        // Validate doctor and patient IDs
        const doctor = await Doctor.findById(req.params.doctor_id);
        const patient = await Patient.findById(req.params.patient_id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Validate recommendation details
        if (!recommendation_details?.reason_for_admission || !recommendation_details?.preferred_ward) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in recommendation_details."
            });
        }

        // Create the new admission record
        const newAdmission = new Admission({
            
            patient_id: patient._id,
            doctor_id: doctor._id,
            recommendation_details,
            admission_date: new Date()
        });
        
        // Save to the database       
        
        await newAdmission.save();
        // Respond with success
        return res.status(201).json({
            status: "success",
            message: "Admission initiated.",
            admission_id: newAdmission._id
        });

    } catch (err) {
        console.error("Error during admission initiation:", err);
        return res.status(500).json({ status: "error", message: "Server error.", details: err.message });
    }
});*/
/*router.post('/admissions/initiate/:patient_id/:doctor_id', async (req, res) => {
    try {
        const { recommendation_details } = req.body;

        // Validate doctor and patient IDs
        const doctor = await Doctor.findById(req.params.doctor_id);
        const patient = await Patient.findById(req.params.patient_id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        if (!recommendation_details?.reason_for_admission || !recommendation_details?.preferred_ward) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in recommendation_details."
            });
        }
        if (!Array.isArray(recommendation_details) || recommendation_details.length === 0) {
            return res.status(400).json({ status: "error", message: "Recommendation details must be an array with at least one entry." });
        }

        for (const detail of recommendation_details) {
            if (!detail.reason_for_admission || !detail.preferred_ward) {
                return res.status(400).json({
                    status: "error",
                    message: "Each entry in recommendation details must have reason_for_admission and preferred_ward."
                });
            }
        }
        // Generate unique admission ID if required (can be a UUID)
        const admissionID = new mongoose.Types.ObjectId();

        const newAdmission = new Admission({
            admission_id: admissionID,
            patient_id: patient._id,
            doctor_id: doctor._id,
            recommendation_details,
            admission_date: new Date()
        });

        await newAdmission.save();

        return res.status(201).json({
            status: "success",
            message: "Admission initiated.",
            admission_id: newAdmission._id
        });

    } catch (err) {
        console.error("Error during admission initiation:", err);
        return res.status(500).json({ status: "error", message: "Server error.", details: err.message });
    }
});*/
router.post('/admissions/initiate/:patient_id/:doctor_id', async (req, res) => {
    try {
        const { recommendation_details } = req.body;

        // Validate doctor and patient IDs
        const doctor = await Doctor.findById(req.params.doctor_id);
        const patient = await Patient.findById(req.params.patient_id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        if (!Array.isArray(recommendation_details) || recommendation_details.length === 0) {
            return res.status(400).json({ status: "error", message: "Recommendation details must be an array with at least one entry." });
        }

        for (const detail of recommendation_details) {
            if (!detail.reason_for_admission || !detail.preferred_ward) {
                return res.status(400).json({
                    status: "error",
                    message: "Each entry in recommendation details must have reason_for_admission and preferred_ward."
                });
            }
        }
        const admissionID = new mongoose.Types.ObjectId();
        const newAdmission = new Admission({
            admission_id: admissionID,
            patient_id: patient._id,
            doctor_id: doctor._id,
            recommendation_details,
            admission_date: new Date()
        });

        await newAdmission.save();
        return res.status(201).json({
            status: "success",
            message: "Admission initiated.",
            admission_id: newAdmission._id
        });

    } catch (err) {
        console.error("Error during admission initiation:", err);
        return res.status(500).json({ status: "error", message: "Server error.", details: err.message });
    }
});

//above code and below both are right but above accepts recommendation_details array and save array in mongodb where
//below don't accept array but accept object and save object in mongodb

/*router.post('/admissionss/initiate/:patient_id/:doctor_id', async (req, res) => {
    try {
        const { recommendation_details } = req.body;

        // Validate doctor and patient IDs
        const doctor = await Doctor.findById(req.params.doctor_id);
        const patient = await Patient.findById(req.params.patient_id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Validate recommendation_details object
        if (
            !recommendation_details ||
            !recommendation_details.reason_for_admission ||
            !recommendation_details.preferred_ward
        ) {
            return res.status(400).json({
                status: "error",
                message: "Both reason_for_admission and preferred_ward are required in recommendation_details."
            });
        }
        const admissionID = new mongoose.Types.ObjectId();
        const newAdmission = new Admission({
            admission_id: admissionID,
            patient_id: patient._id,
            doctor_id: doctor._id,
            recommendation_details,
            admission_date: new Date()
        });

        await newAdmission.save();
        return res.status(201).json({
            status: "success",
            message: "Admission initiated.",
            admission_id: newAdmission._id
        });

    } catch (err) {
        console.error("Error during admission initiation:", err);
        return res.status(500).json({ status: "error", message: "Server error.", details: err.message });
    }
});*/

// POST /api/rooms/allocate
/*router.post('/rooms/allocate/:admission_id', async (req, res) => {
    try {
        const { ward_type, preferences } = req.body;
        const admission = await Admission.findById(req.params.admission_id);
        if (!admission) {
            return res.status(404).json({ error: 'admission not found' });
        }
        if (!ward_type || !preferences) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in request body."
            });
        }
        const allocatedRoom = new Room({
            admission_id:admission._id,
            ward_type,
            preferences,
            room_number: `R${Math.floor(Math.random() * 1000)}`,
            bed_number: `B${Math.floor(Math.random() * 100)}`
        });
        await allocatedRoom.save();
        await Admission.findByIdAndUpdate(req.params.admission_id, { room_allocation: allocatedRoom._id });

        return res.status(201).json({
            status: "success",
            message: "Room allocated.",
            room_details: {
                room_number: allocatedRoom.room_number,
                bed_number: allocatedRoom.bed_number,
                ward_type: allocatedRoom.ward_type
            }
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});*/
//real below
/*router.post('/rooms/allocate/:admission_id', async (req, res) => {
    try {
        const { ward_type, preferences } = req.body;

        // Validate request parameters
        if (!ward_type || !preferences) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in request body."
            });
        }

        // Check if the admission exists
        const admission = await Admission.findById(req.params.admission_id);
        if (!admission) {
            return res.status(404).json({ error: 'Admission not found' });
        }

        // Generate unique allocation ID
        const allocationId = `RM${Date.now()}`;

        // Create a new room allocation record
        const allocatedRoom = new Room({
            allocation_id: allocationId, // Unique allocation ID
            admission_id: admission._id,
            ward_type,
            preferences,
            room_number: `R${Math.floor(Math.random() * 1000)}`,
            bed_number: `B${Math.floor(Math.random() * 100)}`
        });

        // Save the room allocation
        await allocatedRoom.save();

        // Update the admission with the room allocation reference
        admission.room_allocation = allocatedRoom._id;
        await admission.save();

        // Respond with success
        return res.status(201).json({
            status: "success",
            message: "Room allocated.",
            room_details: {
                room_number: allocatedRoom.room_number,
                bed_number: allocatedRoom.bed_number,
                ward_type: allocatedRoom.ward_type
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});*/
router.post('/rooms/allocate/:admission_id', async (req, res) => {
    try {
        const { ward_type, preferences, room_number, bed_number } = req.body;

        // Validate request parameters
        if (!ward_type || !preferences) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in request body."
            });
        }

        // Check if the admission exists
        const admission = await Admission.findById(req.params.admission_id);
        if (!admission) {
            return res.status(404).json({ error: 'Admission not found' });
        }

        // If manual room_number and bed_number are provided, check availability
     /*   if (room_number && bed_number) {
            const existingRoom = await Room.findOne({ room_number, bed_number });
            if (existingRoom) {
                return res.status(400).json({
                    status: "error",
                    message: `Room ${room_number} and Bed ${bed_number} are already allocated.`,
                });
            }
        }*/
        const existingRoomConflict = await Room.findOne({
            $or: [
                { room_number },
                { bed_number }
            ],
            _id: { $ne: admission.room_allocation } // Exclude the current room allocation if it's being updated
        });

        if (existingRoomConflict) {
            return res.status(400).json({
                status: "error",
                message: `Room ${room_number} or Bed ${bed_number} is already allocated.`
            });
        }
        // Assign random room/bed if not provided manually
        let allocatedRoomNumber = room_number || `R${Math.floor(Math.random() * 1000)}`;
        let allocatedBedNumber = bed_number || `B${Math.floor(Math.random() * 100)}`;

        // Ensure random room/bed combination is not already taken
        while (await Room.exists({ room_number: allocatedRoomNumber, bed_number: allocatedBedNumber })) {
            allocatedRoomNumber = `R${Math.floor(Math.random() * 1000)}`;
            allocatedBedNumber = `B${Math.floor(Math.random() * 100)}`;
        }

        // Generate unique allocation ID
        const allocationId = `RM${Date.now()}`;

        // Create a new room allocation record
        const allocatedRoom = new Room({
            allocation_id: allocationId,
            admission_id: admission._id,
            ward_type,
            preferences,
            room_number: allocatedRoomNumber,
            bed_number: allocatedBedNumber
        });

        // Save the room allocation
        await allocatedRoom.save();

        // Update the admission with the room allocation reference
        admission.room_allocation = allocatedRoom._id;
        await admission.save();

        // Respond with success
        return res.status(201).json({
            status: "success",
            message: "Room allocated successfully.",
            room_details: {
                room_number: allocatedRoom.room_number,
                bed_number: allocatedRoom.bed_number,
                ward_type: allocatedRoom.ward_type
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});

// POST /api/admissions/consent
router.post('/admissions/consent/:admission_id', async (req, res) => {
   

    try {
        const {  documents, consent } = req.body;

        if (!documents?.length || !consent?.signed_by || !consent?.relationship_to_patient || !consent?.date_signed) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in request body."
            })
        }
            const admission = await Admission.findById(req.params.admission_id);
            if (!admission) {
                return res.status(404).json({ error: 'Admission not found' });
            }

            const consentId = `RM${Date.now()}`;

            const consentRecord = await Consent.create({
            consent_id:consentId,
            admission_id: admission._id,
            documents,
            consent
            });
            await consentRecord.save();
            admission.consent = consentRecord._id;
            await admission.save();
       

        return res.status(201).json({
            status: "success",
            message: "Consent forms uploaded.",
            consent_id: consentRecord._id
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});

// POST /api/admissions/assessment
/*router.post('/admissions/assessment/:admission_id/:nurse_id', async (req, res) => {
  
    try {
        const {  vitals, notes  } = req.body;

        if ( !vitals?.temperature || !vitals?.blood_pressure || !vitals?.pulse || !vitals?.respiration_rate ) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in request body."
            });
        }
        const admission = await Admission.findById(req.params.admission_id);
        if (!admission) {
            return res.status(404).json({ error: 'Admission not found' });
        }
        const nurse = await Ipdnurse.findById(req.params.nurse_id);
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }
        const assessmentRecord = await Assessment.create({
            admission_id:admission._id ,
            vitals,
            notes,
            nurse_id:nurse._id,
            assessment_date: new Date()
        });
        await assessmentRecord.save();
        admission.assessments.push(assessmentRecord._id)
        admission.save();
        return res.status(201).json({
            status: "success",
            message: "Initial assessment recorded.",
            assessment_id: assessmentRecord._id
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});*/
router.post('/admissions/assessment/:admission_id/:nurse_id', async (req, res) => {
    try {
        const { vitals, notes } = req.body;

        // Validate required fields
        if (!vitals?.temperature || !vitals?.blood_pressure || !vitals?.pulse || !vitals?.respiration_rate) {
            return res.status(400).json({
                status: "error",
                message: "Missing required fields in request body."
            });
        }

        // Fetch the admission and nurse documents
        const admission = await Admission.findById(req.params.admission_id);
        if (!admission) {
            return res.status(404).json({ error: 'Admission not found' });
        }

        const nurse = await Ipdnurse.findById(req.params.nurse_id);
        if (!nurse) {
            return res.status(404).json({ error: 'Nurse not found' });
        }
        const assessmentId = `RM${Date.now()}`;
        // Create a new assessment record
        const assessmentRecord = await Assessment.create({
            assessment_id: assessmentId,
            admission_id: admission._id,
            vitals,
            notes,
            nurse_id: nurse._id,
            assessment_date: new Date()
        });

        // Push the new assessment's ID to the admission's assessments array and save
        admission.assessments.push(assessmentRecord._id);
        await admission.save();

        return res.status(201).json({
            status: "success",
            message: "Initial assessment recorded.",
            assessment_id: assessmentRecord._id
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});
router.get('/admissions/:admission_id', async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.admission_id)
            .populate('patient_id', 'name age gender') // Fetch patient details
            .populate('doctor_id', 'name specialization') // Fetch doctor details
            .populate('room_allocation', 'room_number bed_number ward_type') // Fetch room details
            .populate('assessments','vitals notes nurse_id') // Fetch assessment details
            .populate('consent', 'documents consent');
        if (!admission) {
            return res.status(404).json({ status: "error", message: "Admission not found." });
        }

        return res.status(200).json({
            status: "success",
            admission
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});
// backend route: /admissions/:admission_id


router.get('/patients/:patient_id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.patient_id);

        if (!patient) {
            return res.status(404).json({ status: "error", message: "Patient not found." });
        }

        return res.status(200).json({
            status: "success",
            patient
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});
router.get('/rooms/:room_id', async (req, res) => {
    try {
        const room = await Room.findById(req.params.room_id).populate('admission_id', 'patient_id doctor_id');

        if (!room) {
            return res.status(404).json({ status: "error", message: "Room not found." });
        }

        return res.status(200).json({
            status: "success",
            room
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});
/*router.get('/admissions/:admission_id/consent', async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.admission_id).populate('consent', 'documents consent');

        if (!admission || !admission.consent) {
            return res.status(404).json({ status: "error", message: "Consent details not found for this admission." });
        }

        return res.status(200).json({
            status: "success",
            consent: admission.consent
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});*/
router.get('/admissions/:admission_id/consent', async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.admission_id).populate('consent', 'documents consent');

        if (!admission) {
            return res.status(404).json({ status: "error", message: "Admission not found." });
        }

        return res.status(200).json({
            status: "success",
            admission: {
                _id: admission._id,
                consent: admission.consent
            }
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});


router.get('/admissions/:admission_id/assessments', async (req, res) => {
    try {
        const admission = await Admission.findById(req.params.admission_id).populate('assessments');

        if (!admission || admission.assessments.length === 0) {
            return res.status(404).json({ status: "error", message: "No assessments found for this admission." });
        }

        return res.status(200).json({
            status: "success",
            assessments: admission.assessments
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});
router.get('/patients/:patient_id/admissions', async (req, res) => {
    try {
        // Find all admissions for the given patient_id
        const admissions = await Admission.find({ patient_id: req.params.patient_id })
            .populate('doctor_id', 'name specialization') // Populate doctor details
            .populate('room_allocation', 'room_number bed_number ward_type') // Populate room allocation details
            .populate('assessments', 'vitals notes nurse_id') // Populate assessments
            .populate('consent', 'documents consent'); // Populate consent details

        if (!admissions || admissions.length === 0) {
            return res.status(404).json({ status: "error", message: "No admissions found for this patient." });
        }

        return res.status(200).json({
            status: "success",
            admissions
        });
    } catch (err) {
        return res.status(500).json({ status: "error", message: "Database error.", details: err.message });
    }
});
router.put('/patients/:patient_id/admissions/:admission_id', async (req, res) => {
    try {
        const { patient_id, admission_id } = req.params;

        // Check if the admission belongs to the given patient
        const admission = await Admission.findOne({ _id: admission_id, patient_id });
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found for the given patient."
            });
        }

        // Update admission details using the request body
        const updatedAdmission = await Admission.findByIdAndUpdate(
            admission_id,
            { $set: req.body }, // Updates only the provided fields
            { new: true } // Returns the updated document
        )
            .populate('doctor_id', 'name specialization') // Populate doctor details
            .populate('room_allocation', 'room_number bed_number ward_type') // Populate room details
            .populate('assessments') // Populate assessments
            .populate('consent'); // Populate consent

        return res.status(200).json({
            status: "success",
            message: "Admission details updated successfully.",
            admission: updatedAdmission
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});




router.put('/patientss/:patient_id/admissions/:admission_id', async (req, res) => {
    try {
        const { patient_id, admission_id } = req.params;

        // Validate if the admission exists and belongs to the given patient
        const admission = await Admission.findOne({ _id: admission_id, patient_id });
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found for the given patient."
            });
        }

        const { room_allocation, consent, assessments } = req.body;

        // Update Room Allocation (if provided)
        if (room_allocation && admission.room_allocation) {
            const existingRoom = await Room.findById(admission.room_allocation);

            const updatedRoom = await Room.findByIdAndUpdate(
                admission.room_allocation,
                {
                    $set: {
                        ward_type: room_allocation.ward_type || existingRoom.ward_type,
                        preferences: {
                            private_room: room_allocation.preferences?.private_room ?? existingRoom.preferences.private_room,
                            floor_preference: room_allocation.preferences?.floor_preference ?? existingRoom.preferences.floor_preference
                        },
                        bed_number: room_allocation.bed_number || existingRoom.bed_number,
                        room_number: room_allocation.room_number || existingRoom.room_number
                    }
                },
                { new: true }
            );
        }

        // Update Consent (if provided)
        if (consent && admission.consent) {
            const existingConsent = await Consent.findById(admission.consent);

            const updatedConsent = await Consent.findByIdAndUpdate(
                admission.consent,
                {
                    $set: {
                        documents: consent.documents?.map((doc, index) => ({
                            type: doc.type || existingConsent.documents[index]?.type,
                            url: doc.url || existingConsent.documents[index]?.url
                        })) || existingConsent.documents,
                        consent: {
                            signed_by: consent.signed_by || existingConsent.consent.signed_by,
                            relationship_to_patient: consent.relationship_to_patient || existingConsent.consent.relationship_to_patient,
                            date_signed: consent.date_signed || existingConsent.consent.date_signed
                        }
                    }
                },
                { new: true }
            );
        }

        // Update Assessments (if provided)
        if (assessments && admission.assessments.length > 0) {
            for (let i = 0; i < assessments.length; i++) {
                const assessment = assessments[i];
                if (admission.assessments[i]) {
                    const existingAssessment = await Assessment.findById(admission.assessments[i]);

                    await Assessment.findByIdAndUpdate(
                        admission.assessments[i],
                        {
                            $set: {
                                vitals: {
                                    temperature: assessment.vitals?.temperature ?? existingAssessment.vitals.temperature,
                                    blood_pressure: assessment.vitals?.blood_pressure ?? existingAssessment.vitals.blood_pressure,
                                    pulse: assessment.vitals?.pulse ?? existingAssessment.vitals.pulse,
                                    respiration_rate: assessment.vitals?.respiration_rate ?? existingAssessment.vitals.respiration_rate
                                },
                                notes: assessment.notes || existingAssessment.notes,
                                nurse_id: assessment.nurse_id || existingAssessment.nurse_id,
                                assessment_date: assessment.assessment_date || existingAssessment.assessment_date
                            }
                        },
                        { new: true }
                    );
                }
            }
        }

        // Fetch and return the updated Admission details
        const updatedAdmission = await Admission.findById(admission_id)
            .populate('patient_id', 'name')
            .populate('doctor_id', 'name specialization') // Populate doctor details
            .populate('room_allocation', 'room_number bed_number ward_type preferences') // Populate room details
            .populate('assessments') // Populate assessments
            .populate('consent'); // Populate consent

        return res.status(200).json({
            status: "success",
            message: "Admission details updated successfully.",
            admission: updatedAdmission
        });
    } catch (err) {
        console.error("Error updating admission:", err); // Log error for debugging
        return res.status(500).json({
            status: "error",
            message: "An error occurred during the update process.",
            details: err.message // Include error details for better debugging
        });
    }
});
//below is perfect for frontend 
router.put('/patientsss/:patient_id/admissions/:admission_id', async (req, res) => {
    try {
        const { patient_id, admission_id } = req.params;

        // Validate if the admission exists and belongs to the given patient
        const admission = await Admission.findOne({ _id: admission_id, patient_id });
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found for the given patient."
            });
        }

        const {  consent  } = req.body;

     

        // Update Consent (if provided)
        if (consent && admission.consent) {
            const existingConsent = await Consent.findById(admission.consent);

            const updatedConsent = await Consent.findByIdAndUpdate(
                admission.consent,
                {
                    $set: {
                        documents: consent.documents?.map((doc, index) => ({
                            type: doc.type || existingConsent.documents[index]?.type,
                            url: doc.url || existingConsent.documents[index]?.url
                        })) || existingConsent.documents,
                        consent: {
                            signed_by: consent.signed_by || existingConsent.consent.signed_by,
                            relationship_to_patient: consent.relationship_to_patient || existingConsent.consent.relationship_to_patient,
                            date_signed: consent.date_signed || existingConsent.consent.date_signed
                        }
                    }
                },
                { new: true }
            );
        }

       


        // Fetch and return the updated Admission details
        const updatedAdmission = await Admission.findById(admission_id).populate('consent');
           

        return res.status(200).json({
            status: "success",
            message: "Admission details updated successfully.",
            admission: updatedAdmission
        });
    } catch (err) {
        console.error("Error updating admission:", err); // Log error for debugging
        return res.status(500).json({
            status: "error",
            message: "An error occurred during the update process.",
            details: err.message // Include error details for better debugging
        });
    }
});







router.put('/admissions/:admission_id/consent', async (req, res) => {
    try {
        const { admission_id } = req.params;
        const { consent_id, consentDetails, documents } = req.body;

        if (!consentDetails || !consentDetails.signed_by || !consentDetails.date_signed) {
            return res.status(400).json({
                status: "error",
                message: "Consent details with 'signed_by' and 'date_signed' are required."
            });
        }

        // Find the admission by ID
        const admission = await Admission.findById(admission_id);
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found."
            });
        }

        let consent;

        // If a consent reference exists, update the existing consent record
        if (admission.consent) {
            consent = await Consent.findByIdAndUpdate(
                admission.consent,
                {
                    $set: {
                        consent: consentDetails,
                        documents: documents || [] // Update or keep documents
                    }
                },
                { new: true } // Return the updated document
            );
        } else {
            // Create a new consent record if one doesn't exist
            consent = new Consent({
                consent_id: consent_id || `C-${Date.now()}`, // Generate unique consent_id if not provided
                admission_id,
                consent: consentDetails,
                documents: documents || []
            });

            await consent.save();

            // Link the new consent record to the admission
            admission.consent = consent._id;
            await admission.save();
        }

        return res.status(200).json({
            status: "success",
            message: "Consent details updated successfully.",
            consent
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});
//above is not perfect for frontend
/*
router.put('/admissions/:admission_id/consent', async (req, res) => {
    try {
        const { admission_id } = req.params;
        const { consentDetails, documents } = req.body;

        if (!consentDetails || !consentDetails.signed_by || !consentDetails.date_signed) {
            return res.status(400).json({
                status: "error",
                message: "Consent details with 'signed_by' and 'date_signed' are required."
            });
        }

        const admission = await Admission.findById(admission_id);
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found."
            });
        }

        let consent;

        if (admission.consent) {
            // Update the existing consent document and replace the documents array
            consent = await Consent.findByIdAndUpdate(
                admission.consent,
                {
                    $set: {
                        consent: consentDetails,
                        documents: documents, // Replace the documents array completely
                    },
                },
                { new: true } // Return the updated document
            );
        } else {
            // Create a new consent document if none exists
            consent = new Consent({
                consent_id: `C-${Date.now()}`,
                admission_id,
                consent: consentDetails,
                documents: documents || [],
            });

            await consent.save();

            admission.consent = consent._id;
            await admission.save();
        }

        return res.status(200).json({
            status: "success",
            message: "Consent details updated successfully.",
            consent,
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message,
        });
    }
});
*/


router.put('/admissionsss/:admission_id/room', async (req, res) => {
    try {
        const { admission_id } = req.params;
        const { allocation_id, preferenceDetails, ward_type, room_number, bed_number } = req.body;

        // Validate the input
        if (!ward_type || !room_number || !bed_number) {
            return res.status(400).json({
                status: "error",
                message: "All room details (ward_type, room_number, bed_number) are required."
            });
        }

        const admission = await Admission.findById(admission_id);
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found."
            });
        }

        // Check if room_number or bed_number are already in use independently
        const existingRoomConflict = await Room.findOne({
            $or: [
                { room_number },
                { bed_number }
            ],
            _id: { $ne: admission.room_allocation } // Exclude the current room allocation if it's being updated
        });

        if (existingRoomConflict) {
            return res.status(400).json({
                status: "error",
                message: `Room ${room_number} or Bed ${bed_number} is already allocated.`
            });
        }

        let room;

        // Check if a room allocation already exists
        if (admission.room_allocation) {
            room = await Room.findByIdAndUpdate(
                admission.room_allocation._id,
                {
                    $set: {
                        allocation_id: allocation_id || admission.room_allocation.allocation_id,
                        preferences: preferenceDetails || admission.room_allocation.preferences,
                        ward_type,
                        room_number,
                        bed_number
                    }
                },
                { new: true }
            );
        } else {
            // Create a new room record if none exists
            room = new Room({
                allocation_id: allocation_id || `R-${Date.now()}`,
                admission_id,
                preferences: preferenceDetails || {},
                ward_type,
                room_number,
                bed_number
            });

            await room.save();
            // Link the new room allocation to the admission
            admission.room_allocation = room._id;
            await admission.save();
        }

        // Re-fetch the admission to populate the updated room allocation
        const updatedAdmission = await Admission.findById(admission_id).populate({
            path: 'room_allocation',
            select: 'ward_type room_number bed_number preferences'
        });

        return res.status(200).json({
            status: "success",
            message: "Room details updated successfully.",
            room: updatedAdmission.room_allocation
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});

//both above and below code are right, below code infos are fetched by populated and above is not
router.put('/admissionss/:admission_id/room', async (req, res) => {
    try {
        const { admission_id } = req.params;
        const { allocation_id, preferenceDetails, ward_type, room_number, bed_number } = req.body;

        // Validate the input
        if (!ward_type || !room_number || !bed_number) {
            return res.status(400).json({
                status: "error",
                message: "All room details (ward_type, room_number, bed_number) are required."
            });
        }

        // Find the admission by ID and populate the room_allocation field
        const admission = await Admission.findById(admission_id).populate('room_allocation');
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found."
            });
        }

        let room;

        // Check if a room allocation already exists
        if (admission.room_allocation) {
            room = await Room.findByIdAndUpdate(
                admission.room_allocation._id,
                {
                    $set: {
                        allocation_id: allocation_id || admission.room_allocation.allocation_id,
                        preferences: preferenceDetails || admission.room_allocation.preferences,
                        ward_type,
                        room_number,
                        bed_number
                    }
                },
                { new: true }
            );
        } else {
            // Create a new room record if none exists
            room = new Room({
                allocation_id: allocation_id || `R-${Date.now()}`,
                admission_id,
                preferences: preferenceDetails || {},
                ward_type,
                room_number,
                bed_number
            });

            await room.save();
            // Link the new room allocation to the admission
            admission.room_allocation = room._id;
            await admission.save();
        }

        // Re-fetch the admission to populate the updated room allocation
       /* const updatedAdmission = await Admission.findById(admission_id).populate(
            'room_allocation',
           'ward_type bed_number' // Populate only ward_type and bed_number
        );*/
        //above and below both are right 
        const updatedAdmission = await Admission.findById(admission_id).populate({
            path: 'room_allocation',
            select: 'ward_type bed_number' // Populate only ward_type and bed_number
        });

        return res.status(200).json({
            status: "success",
            message: "Room details updated successfully.",
            room: updatedAdmission.room_allocation // Only ward_type and bed_number are populated
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});
/*
router.put('/admissions/:admission_id/assessment', async (req, res) => {
    try {
        const { admission_id } = req.params;
        const { assessment_id, vitals, notes, assessment_date   } = req.body;

        // Validate the input
        if (!vitals || !vitals.temperature || !vitals.blood_pressure || !vitals.pulse || !vitals.respiration_rate || !notes ) {
            return res.status(400).json({
                status: "error",
                message: "All room details (ward_type, room_number, bed_number) are required."
            });
        }      
        const admission = await Admission.findById(admission_id);
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found."
            });
        }

        let room;

        // If a room allocation reference exists, update the existing room record
        if (admission.assessments) {
            assessment = await Assessment.findByIdAndUpdate(
                admission.assessments,
                {
                    $set: {
                     assessment_id:assessment_id,
                       vitals:vitals,
                        notes,
                        assessment_date
                    }
                },
                { new: true } // Return the updated document
            );

            if (!room) {
                return res.status(404).json({
                    status: "error",
                    message: "Room allocation not found."
                });
            }
        } else {
            // Create a new room record if none exists
            assessment = new Assessment({
                assessment_id:assessment_id || `R-${Date.now()}`, // Generate unique allocation_id if not provided
                admission_id,
                preferences: preferenceDetails || {},
                ward_type,
                room_number,
                bed_number
            });

            await room.save();

            // Link the new room allocation to the admission
            admission.assessments = assessment._id;
            await admission.save();
        }

        return res.status(200).json({
            status: "success",
            message: "Room details updated successfully.",
            room: {
                notes:assessment.notes,
            }
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});
*/

const mongoose = require('mongoose');

router.put('/admissions/:admission_id/assessments/:assessment_id', async (req, res) => {
    try {
        const { admission_id, assessment_id } = req.params;

        // Validate and convert IDs to ObjectId
        if (!mongoose.Types.ObjectId.isValid(admission_id) || !mongoose.Types.ObjectId.isValid(assessment_id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid admission_id or assessment_id format."
            });
        }

        const admissionObjectId =new mongoose.Types.ObjectId(admission_id);
        const assessmentObjectId =new mongoose.Types.ObjectId(assessment_id);

        // Find the admission to ensure it exists
        const admission = await Admission.findById(admissionObjectId);
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found."
            });
        }

        // Check if the assessment exists and is linked to the admission
        const assessment = await Assessment.findOne({
            _id: assessmentObjectId,
            admission_id: admissionObjectId
        });
        if (!assessment) {
            return res.status(404).json({
                status: "error",
                message: "Assessment not found for this admission."
            });
        }

        // Update the assessment with new data from the request body
        const updatedAssessment = await Assessment.findByIdAndUpdate(
            assessmentObjectId,
            { $set: req.body }, // Update fields sent in the request body
            { new: true } // Return the updated document
        );
        const updatedAdmission = await Admission.findById(admission_id)

            .populate('assessments');
            
      /*  const updatedAdmission = await Admission.findById(admission_id).populate(
           'assessments',
             'vitals' // Populate only ward_type and bed_number
        ).populate('assessments','notes');*/
        return res.status(200).json({
            status: "success",
            message: "Assessment updated successfully.",
            assessment: {
                vitals: updatedAssessment.vitals,
                notes: updatedAssessment.notes,
                assessment_date: updatedAssessment.assessment_date,
                
            },
            admission: updatedAdmission
        });
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});
//above code and below code produce same output just below has populate system
router.put('/admissionss/:admission_id/assessments/:assessment_id', async (req, res) => {
    try {
        const { admission_id, assessment_id } = req.params;

        // Validate and convert IDs to ObjectId
        if (!mongoose.Types.ObjectId.isValid(admission_id) || !mongoose.Types.ObjectId.isValid(assessment_id)) {
            return res.status(400).json({
                status: "error",
                message: "Invalid admission_id or assessment_id format."
            });
        }

        const admissionObjectId = new mongoose.Types.ObjectId(admission_id);
        const assessmentObjectId = new mongoose.Types.ObjectId(assessment_id);

        // Find the admission to ensure it exists
        const admission = await Admission.findById(admissionObjectId);
        if (!admission) {
            return res.status(404).json({
                status: "error",
                message: "Admission not found."
            });
        }

        // Check if the assessment exists and is linked to the admission
        const assessment = await Assessment.findOne({
            _id: assessmentObjectId,
            admission_id: admissionObjectId
        });
        if (!assessment) {
            return res.status(404).json({
                status: "error",
                message: "Assessment not found for this admission."
            });
        }

        // Update the assessment with new data from the request body
        const updatedAssessment = await Assessment.findByIdAndUpdate(
            assessmentObjectId,
            { $set: req.body }, // Update fields sent in the request body
            { new: true } // Return the updated document
        ).select('vitals notes assessment_date');

        
       
        return res.status(200).json({
            status: "success",
            message: "Assessment updated successfully.",
            assessment: updatedAssessment
        });
/*
        const updatedAdmission = await Admission.findById(admission_id).populate({
            path: 'assessments',
            select: 'vitals notes assessment_date'
        });

        return res.status(200).json({
            status: "success",
            message: "Assessment updated successfully.",
            assessment: updatedAdmission.assessments
        });*/
 //this comment out system gives all the assessments details of vitals notes assessment_date from assessments array but uncomment system gives just the
 //updated details
    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: "Database error.",
            details: err.message
        });
    }
});
/**
 * Get all patients
 * - Fetch all patient records
 */
router.get('/patients', async (req, res) => {
    try {
        const patients = await Patient.find()
            .populate({ path: 'doctor', model: 'Doctor', select: 'name' }); // Ensure the model name is correct
           

        if (patients.length === 0) {
            return res.status(404).json({ success: false, message: 'No patients found' });
        }

        res.status(200).json({ success: true, data: patients });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching patients', error: err.message });
    }
});


/**
 * Get statistics: Count of patients by gender
 */
router.get('/statistics/gender', async (req, res) => {
    try {
        const genderStats = await Patient.aggregate([
            { $group: { _id: '$gender', count: { $sum: 1 } } }
        ]);
        res.status(200).json({ success: true, data: genderStats });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching gender statistics', error: err.message });
    }
});

/**
 * Get statistics: Active patients by doctor
 */
router.get('/statistics/doctor', async (req, res) => {
    try {
        const doctorStats = await Patient.aggregate([
            { $group: { _id: '$doctor', count: { $sum: 1 } } },
            { $lookup: { from: 'realusers', localField: '_id', foreignField: '_id', as: 'doctorDetails' } }
        ]);
        res.status(200).json({ success: true, data: doctorStats });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error fetching doctor statistics', error: err.message });
    }
});

router.put('/patients/:id/discharge', async (req, res) => {
    try {
        const { discharge_records, dischargeStatus } = req.body;
        const updatedPatient = await Patient.findByIdAndUpdate(
            req.params.id,
            {
                $set: { dischargeStatus },
                $push: { discharge_records }
            },
            { new: true }
        );
        if (!updatedPatient) {
            return res.status(404).json({ success: false, message: 'Patient not found' });
        }
        res.status(200).json({ success: true, data: updatedPatient });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error updating discharge status', error: err.message });
    }
});


router.get('/reports/nurse-tasks', async (req, res) => {
    try {
        const tasks = await Patient.aggregate([
            { $unwind: '$assignedTasks' },
            { $group: { _id: '$assignedTasks.nurse', tasks: { $push: '$assignedTasks' } } },
            { $lookup: { from: 'ipdnurses', localField: '_id', foreignField: '_id', as: 'nurseDetails' } }
        ]);
        res.status(200).json({ success: true, data: tasks });
    } catch (err) {
        res.status(500).json({ success: false, message: 'Error generating nurse task report', error: err.message });
    }
});


// 1. Get Total Count of Patients
router.get('/report/patients/count', async (req, res) => {
    try {
        const count = await Patient.countDocuments();
        res.json({ totalPatients: count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get patient count' });
    }
});

// 2. Get Doctors by Specialization
router.get('/report/doctors/specialization', async (req, res) => {
    try {
        const doctorsBySpecialization = await Doctor.aggregate([
            {
                $group: {
                    _id: "$specialization",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(doctorsBySpecialization);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get doctors by specialization' });
    }
});

// 3. Get Nurses by Shifts
router.get('/report/nurses/shifts', async (req, res) => {
    try {
        const nursesByShifts = await Ipdnurse.aggregate([
            {
                $group: {
                    _id: "$shifts",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(nursesByShifts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get nurses by shifts' });
    }
});

// 4. Get Active vs Discharged Patients
router.get('/report/patients/status', async (req, res) => {
    try {
        const statusReport = await Patient.aggregate([
            {
                $group: {
                    _id: "$dischargeStatus", //"$dischargeStatus.pending"
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(statusReport);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get patient status report' });
    }
});

// 5. Get Task Statistics for Nurses
router.get('/report/nurses/tasks/status', async (req, res) => {
    try {
        const taskStats = await Ipdnurse.aggregate([
            { $unwind: "$tasksAssigned" },
            {
                $group: {
                    _id: "$tasksAssigned.status",//pending or completed
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(taskStats);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get task statistics' });
    }
});

// 6. Get Admissions Per Month


// 7. Doctors' Patient Count Report
router.get('/report/doctors/patients/count', async (req, res) => {
    try {
        const doctorPatientCount = await Doctor.aggregate([
            { $unwind: "$patients" },
            {
                $group: {
                    _id: "$name",
                    patientCount: { $sum: 1 }
                }
            }
        ]);
        res.json(doctorPatientCount);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get doctor patient count' });
    }
});



// 8. Get Doctors by Department
router.get('/report/doctors/department', async (req, res) => {
    try {
        const doctorsByDepartment = await Doctor.aggregate([
            {
                $group: {
                    _id: "$department",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(doctorsByDepartment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get doctors by department' });
    }
});

// 9. Get Patients by Age Group
router.get('/report/patients/age-group', async (req, res) => {
    try {
        const ageGroupReport = await Patient.aggregate([
            {
                $bucket: {
                    groupBy: "$age",
                    boundaries: [0, 18, 30, 45, 60, 75, 100],
                    default: "75+",
                    output: {
                        count: { $sum: 1 }
                    }
                }
            }
        ]);
        res.json(ageGroupReport);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get patients by age group' });
    }
});

// 10. Get Total Appointments by Doctor

router.get('/report/doctors/appointments/count', async (req, res) => {
   
    try {
        const count = await Patient.countDocuments({ doctor: { $ne: null } });
        const appointmentsByDoctor = await Patient.aggregate([
            { $match: { doctor: { $exists: true } } },//jesob patient er doctor:id ase oder count hobe
            {
                $group: {
                    _id: "$doctor",
                    appointmentCount: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: "realusers",
                    localField: "_id",
                    foreignField: "_id",
                    as: "doctorDetails"//doctor name bair korbo
                }
            }
        ]);
        res.json({ count, appointmentsByDoctor });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get appointments by doctor' });
    }
});


// Route to get patients with their associated doctor's name and count them
router.get('/patients-with-doctors', async (req, res) => {
    try {
        // Count the number of patients who have a doctor assigned
        const count = await Patient.countDocuments({ doctor: { $ne: null } });

        // Find patients with a populated doctor reference
        const patients = await Patient.find({ doctor: { $ne: null } })
            .populate('doctor', 'name') // Populate only the 'name' field of the doctor
            .select('name age gender doctor'); // Selecting specific fields

        // Check if no patients are found
        if (count === 0) {
            return res.status(404).json({ message: 'No patients with doctors found.' });
        }

        // Respond with the list of patients and the count
        res.status(200).json({
            count,
            patients
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});






// 11. Get Emergency Contact Counts
router.get('/report/patients/emergency-contacts/count', async (req, res) => {
    try {
        const emergencyContacts = await Patient.countDocuments({ emergency_contact: { $exists: true } });
        res.json({ totalEmergencyContacts: emergencyContacts });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get emergency contacts count' });
    }
});

// 12. Get Doctors with Recently Registered Status
router.get('/report/doctors/recently-registered', async (req, res) => {
    try {
        const recentDoctors = await Doctor.find({ recentlyRegistered: true });
        res.json(recentDoctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get recently registered doctors' });
    }
});

// 13. Get Nurses by Experience Level
router.get('/report/nurses/experience', async (req, res) => {
    try {
        const experienceLevels = await Ipdnurse.aggregate([
            {
                $group: {
                    _id: { $round: "$experience" },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(experienceLevels);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get nurse experience levels' });
    }
});

// 14. Get Overdue Tasks by Nurse
router.get('/report/nurses/tasks/overdue', async (req, res) => {
    try {
        const overdueTasks = await Ipdnurse.aggregate([
            { $unwind: "$tasksAssigned" },
            { $match: { "tasksAssigned.status": "Pending", "tasksAssigned.scheduled_time": { $lt: new Date() } } },
            {
                $group: {
                    _id: "$name",
                    overdueTasks: { $sum: 1 }
                }
            }
        ]);
        res.json(overdueTasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get overdue tasks by nurse' });
    }
});

// 15. Get Patients with Pending Discharges
router.get('/report/patients/discharge/pending', async (req, res) => {
    try {
        const pendingDischarges = await Patient.find({ dischargeStatus: "Pending" });
        res.json(pendingDischarges);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get pending discharges' });
    }
});

// 16. Get Admission History of a Patient by ID
router.get('/report/patient/:id/admissions', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).select('admission_history');
        res.json(patient.admission_history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get admission history' });
    }
});

// 17. Get Total Number of Nurses
router.get('/report/nurses/count', async (req, res) => {
    try {
        const count = await Ipdnurse.countDocuments();
        res.json({ totalNurses: count });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get nurse count' });
    }
});

// 18. Get Discharge Records by Patient ID
router.get('/report/patient/:id/discharge-records', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).select('discharge_records');
        res.json(patient.discharge_records);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get discharge records' });
    }
});

// 19. Get Current Admissions per Ward
router.get('/report/wards/admissions', async (req, res) => {
    try {
        const wardAdmissions = await Patient.aggregate([
            { $unwind: "$admission_history" },
            { $match: { "admission_history.discharged_on": null } },
            {
                $group: {
                    _id: "$admission_history.ward_type",
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(wardAdmissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get current admissions per ward' });
    }
});

// 20. Get Average Age of Patients
router.get('/report/patients/average-age', async (req, res) => {
    try {
        const avgAge = await Patient.aggregate([
            {
                $group: {
                    _id: null,
                    averageAge: { $avg: "$age" }
                }
            }
        ]);
        res.json(avgAge);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get average age' });
    }
});

// 21. Get Patient Admissions by Year
router.get('/report/patients/admissions/yearly', async (req, res) => {
    try {
        const yearlyAdmissions = await Patient.aggregate([
            { $unwind: "$admission_history" },
            {
                $group: {
                    _id: { $year: "$admission_history.admitted_on" },
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(yearlyAdmissions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get yearly admissions' });
    }
});

// 22. Get Doctors with No Assigned Patients
router.get('/report/doctors/no-patients', async (req, res) => {
    try {
        const doctors = await Doctor.find({ patients: { $size: 0 } });
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get doctors with no assigned patients' });
    }
});

// 23. Get Upcoming Tasks for Nurses
router.get('/report/nurses/tasks/upcoming', async (req, res) => {
    try {
        const upcomingTasks = await Ipdnurse.aggregate([
            { $unwind: "$tasksAssigned" },
            { $match: { "tasksAssigned.scheduled_time": { $gte: new Date() } } },
            {
                $group: {
                    _id: "$name",
                    tasks: { $push: "$tasksAssigned" }
                }
            }
        ]);
        res.json(upcomingTasks);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get upcoming tasks' });
    }
});

router.get('/doctors/patient-count', async (req, res) => {
    try {
        const result = await Doctor.aggregate([
            { $lookup: { from: 'patients', localField: '_id', foreignField: 'doctor', as: 'patients' } },
            { $project: { name: 1, totalPatients: { $size: '$patients' } } }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/appointments/count-by-date', async (req, res) => {
    try {
        const result = await Appointment.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }, count: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.get('/appointments/upcoming-week', async (req, res) => {
    try {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);
        const appointments = await Appointment.find({ date: { $gte: today, $lt: nextWeek } })
            .populate('doctor', 'name')
            .populate('patient', 'name');
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});





router.get('/appointments/completed-count-per-doctor', async (req, res) => {
    try {
        const result = await Appointment.aggregate([
           //pending patients
            { $group: { _id: "$doctor", completedAppointments: { $sum: 1 } } },
            { $lookup: { from: 'doctors', localField: '_id', foreignField: '_id', as: 'doctorInfo' } },
            { $unwind: "$doctorInfo" },
            { $project: { "doctorInfo.name": 1, completedAppointments: 1 } }
        ]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/admiss',   async (req, res) => {
    //nurse role
    const allDoctors = await Admission.find();
    return res.status(200).json(allDoctors);
});
router.get('/roo', async (req, res) => {
    //nurse role
    const allDoctors = await Room.find();
    return res.status(200).json(allDoctors);
});
router.get('/ass', async (req, res) => {
    //nurse role
    const allDoctors = await Assessment.find();
    return res.status(200).json(allDoctors);
});

module.exports = router;


