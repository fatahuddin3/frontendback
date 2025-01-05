const Patient = require("../models/patients");

const User = require("../models/user");

const getPatients = async (req, res) => {

    try {
        var searchpatient = new RegExp(req.query.name, 'i');

        let patients = [];
        if (!searchpatient) {
            patients = await Patient.find({}).populate('userId');

        } else {
            patients = await Patient.find().populate({
                path: 'userId',
                select: 'firstName lastName email username',
                match: {
                    $or: [
                        { firstName: { $regex: searchpatient } },
                        { lastName: { $regex: searchpatient } },
                        { email: { $regex: searchpatient } }
                    ]
                }
            }).then((patients) => patients.filter((patient => patient.userId != null)));
        }

        res.json(patients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getPatientById = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('userId');
        res.json(patient);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const isPatientValid = (newPatient) => {
    let errorList = [];
    if (!newPatient.firstName) {
        errorList[errorList.length] = "Please enter first name";
    }
    if (!newPatient.lastName) {
        errorList[errorList.length] = "Please enter last name";
    }
    if (!newPatient.email) {
        errorList[errorList.length] = "Please enter email";
    }
    if (!newPatient.password) {
        errorList[errorList.length] = "Please enter password";
    }
    if (!newPatient.confirmPassword) {
        errorList[errorList.length] = "Please re-enter password in Confirm Password field";
    }
    if (!(newPatient.password == newPatient.confirmPassword)) {
        errorList[errorList.length] = "Password and Confirm Password did not match";
    }
    if (!newPatient.phone) {
        errorList[errorList.length] = "Please enter phone";
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

/*const savePatient = async (req, res) => {
    let newPatient = req.body;
    let PatientValidStatus = isPatientValid(newPatient);
    if (!PatientValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: PatientValidStatus.errors
        });
    }
    else {
        //const patient = new Patient(req.body);
        User.create(
            {
                email: newPatient.email,
                username: newPatient.username,
                firstName: newPatient.firstName,
                lastName: newPatient.lastName,
                password: newPatient.password,
                userType: 'Patient',
                activated: 1,
            },
            (error, userDetails) => {
                if (error) {
                    res.status(400).json({ message: "error", errors: [error.message] });
                } else {
                    newPatient.userId = userDetails._id,
                        Patient.create(newPatient,
                            (error2, patientDetails) => {
                                if (error2) {
                                    User.deleteOne({ _id: userDetails });
                                    res.status(400).json({ message: 'error', errors: [error2.message] });
                                } else {
                                    res.status(201).json({ message: 'success' });
                                }
                            }
                        );
                }
            }
        );
    }
}*/

const savePatient = async (req, res) => {
    const newPatient = req.body;

    // Validate patient data
    const PatientValidStatus = isPatientValid(newPatient);
    if (!PatientValidStatus.status) {
        return res.status(400).json({
            message: 'error',
            errors: PatientValidStatus.errors
        });
    }

    try {
        // Create the user in the User collection
        const userDetails = await User.create({
            email: newPatient.email,
            username: newPatient.username,
            firstName: newPatient.firstName,
            lastName: newPatient.lastName,
            password: newPatient.password,
            userType: 'Patient',
            activated: 1,
        });
        
        // Link the user ID to the patient data
        newPatient.userId = userDetails._id;

        // Create the patient in the Patient collection
        const patientDetails = await Patient.create(newPatient);

        // If successful, return a success response
        res.status(201).json({ message: 'success', patient: patientDetails });

    } catch (error) {
        console.error("Error creating patient:", error);

        // Handle potential errors in both User and Patient creation
        if (error.errors && error.errors[0].path === '_id') {
            await User.deleteOne({ _id: userDetails._id }); // Rollback user creation if patient creation fails
        }

        res.status(400).json({ message: 'error', errors: [error.message] });
    }
};




const updatePatient = async (req, res) => {
    let newPatient = req.body;
    let PatientValidStatus = isPatientValid(newPatient);
    if (!PatientValidStatus.status) {
        res.status(400).json({
            message: 'error',
            errors: PatientValidStatus.errors
        });
    }
    else {
        try {
            const updatedPatient = await Patient.updateOne({ _id: req.params.id }, { $set: { "phone": req.body.phone, "address": req.body.address, "gender": req.body.gender, "dob": req.body.dob } });

            const updateduser = await User.updateOne({ _id: req.params.id }, { $set: { "firstName": req.body.firstName, "lastName": req.body.lastName, "email": req.body.email, "username": req.body.username, "password": req.body.password } });

            /*const updateduser = await User.updateOne({ _id: req.body.userId }, { $set: { "firstName": req.body.firstName, "lastName": req.body.lastName, "email": req.body.email, "username": req.body.username, "password": req.body.password } });*/

            res.status(201).json({ message: 'success' });
        } catch (error) {
            res.status(400).json({ message: 'error', err: [error.message] });
        }
    }
}
/*const updatePatient = async (req, res) => {
    let newPatient = req.body;

    // Validate patient data
    let PatientValidStatus = isPatientValid(newPatient);
    if (!PatientValidStatus.status) {
        return res.status(400).json({
            message: 'error',
            errors: PatientValidStatus.errors
        });
    }

    // Check if password and confirmPassword match
    if (newPatient.password !== newPatient.confirmPassword) {
        return res.status(400).json({
            message: 'error',
            errors: ["Please re-enter password in Confirm Password field", "Password and Confirm Password did not match"]
        });
    }

    try {
        // Update the Patient document with patient-specific details
        const updatedPatient = await Patient.updateOne(
            { _id: req.params.id },
            {
                $set: {
                    "phone": newPatient.phone,
                    "address": newPatient.address,
                    "gender": newPatient.gender,
                    "dob": newPatient.dob
                }
            }
        );

        // Update the User document with user-specific details
        const updatedUser = await User.updateOne(
            { _id: newPatient.userId },
            {
                $set: {
                    "firstName": newPatient.firstName,
                    "lastName": newPatient.lastName,
                    "email": newPatient.email,
                    "username": newPatient.username,
                    "password": newPatient.password // Only if passwords match
                }
            }
        );

        res.status(201).json({ message: 'success' });
    } catch (error) {
        res.status(400).json({ message: 'error', errors: [error.message] });
    }
};
*/
const deletePatient = async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate('userId');

        const deletedPatient = await Patient.deleteOne({ _id: req.params.id });

        const deleteduser = await User.deleteOne({ _id: req.params.id });

        res.status(200).json(deletedPatient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}





module.exports = {
    getPatients,
    getPatientById,
    savePatient,
    updatePatient,
    deletePatient,
    
}


