/*const User = require("../models/user");
const Patient = require("../models/patients");
const Doctor = require("../models/doctors");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {

    try {

        var name = req.query.name;
        var firstName = req.query.firstName;
        var lastName = req.query.lastName;
        var role = req.query.role;

        let conditions = [];

        if (name) {
            conditions.push({ firstName: name });
            conditions.push({ lastName: name });
        }

        if (firstName) {
            conditions.push({ firstName: firstName });
            
        }
        if (lastName) {
            conditions.push({ lastName: lastName });

        }
        if (role) {
            conditions.push({ userType: role });
        }
        //console.log(role);
        let users = [];
        if (conditions.length === 0) {
            users = await User.find({});
        } else {
            console.log(conditions);

            users = await User.find({
                $or: conditions
            });
        }

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const isUserValid = (newUser) => {
    let errorList = [];
    if (!newUser.firstName) {
        errorList[errorList.length] = "Please enter first name";
    }
    if (!newUser.lastName) {
        errorList[errorList.length] = "Please enter last name";
    }
    if (!newUser.email) {
        errorList[errorList.length] = "Please enter email";
    }
    if (!newUser.password) {
        errorList[errorList.length] = "Please enter password";
    }
    if (!newUser.confirmPassword) {
        errorList[errorList.length] = "Please re-enter password in Confirm Password field";
    }
    if (!newUser.userType) {
        errorList[errorList.length] = "Please enter User Type";
    }
    if (!(newUser.password == newUser.confirmPassword)) {
        errorList[errorList.length] = "Password and Confirm Password did not match";
    }

    if (errorList.length > 0) {
        result = {
            status: false,
            errors: errorList
        }
        return result;
    }
    else {
        return { status: true };
    }

}
*/
/*const saveUser = async (req, res) => {
    let newUser = req.body;
    let userValidStatus = isUserValid(newUser);
    if (!userValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: userValidStatus.errors
        });
    }
    else {
        const newUser = new User(req.body);

        User.create(
            {
                email: newUser.email,
                username: newUser.username,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                password: newUser.password,
                userType: newUser.userType,
                activated: true
            },
            (error, userDetails) => {
                if (error) {
                    res.status(400).json({ message: "error", errors: [error.message] });
                } else {

                    if (newUser.userType === "Doctor") {
                        Doctor.create(
                            {
                                userId: userDetails._id,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                email: newUser.email
                            },
                            (error2, doctorDetails) => {
                                if (error2) {
                                    User.deleteOne({ _id: userDetails });
                                    res.status(400).json({ message: "error", errors: [error2.message] });
                                } else {
                                    res.status(201).json({ message: "success" });
                                }
                            }
                        );
                    }
                    if (newUser.userType === "Patient") {
                        Patient.create(
                            {
                                userId: userDetails._id,
                                firstName: newUser.firstName,
                                lastName: newUser.lastName,
                                email: newUser.email
                            },
                            (error2, patientDetails) => {
                                if (error2) {
                                    User.deleteOne({ _id: userDetails });
                                    res.status(400).json({ message: "error", errors: [error2.message] });
                                } else {
                                    res.status(201).json({ message: "success" });
                                }
                            }
                        );
                    }
                }
            }
        );

    }
}*/


/*const saveUser = async (req, res) => {
    let newUser = req.body;
    let userValidStatus = isUserValid(newUser);
    if (!userValidStatus.status) {
        return res.status(400).json({
            message: 'error',
            errors: userValidStatus.errors
        });
    }

    // Create a new User instance
    const user = new User({
        email: newUser.email,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        userType: newUser.userType,
        activated: true
    });

    try {
        // Save the user in the database
        const userDetails = await user.save();

        // If the user type is Doctor, create a Doctor document
        if (newUser.userType === "Doctor") {
            await Doctor.create({
                userId: userDetails._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            });
        }

        // If the user type is Patient, create a Patient document
        if (newUser.userType === "Patient") {
            await Patient.create({
                userId: userDetails._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email
            });
        }

        // Generate JWT Token with user ID and userType
        const token = jwt.sign(
            {
                id: userDetails._id,
                userType: userDetails.userType
            },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Respond with success and the token
        res.status(201).json({
            message: "User created successfully",
            token: token
        });

    } catch (error) {
        // Error handling
        console.error("Error saving user:", error);
        res.status(400).json({
            message: "error",
            errors: [error.message]
        });
    }
};

const updateUser = async (req, res) => {
    let newUser = req.body;
    let userValidStatus = isUserValid(newUser);
    if (!userValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: userValidStatus.errors
        });
    }
    else {
        try {
            const updateduser = await User.updateOne({ _id: req.params.id }, { $set: req.body });
            res.status(201).json({ message: 'success' });
        } catch (error) {
            res.status(400).json({ message: 'error', errors: [error.message] });
        }
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.userType == 'Doctor') {
            const deleteddoctor = await Doctor.deleteOne({ userId: req.params.id });
        }

        if (user.userType == 'Patient') {
            const deletedpaient = await Patient.deleteOne({ userId: req.params.id });
        }

        const deleteduser = await User.deleteOne({ _id: req.params.id });
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
}

*/
// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');
const Staff = require('../models/Nurses');
const Ipdnurses = require('../models/Ipdnurses');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '100d' });
};

/*exports.registerUser = async (req, res) => {
    const { name, email, password, role, specialization, phone } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    //this patient is extra
    const doctor = new Doctor({
        name,
        userId: user._id,  // Link patient record to the user
        specialization,
        phone,
        email,
        password,

    });

    // Save the Patient document to the database
    await doctor.save();

    res.status(201).json({user,doctor,
         token: generateToken(user._id) });
};*/
exports.registerDoctor = async (req, res) => {
    try {
        const { name, email, password, role, specialization, phone } = req.body;

        // Validate input
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered." });
        }//extra line
        await Doctor.updateMany({}, { $set: { recentlyRegistered: false } });
        // Create the user
        const user = new User({ name, email, password, role });
        const savedUser = await user.save();

        // Create the doctor only if the role is "doctor"
        let doctor = null;
        if (role === "doctor") {
            if (!specialization || !phone) {
                return res.status(400).json({ error: "Specialization and phone are required for doctors." });
            }

            doctor = new Doctor({
                name,
                userId: savedUser._id, // Link the doctor to the user
                specialization,
                phone,
                email,
                password,
                recentlyRegistered: true,
            });

            await doctor.save();
        }
        //extra line
        const io = req.app.get('socketio');
        io.emit('newDoctorAdded', { message: `New Doctor ${doctor.name} registered successfully` });
        console.log(`New Doctor ${doctor.name} registered successfully`);
        // Respond with created user and doctor
        res.status(201).json({
            user: savedUser,
            doctor,
            token: generateToken(savedUser._id)
        });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({ user: { role: user.role }, token: generateToken(user._id) });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};
/*exports.getAllUsers = async (req, res) => {
    try {
        // Only admin role can access this
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only.' });
        }
        const users = await User.find().select('-password'); // Exclude password
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};*/
// controllers/UserController.js
//to get all users from database I have to use admin token rather than pati and doc
exports.getAllUsers = async (req, res) => {
    try {
        // Log the role and user details for debugging
        console.log("User Role:", req.user.role);
        console.log("User Details:", req.user);

        // Only proceed if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only.' });
        }

        // Retrieve all users without passwords
        const users = await User.find().select('-password');
        res.json(users);

    } catch (error) {
        console.error("Error in getAllUsers:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get Specific User by ID (Admin or User themselves)
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        // Check if the user is an admin or the user themselves
        if (!user || (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString())) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Update User Info (Admin or User themselves)
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        // Check if the user is an admin or the user themselves
        if (!user || (req.user.role !== 'admin' && req.user._id.toString() !== user._id.toString())) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        // Update allowed fields
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        // Save the updated user
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
// controllers/DoctorController.js


/*exports.addPatient = async (req, res) => {
    try {
        // Check if user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        // Create a new patient linked to the doctor
        const { name, age, gender, address, contactNumber, medicalHistory, image } = req.body;
        const patient = new Patient({
            name,
            age,
            gender,
            address,
            contactNumber,
            medicalHistory,
            doctor: req.user._id,  // Link patient to the doctor
            image
        });

        await patient.save();
        res.status(201).json(patient);
    } catch (error) {
        console.error("Error in addPatient:", error);
        res.status(500).json({ message: 'Server error' });
    }
};*/
// controllers/DoctorController.js
//real below
exports.addPatient = async (req, res) => {
    try {
        // Ensure that only doctors can add patients
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        // Extract patient details from request
        const { name, email, password, age, gender, address, contactNumber, medicalHistory } = req.body;

        // Step 1: Create a new user with role 'patient'
        const user = new User({
            name,
            email,
            password,
            role: 'patient'
        });

        // Save the User document to the database
        await user.save();

        // Step 2: Create a new patient record linked to the user's ID
        const patient = new Patient({
            userId: user._id,  // Link patient record to the user
            age,
            gender,
            address,
            contactNumber,
            medicalHistory,
            doctor: req.user._id  // Link to the doctor who added the patient
        });

        // Save the Patient document to the database
        await patient.save();

        // Send response with both User and Patient data
        res.status(201).json({ user, patient });
    } catch (error) {
        console.error("Error in addPatient:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

// controllers/DoctorController.js


exports.getPatients = async (req, res) => {
    try {
        // Check if user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        // Get all patients for the doctor and populate data from User collection
        const patients = await Patient.find({ doctor: req.user._id })
            .populate('userId', 'name email') // Only select name and email from User
            .exec();
        res.json(patients);
    } catch (error) {
        console.error("Error in getPatients:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updatePatient = async (req, res) => {
    try {
        // Check if user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        // Find the patient in the Patient collection
        const patient = await Patient.findOne({ _id: req.params.patientId, doctor: req.user._id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update patient-specific fields in the Patient document
        patient.age = req.body.age || patient.age;
        patient.gender = req.body.gender || patient.gender;
        patient.address = req.body.address || patient.address;
        patient.contactNumber = req.body.contactNumber || patient.contactNumber;
        patient.medicalHistory = req.body.medicalHistory || patient.medicalHistory;
        patient.image = req.body.image || patient.image;

        // Save the updated patient document
        await patient.save();

        // Update user-specific fields in the User document
        const user = await User.findById(patient.userId);
        if (user) {
            user.name = req.body.name || user.name;
            await user.save();
        }

        res.json({ user, patient });
    } catch (error) {
        console.error("Error in updatePatient:", error);
        res.status(500).json({ message: 'Server error' });
    }
};




exports.deletePatient = async (req, res) => {
    try {
        // Check if user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        // Find the patient document
        const patient = await Patient.findOneAndDelete({ _id: req.params.patientId, doctor: req.user._id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Delete the associated user document
        await User.findByIdAndDelete(patient.userId);

        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error("Error in deletePatient:", error);
        res.status(500).json({ message: 'Server error' });
    }
};


// Get all nurses
/*exports.getAllNurses = async (req, res) => {

    try {
        const nurses = await Nurse.find();
        res.status(200).json(nurses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single nurse by ID
exports.getNurseById = async (req, res) => {
    try {
        const nurse = await Nurse.findById(req.params.id);
        if (!nurse) return res.status(404).json({ message: "Nurse not found" });
        res.status(200).json(nurse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
*/
// Add a new nurse
/*exports.registerNurse = async (req, res) => {
    const { name, email, password, role, specialization, phone, experience,shift } = req.body;
    const user = new User({
        name, email, role, password,
         });
    await user.save();
    //this patient is extra
    const nurse = new Nurse({
        name,
        userId: user._id,  // Link patient record to the user
        specialization,
        phone,
        email,
        password,
        shift,
        experience,

    });

    // Save the Patient document to the database
    await nurse.save();

    res.status(201).json({
        user, nurse,
        token: generateToken(user._id)
    });
};*/
exports.registerStaff = async (req, res) => {
    try {
        const { name, email, password, role, specialization, phone,shift,experience } = req.body;

        // Validate input
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Create the user
        const user = new User({ name, email, password, role });
        const savedUser = await user.save();

        
        let doctor = null;
        if (role === "staff") {
            if (!specialization || !phone) {
                return res.status(400).json({ error: "Specialization and phone are required for staffs." });
            }

            staff = new Staff({
                name,
                userId: savedUser._id, // Link the doctor to the user
                specialization,
                phone,
                email,
                password,
                shift,
                experience
            });

            await staff.save();
        }

        // Respond with created user and doctor
        res.status(201).json({
            user: savedUser,
            staff,
            token: generateToken(savedUser._id)
        });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
};

exports.registerNurse = async (req, res) => {
    try {
        const { name, email, password, role,  specialization, phone, experience } = req.body;

        // Validate input
        if (!name || !email || !password || !role) {
            return res.status(400).json({ error: "All required fields must be provided." });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered." });
        }

        // Create the user
        const user = new User({ name, email, password, role });
        const savedUser = await user.save();


        let doctor = null;
        if (role === "nurse") {
            if (!specialization || !phone) {
                return res.status(400).json({ error: "Specialization and phone are required for staffs." });
            }

            ipdnurse = new Ipdnurses({
                name,
                userId: savedUser._id, // Link the doctor to the user
                specialization,
                phone,
                email,
                password,
               
                experience,
                
            });

            await ipdnurse.save();
        }

        // Respond with created user and doctor
        res.status(201).json({
            user: savedUser,
            ipdnurse,
            token: generateToken(savedUser._id)
        });
    } catch (error) {
        console.error("Error saving user:", error);
        res.status(500).json({ error: "An error occurred while registering the user." });
    }
};


// Update a nurse by ID
/*exports.updateNurse = async (req, res) => {
    try {
        const nurse = await Nurse.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!nurse) return res.status(404).json({ message: "Nurse not found" });
        res.status(200).json(nurse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a nurse by ID
exports.deleteNurse = async (req, res) => {
    try {
        const nurse = await Nurse.findByIdAndDelete(req.params.id);
        if (!nurse) return res.status(404).json({ message: "Nurse not found" });
        res.status(200).json({ message: "Nurse deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};*/



/*exports.getPatients = async (req, res) => {
    try {
        // Check if user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        // Get all patients for the doctor
        const patients = await Patient.find({ doctor: req.user._id }).select('-password');
        res.json(patients);
    } catch (error) {
        console.error("Error in getPatients:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
// controllers/DoctorController.js

exports.updatePatient = async (req, res) => {
    try {
        // Check if user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        const patient = await Patient.findOne({ _id: req.params.patientId, doctor: req.user._id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Update allowed fields
        patient.name = req.body.name || patient.name;
        patient.age = req.body.age || patient.age;
        patient.gender = req.body.gender || patient.gender;
        patient.address = req.body.address || patient.address;
        patient.contactNumber = req.body.contactNumber || patient.contactNumber;
        patient.medicalHistory = req.body.medicalHistory || patient.medicalHistory;
        patient.image = req.body.image || patient.image;

        // Save the updated patient
        const updatedPatient = await patient.save();
        res.json(updatedPatient);
    } catch (error) {
        console.error("Error in updatePatient:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
// controllers/DoctorController.js

exports.deletePatient = async (req, res) => {
    try {
        // Check if user is a doctor
        if (req.user.role !== 'doctor') {
            return res.status(403).json({ message: 'Access denied: Doctors only.' });
        }

        const patient = await Patient.findOneAndDelete({ _id: req.params.patientId, doctor: req.user._id });
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error("Error in deletePatient:", error);
        res.status(500).json({ message: 'Server error' });
    }
};
*/