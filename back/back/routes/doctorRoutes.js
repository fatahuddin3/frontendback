/*const express = require('express');
const   createDoctor = require('../controllers/doctorController');
const router = express.Router();

*//*router.get('/', getAllDoctors);*//*
router.post('/', createDoctor);

module.exports = router;*/
/*const Doctor = require('../models/Doctor');
const express = require('express');
const router = express.Router();

router.post('/',async (req, res) => {
    // Your logic here
    const { name, specialization, phone, email } = req.body;
    const newDoctor = await Doctor.create({ name, specialization, phone, email });
    return res.status(201).json(newDoctor);
});
router.get('/', async (req, res) => {
    const alluser = await Doctor.find().select(["-__v"]);
    return res.status(200).json(alluser);
});
router.delete('/:email', async (req, res) => {
    const { email } = req.params;
    const user = await Doctor.findOne({ email: email });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    await Doctor.deleteOne({ email: email });

    return res.status(200).json({ message: "User deleted" });
});
router.put('/:email', async (req, res) => {
    const { email } = req.params;
    const { name: newName, email: newEmail, } = req.body;
    const user = await Doctor.findOne({ email });
    console.log(user);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    const anotherUser = await Doctor.findOne({ email: newEmail });
    if (anotherUser && anotherUser.id !== user.id) {
        return res.status(400).json({ error: "Email is already used" });
    }
    user.email = newEmail;
    user.name = newName;
    user.save(); *//*await user.save(); also applicable for better performance*//*
    return res.status(200).json({ message: "User updated" });
});
module.exports = router;
*//*const newUsers = Doctor.filter((doc) => doc.email !== email);*//*
*/
//original code below
/*const express = require('express');
const Doctor = require('../models/Doctor');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Register a new doctor
router.post('/register', async (req, res) => {
    const { name, specialization, phone, email, password } = req.body;

    // Check if user exists
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
        return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Create new doctor
    const doctor = await Doctor.create({
        name,
        specialization,
        phone,
        email,
        password
    });

    if (doctor) {
        return res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            token: generateToken(doctor._id)
        });
    } else {
        return res.status(400).json({ message: 'Invalid doctor data' });
    }
});

// Doctor login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (doctor && (await doctor.matchPassword(password))) {
        return res.status(200).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            token: generateToken(doctor._id)
        });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

// Get all users (protected)
router.get('/', authMiddleware, async (req, res) => {
    const allDoctors = await Doctor.find().select(['-password', '-__v']);
    return res.status(200).json(allDoctors);
});

// Delete user (protected)
router.delete('/:email', authMiddleware, async (req, res) => {
    const { email } = req.params;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
        return res.status(404).json({ error: 'User not found' });
    }

    await Doctor.deleteOne({ email });

    return res.status(200).json({ message: 'Doctor deleted' });
});
router.put('/:email', authMiddleware, async (req, res) => {
    const { email } = req.params;
    const { name: newName, email: newEmail } = req.body;

    try {
        const user = await Doctor.findOne({ email });
        

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const anotherUser = await Doctor.findOne({ email: newEmail });
        if (anotherUser && anotherUser.id !== user.id) {
            return res.status(400).json({ error: "Email is already used" });
        }

        // Update user details
        user.email = newEmail;
        user.name = newName;
        await user.save();  // Saving the updated user

        return res.status(200).json({ message: "User updated" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});
module.exports = router;*/

const express = require('express');
const Doctor = require('../models/Doctor');
const Report = require('../models/Report');
const Appointment = require('../models/Appointment');
const { protect } = require('../middlewares/protected');
// Import Report model
const jwt = require('jsonwebtoken');
/*const authMiddleware = require('../middlewares/authMiddleware');*/
const router = express.Router();
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '200d',
    });
};
// Helper function to increment report data
const incrementReportField = async (field) => {
    let report = await Report.findOne();
    if (!report) {
        report = new Report();
    }
    report[field] += 1;
    await report.save();
};
router.get('/',  /*authMiddleware*/ async (req, res) => {
    //nurse role
    const allDoctors = await Doctor.find().select(['-password', '-__v']);
    return res.status(200).json(allDoctors);
});
router.get('/doctors-with-appointments', protect, /*authMiddleware*/ async (req, res) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied: Nurse only.' });
    }
    try {
        // Find doctors that have appointments
        const doctorsWithAppointments = await Appointment.aggregate([
            { $group: { _id: "$doctor" } },  // Group by doctor ID
            {
                $lookup: {
                    from: "doctors",  // Join with the doctors collection
                    localField: "_id",  // doctor ID from appointments
                    foreignField: "_id",  // doctor ID from doctors
                    as: "doctorDetails"  // result as doctorDetails
                }
            },
            { $unwind: "$doctorDetails" },  // Unwind to flatten the doctor details
            {
                $project: {
                    _id: 0,  // Exclude the original ID
                    "doctorDetails._id": 1,
                    "doctorDetails.name": 1,
                    "doctorDetails.specialization": 1
                }
            }
        ]);

        if (!doctorsWithAppointments.length) {
            return res.status(404).json({ message: 'No doctors with appointments found' });
        }

        return res.status(200).json(doctorsWithAppointments.map(doc => doc.doctorDetails));
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Fetch distinct specializations
router.get('/specializations', protect, async (req, res) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied: Nurse only.' });
    }
    try {
        const specializations = await Doctor.distinct('specialization');
        return res.status(200).json(specializations);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Fetch doctors based on specialization
router.get('/doctors-by-specialization/:specialization', /*authMiddleware*/ async (req, res) => {
    const { specialization } = req.params;

    try {
        const doctors = await Doctor.find({ specialization })
            .select(['_id', 'name', 'specialization']);
        return res.status(200).json(doctors);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});
// Fetch doctors with appointments, optionally filtered by specialization
/*router.get('/doctors-with-appointmentss', authMiddleware, async (req, res) => {
    const { specialization } = req.query;  // Optional specialization query parameter

    try {
        const matchCondition = specialization ? { "doctorDetails.specialization": specialization } : {};

        const doctorsWithAppointments = await Appointment.aggregate([
            { $group: { _id: "$doctor" } },  // Group by doctor ID
            {
                $lookup: {
                    from: "doctors",  // Join with the doctors collection
                    localField: "_id",  // doctor ID from appointments
                    foreignField: "_id",  // doctor ID from doctors
                    as: "doctorDetails"
                }
            },
            { $unwind: "$doctorDetails" },  // Flatten doctor details
            { $match: matchCondition },  // Apply optional specialization filter to doctorDetails
            {
                $project: {
                    _id: 0,
                    "doctorDetails._id": 1,
                    "doctorDetails.name": 1,
                    "doctorDetails.specialization": 1
                }
            }
        ]);

        if (!doctorsWithAppointments.length) {
            return res.status(404).json({ message: 'No doctors with appointments found' });
        }

        return res.status(200).json(doctorsWithAppointments.map(doc => doc.doctorDetails));
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});*/

router.get('/doctors-with-appointmentss', protect, async (req, res) => {
    const { specialization, search } = req.query;  // Optional specialization and search query parameters
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied: Nurse only.' });
    }
    try {
        const matchCondition = {};
        if (specialization) matchCondition['doctorDetails.specialization'] = specialization;
        if (search) matchCondition['doctorDetails.name'] = { $regex: search, $options: 'i' };  // Case-insensitive search

        const doctorsWithAppointments = await Appointment.aggregate([
            { $group: { _id: "$doctor" } },  // Group by doctor ID
            {
                $lookup: {
                    from: "doctors",  // Join with the doctors collection
                    localField: "_id",  // doctor ID from appointments
                    foreignField: "_id",  // doctor ID from doctors
                    as: "doctorDetails"
                }
            },
            { $unwind: "$doctorDetails" },  // Flatten doctor details
            { $match: matchCondition },  // Apply search and specialization filters
            {
                $project: {
                    _id: 0,
                    "doctorDetails._id": 1,
                    "doctorDetails.name": 1,
                    "doctorDetails.specialization": 1
                }
            }
        ]);

        if (!doctorsWithAppointments.length) {
            return res.status(404).json({ message: 'No doctors with appointments found' });
        }

        return res.status(200).json(doctorsWithAppointments.map(doc => doc.doctorDetails));
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
});



/*router.get('/appoin', authMiddleware, async (req, res) => {
    try {
        const allDoctors = await Doctor.find().select(['-password', '-__v']);

        // Fetch all appointments
        const allAppointments = await Appointment.find().populate('doctor');

        // Create a set of doctor IDs that have appointments
        const doctorIdsWithAppointments = new Set(allAppointments.map(app => String(app.doctor._id)));

        // Separate doctors with appointments and without
        const doctorsWithAppointments = [];
        const doctorsWithoutAppointments = [];

        allDoctors.forEach((doctor) => {
            if (doctorIdsWithAppointments.has(String(doctor._id))) {
                doctorsWithAppointments.push(doctor);
            } else {
                doctorsWithoutAppointments.push(doctor);
            }
        });

        res.status(200).json({
            doctorsWithAppointments,
            doctorsWithoutAppointments
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});*/
router.get('/appoin', protect, /*authMiddleware*/ async (req, res) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: 'Access denied: Nurse only.' });
    }
    try {
        const allDoctors = await Doctor.find().select(['-password', '-__v']);

        // Fetch all appointments and populate the doctor field
        const allAppointments = await Appointment.find().populate('doctor');

        // Create a set of doctor IDs that have appointments, ensure to check for null/undefined doctors
        const doctorIdsWithAppointments = new Set(
            allAppointments
                .filter(app => app.doctor && app.doctor._id)  // Ensure doctor exists and has _id
                .map(app => String(app.doctor._id))
        );

        // Separate doctors with appointments and without
        const doctorsWithAppointments = [];
        const doctorsWithoutAppointments = [];

        allDoctors.forEach((doctor) => {
            if (doctorIdsWithAppointments.has(String(doctor._id))) {
                doctorsWithAppointments.push(doctor);
            } else {
                doctorsWithoutAppointments.push(doctor);
            }
        });

        res.status(200).json({
            doctorsWithAppointments,
            doctorsWithoutAppointments
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});


router.post('/register', async (req, res) => {
    const { name, specialization, phone, email, password } = req.body;

    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
        return res.status(400).json({ message: 'Doctor already exists' });
    }

    // Set recentlyRegistered = false for all other doctors
    await Doctor.updateMany({}, { $set: { recentlyRegistered: false } });

    // Create new doctor with recentlyRegistered set to true
    const doctor = await Doctor.create({
        name,
        specialization,
        phone,
        email,
        password,
        recentlyRegistered: true,
        registrationTime: new Date()
    });

    if (doctor) {
        const io = req.app.get('socketio');
        io.emit('newDoctorAdded', { message: `New Doctor ${doctor.name} registered successfully` });
        console.log(`New Doctor ${doctor.name} registered successfully`);

        return res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            token: generateToken(doctor._id)
        });
    } else {
        return res.status(400).json({ message: 'Invalid doctor data' });
    }
});


router.get('/checkNewDoctor', async (req, res) => {
    try {
        const recentDoctor = await Doctor.findOne({ recentlyRegistered: true }).sort({ registrationTime: -1 });

        if (recentDoctor && recentDoctor.name) {
            return res.status(200).json({ message: `New Doctor ${recentDoctor.name} registered recently` });
        } else {
            return res.status(200).json({ message: '' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error checking recent doctor registration', error });
    }
});






// Register a new doctor real register below
/*router.post('/register', async (req, res) => {
    const { name, specialization, phone, email, password } = req.body;

    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
        return res.status(400).json({ message: 'Doctor already exists' });
    }

    const doctor = await Doctor.create({
        name,
        specialization,
        phone,
        email,
        password
    });

    if (doctor) {
        await incrementReportField('totalDoctorsRegistered');  // Increment registration count
        await incrementReportField('totalDoctorsAdded');  // Increment added doctors count
        return res.status(201).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            token: generateToken(doctor._id)
        });
    } else {
        return res.status(400).json({ message: 'Invalid doctor data' });
    }
});*/
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });

    if (doctor && (await doctor.matchPassword(password))) {
        return res.status(200).json({
            _id: doctor._id,
            name: doctor.name,
            email: doctor.email,
            token: generateToken(doctor._id)
        });
    } else {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});
// Delete doctor
router.delete('/:email', /*authMiddleware*/ async (req, res) => {
    const { email } = req.params;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
    }
    await Doctor.deleteOne({ email });
    await incrementReportField('totalDoctorsDeleted');  // Increment deleted doctors count

    return res.status(200).json({ message: 'Doctor deleted' });
});

// Update doctor
router.put('/:email', protect, /*authMiddleware*/ async (req, res) => {
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: Nurse only.' });
    }
    const { email } = req.params;
    /*const { name: newName, email: newEmail } = req.body;*/
    const { phone: newPhone, specialization: newspecialization } = req.body;
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
        return res.status(404).json({ error: 'Doctor not found' });
    }

    /*const anotherDoctor = await Doctor.findOne({ email: newEmail });
   
    if (anotherDoctor && anotherDoctor._id !== doctor._id) {
        return res.status(400).json({ error: 'Email is already in use' });
    }*/

    doctor.phone = newPhone;
    doctor.specialization = newspecialization;
    await doctor.save();

    await incrementReportField('totalDoctorsUpdated');  // Increment updated doctors count
    return res.status(200).json({ message: 'Doctor updated successfully' });
});

module.exports = router;

/*const express = require('express');
const Doctor = require('../models/Doctor');
const Appointment = require('../models/Appointment');  // Import Appointment model
const Report = require('../models/Report');  // Import Report model
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// JWT Token Generation
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// Increment report field for tracking
const incrementReportField = async (field) => {
    let report = await Report.findOne();
    if (!report) {
        report = new Report();
    }
    report[field] += 1;
    await report.save();
};
router.get('/', authMiddleware, async (req, res) => {
    const allDoctors = await Doctor.find().select(['-password', '-__v']);
    return res.status(200).json(allDoctors);
});
// ?? Fetch all doctors and check appointments for each one
*//*router.get('/appoin', authMiddleware, async (req, res) => {
    try {
        const allDoctors = await Doctor.find().select(['-password', '-__v']);

        // Fetch all appointments
        const allAppointments = await Appointment.find().populate('doctor');

        // Create a set of doctor IDs that have appointments
        const doctorIdsWithAppointments = new Set(allAppointments.map(app => String(app.doctor._id)));

        // Separate doctors with appointments and without
        const doctorsWithAppointments = [];
        const doctorsWithoutAppointments = [];

        allDoctors.forEach((doctor) => {
            if (doctorIdsWithAppointments.has(String(doctor._id))) {
                doctorsWithAppointments.push(doctor);
            } else {
                doctorsWithoutAppointments.push(doctor);
            }
        });

        res.status(200).json({
            doctorsWithAppointments,
            doctorsWithoutAppointments
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});*//*

// ?? Register a new doctor
router.post('/register', async (req, res) => {
    const { name, specialization, phone, email, password } = req.body;

    try {
        const doctorExists = await Doctor.findOne({ email });
        if (doctorExists) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        const doctor = await Doctor.create({
            name,
            specialization,
            phone,
            email,
            password
        });

        if (doctor) {
            await incrementReportField('totalDoctorsRegistered');  // Increment registration count
            await incrementReportField('totalDoctorsAdded');  // Increment added doctors count
            return res.status(201).json({
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                token: generateToken(doctor._id)
            });
        } else {
            return res.status(400).json({ message: 'Invalid doctor data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ??? Doctor login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });

        if (doctor && (await doctor.matchPassword(password))) {
            return res.status(200).json({
                _id: doctor._id,
                name: doctor.name,
                email: doctor.email,
                token: generateToken(doctor._id)
            });
        } else {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ??? Delete doctor by email
router.delete('/:email', authMiddleware, async (req, res) => {
    const { email } = req.params;

    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        await Doctor.deleteOne({ email });
        await incrementReportField('totalDoctorsDeleted');  // Increment deleted doctors count

        return res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ?? Update doctor details
router.put('/:email', authMiddleware, async (req, res) => {
    const { email } = req.params;
    const { name: newName, email: newEmail } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        const anotherDoctor = await Doctor.findOne({ email: newEmail });
        if (anotherDoctor && String(anotherDoctor._id) !== String(doctor._id)) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        doctor.name = newName || doctor.name;
        doctor.email = newEmail || doctor.email;
        await doctor.save();

        await incrementReportField('totalDoctorsUpdated');  // Increment updated doctors count
        return res.status(200).json({ message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
*/