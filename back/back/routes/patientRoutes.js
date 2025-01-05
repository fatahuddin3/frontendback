const express = require('express');
const Patient = require('../models/Patient');
const Report = require('../models/Report');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { protect } = require('../middlewares/protected');
const User = require('../models/user');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const { createCanvas, loadImage } = require('canvas');
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
// Multer storage configuration (where images are stored)
/*const imageDirectory = path.resolve(__dirname, '../Images'); // Absolute path to Images directory
console.log("Resolved image directory path:", imageDirectory); // Debugging line

// Ensure the Images folder is created if it doesn't exist
if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, { recursive: true });
}


// Multer setup for handling image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = imageDirectory;
        console.log("Uploading image to:", uploadPath); // Debugging line
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueFileName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        console.log("Saving file as:", uniqueFileName); // Debugging line
        cb(null, uniqueFileName);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 1MB file size limit
}).single('image');

// Serve static files from the Images folder
// Serve static files from the Images folder
router.use('/Images', express.static(path.join(__dirname, '../Images')));
*/

// Multer storage configuration (where images are stored)
// Ensure the Images folder exists
//new
/*const imageDirectory = path.join(__dirname, '../Images');
if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, { recursive: true }); // Create the folder if it doesn't exist
}

// Multer storage configuration (where images are stored)
const storage = multer.diskStorage({
    destination: imageDirectory, // Use resolved directory path
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 }, // 1MB file size limit
}).single('image'); // Accepting only one file, the image field in the form

// Serve static files (make uploaded images accessible)
router.use('/Images', express.static(imageDirectory));
// Register patient route with image upload
router.post('/register', (req, res) => {
    // Handle image upload first
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err });
        }

        const { name, age, gender, address, contactNumber, medicalHistory, createdAt } = req.body;

        // Check if patient already exists
        const patientExists = await Patient.findOne({ contactNumber });
        if (patientExists) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        try {
            const patient = await Patient.create({
                name,
                age,
                gender,
                address,
                contactNumber,
                medicalHistory,
                image: req.file ? `/Images/${req.file.filename}` : '',
                
                // Store image path if uploaded
                createdAt
            });

            if (patient) {
                await incrementReportField('totalPatientsRegistered');
                await incrementReportField('totalPatientsAdded');

                return res.status(201).json({
                    _id: patient._id,
                    name: patient.name,
                    contactNumber: patient.contactNumber,
                    token: generateToken(patient._id),
                    image: patient.image // Return the image URL
                });
            } else {
                return res.status(400).json({ message: 'Invalid patient data' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    });
});*/
// Set storage engine for file uploads
/*const imageDirectory = path.join(__dirname, '../Images');
if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, { recursive: true }); // Create the folder if it doesn't exist
}

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, imageDirectory); // Correct directory path for image storage
    },
    filename: (req, file, cb) => {
        const uniqueName = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        cb(null, uniqueName); // Generate unique filename for image
    }
});

// Multer middleware for handling single image upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 }, // 1MB file size limit
}).single('image');

// Serve static files (make uploaded images accessible)
router.use('/Images', express.static(imageDirectory));

// Register patient route with image upload
router.post('/register', (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err });
        }

        const { name, age, gender, address, contactNumber, medicalHistory } = req.body;

        // Check if patient already exists
        const patientExists = await Patient.findOne({ contactNumber });
        if (patientExists) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        try {
            const patient = await Patient.create({
                name,
                age,
                gender,
                address,
                contactNumber,
                medicalHistory,
                image: req.file ? `/Images/${req.file.filename}` : '', // Store image path if uploaded
                createdAt: new Date()
            });

            if (patient) {
                await incrementReportField('totalPatientsRegistered');
                await incrementReportField('totalPatientsAdded');

                return res.status(201).json({
                    _id: patient._id,
                    name: patient.name,
                    contactNumber: patient.contactNumber,
                    token: generateToken(patient._id),
                    image: patient.image // Return the image URL in the response
                });
            } else {
                return res.status(400).json({ message: 'Invalid patient data' });
            }
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    });
});

*/

// Register a new patient
/*router.post('/register', async (req, res) => {
    const { name, age, gender, address, contactNumber, medicalHistory,createdAt } = req.body;

    const patientExists = await Patient.findOne({ contactNumber });
    if (patientExists) {
        return res.status(400).json({ message: 'Patient already exists' });
    }

    const patient = await Patient.create({
        name,
        age,
        gender,
        address,
        contactNumber,
        medicalHistory,
        createdAt,
    });
    if (patient) {
        await incrementReportField('totalPatientsRegistered');  // Increment patient registration count
        await incrementReportField('totalPatientsAdded');       // Increment added patients count
        return res.status(201).json({
            _id: patient._id,
            name: patient.name,
            contactNumber: patient.contactNumber,
            token: generateToken(patient._id)
        });
    } else {
        return res.status(400).json({ message: 'Invalid patient data' });
    }
});
*/


router.get('/pa',  async (req, res) => {
    const allpati = await Patient.find();
    return res.status(200).json(allpati);
});
//real get
/*router.get('/pa', authMiddleware3, async (req, res) => {
    try {
        const allpati = await Patient.find().sort({ createdAt: -1 }); // Sort by creation date (newest first)
        return res.status(200).json(allpati);
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching patients', error });
    }
});*/
// Get a patient by contact number
/*router.get('/:contactNumber',authMiddleware3, async (req, res) => {
    const { contactNumber } = req.params;

    const patient = await Patient.findOne({ contactNumber });

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    return res.status(200).json({
        _id: patient._id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        address: patient.address,
        contactNumber: patient.contactNumber,
        medicalHistory: patient.medicalHistory
    });
});*/
/*router.get('/pa', authMiddleware3, async (req, res) => {
    try {
        const allpati = await Patient.find().sort({ createdAt: -1 }); // Fetch and sort patients
        const jsonString = JSON.stringify(allpati, null, 2); // Convert JSON to string with pretty format

        // Create a canvas and set its dimensions
        const canvas = createCanvas(800, 600); // Width: 800px, Height: 600px
        const ctx = canvas.getContext('2d');

        // Set white background
        ctx.fillStyle = 'yellow';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Set font for text rendering
        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';

        // Split the JSON string into lines and render each line on the image
        const lines = jsonString.split('\n');
        let yPosition = 20; // Start text at 20px from the top

        lines.forEach((line, index) => {
            ctx.fillText(line, 20, yPosition);
            yPosition += 20; // Move to the next line
        });

        // Send the image as a response
        res.setHeader('Content-Type', 'image/png');
        canvas.createPNGStream().pipe(res); // Stream the image back to the client

    } catch (error) {
        return res.status(500).json({ message: 'Error fetching patients', error });
    }
});*/



// Route for getting patient image

//main
/*router.get('/patientimage/:id', authMiddleware3, async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).send('Patient not found.');

        const jsonString = JSON.stringify(patient, null, 2);
        const canvas = createCanvas(600, 400);
        const ctx = canvas.getContext('2d');

        // Get the color parameter from the query string
        const color = req.query.color || 'yellow'; // Default to yellow if no color is provided

        ctx.fillStyle = color; // Use the color from the frontend
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = '16px Arial';
        ctx.fillStyle = 'black';
        const lines = jsonString.split('\n');
        let yPosition = 20;

        lines.forEach((line) => {
            ctx.fillText(line, 20, yPosition);
            yPosition += 20;
        });

        res.setHeader('Content-Type', 'image/png');
        canvas.createPNGStream().pipe(res);
    } catch (error) {
        res.status(500).json({ message: 'Error generating image', error });
    }
});*/





router.get('/patientimage/:id', async (req, res) => {
    const { color = '#FFFF00' } = req.query;  // Default background color is yellow
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).send('Patient not found.');

        const imagePath = path.join(__dirname, '../', patient.image);

        if (!fs.existsSync(imagePath)) {
            return res.status(404).send('Patient image not found.');
        }

        // Load the patient image
        loadImage(imagePath).then((image) => {
            const canvas = createCanvas(600, 400); // Canvas size
            const ctx = canvas.getContext('2d');

            // ?? Apply the dynamic background color from the query parameter
            ctx.fillStyle = color;  // Color picked from the request (defaults to yellow)
            ctx.fillRect(0, 0, canvas.width, canvas.height);  // Fill the entire canvas with the color

            // Draw the uploaded patient image
            const imgWidth = 200;
            const imgHeight = 300;
            ctx.drawImage(image, 50, 50, imgWidth, imgHeight);  // Draw image at position (50, 50)

            // Set up text properties for Name, Age, Gender
            ctx.fillStyle = '#FFFFFF';  // Text color (black)
            ctx.font = '40px Times New Roman';

            // Calculate text position dynamically (right of the image)
            const textX = 300;
            let textY = 100; // Start position for the first line of text

            // Draw each detail: Name, Age, Gender
            ctx.fillText(`Name: ${patient.name}`, textX, textY);
            textY += 40;  // Move down for the next line
            ctx.fillText(`Age: ${patient.age}`, textX, textY);
            textY += 40;  // Move down again
            ctx.fillText(`Gender: ${patient.gender}`, textX, textY);

            // Send the canvas as a PNG
            res.setHeader('Content-Type', 'image/png');
            canvas.pngStream().pipe(res);

        }).catch(err => {
            console.error('Error loading image:', err);
            res.status(500).send('Error processing patient image.');
        });

    } catch (error) {
        res.status(500).send({ error: 'Error fetching patient data.' });
    }
});
// Save patient settings





//main get
router.get('/:contactNumber', protect, async (req, res) => {
    const { contactNumber } = req.params;

    try {
        const patient = await Patient.findOne({ contactNumber });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        return res.status(200).json({
            _id: patient._id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            address: patient.address,
            contactNumber: patient.contactNumber,
            medicalHistory: patient.medicalHistory,
            image: patient.image // Include image URL in the response
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});
router.get('/:doctorId/patients', protect, async (req, res) => {
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
});

/*router.get('/:contactNumber', authMiddleware3, async (req, res) => {
    const { contactNumber } = req.params;

    try {
        const patient = await Patient.findOne({ contactNumber });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Full image URL
        const imageUrl = patient.image ? `${req.protocol}://${req.get('host')}/Images/${path.basename(patient.image)}` : null;

        return res.status(200).json({
            _id: patient._id,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            address: patient.address,
            contactNumber: patient.contactNumber,
            medicalHistory: patient.medicalHistory,
            image: imageUrl // Send full URL
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
});*/

//main delete
/*router.delete('/:contactNumber',authMiddleware3, async (req, res) => {*/
/*router.delete('/:contactNumber', protect, async (req, res) => {
    const { contactNumber } = req.params;
    const patient = await Patient.findOne({ contactNumber });

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    await Patient.deleteOne({ contactNumber });
    await incrementReportField('totalPatientsDeleted');  

    return res.status(200).json({ message: 'Patient deleted' });
});*/

router.delete('/:doctorId/patients/:patientId/', protect, async (req, res) => {
    
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
});

// Update patient
/*router.put('/:contactNumber',authMiddleware3, async (req, res) => {
    const { contactNumber } = req.params;
    const { name: newName, contactNumber: newContactNumber, age, address, medicalHistory } = req.body;

    const patient = await Patient.findOne({ contactNumber });
    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    const anotherPatient = await Patient.findOne({ contactNumber: newContactNumber });
    if (anotherPatient && anotherPatient._id !== patient._id) {
        return res.status(400).json({ error: 'Contact number is already in use' });
    }
    patient.name = newName;
    patient.contactNumber = newContactNumber;
    patient.age = age;
    patient.address = address;
    patient.medicalHistory = medicalHistory;

    await patient.save();
    await incrementReportField('totalPatientsUpdated');  // Increment updated patients count

    return res.status(200).json({ message: 'Patient updated successfully' });
});
*/
// Update patient route with image upload
//real
/*router.put('/:contactNumber', authMiddleware3, (req, res) => {
    // Handle image upload first
    upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: 'Image upload failed', error: err });
        }

        const { contactNumber } = req.params;
        const { name: newName, contactNumber: newContactNumber, age, gender, address, medicalHistory } = req.body;

        try {
            // Find the existing patient by contact number
            const patient = await Patient.findOne({ contactNumber });
            if (!patient) {
                return res.status(404).json({ error: 'Patient not found' });
            }

            // Check if the new contact number is already in use by another patient
            const anotherPatient = await Patient.findOne({ contactNumber: newContactNumber });
            if (anotherPatient && anotherPatient._id.toString() !== patient._id.toString()) {
                return res.status(400).json({ error: 'Contact number is already in use' });
            }

            // Update patient details
            patient.name = newName || patient.name;
            patient.contactNumber = newContactNumber || patient.contactNumber;
            patient.age = age || patient.age;
            patient.gender = gender || patient.gender;
            patient.address = address || patient.address;
            patient.medicalHistory = medicalHistory || patient.medicalHistory;

            // If a new image is uploaded, update the image field and delete the old image
            if (req.file) {
                // Delete the old image file if it exists
                if (patient.image && fs.existsSync(path.join(__dirname, '../', patient.image))) {
                    fs.unlinkSync(path.join(__dirname, '../', patient.image));
                }
                // Update with the new image path
                patient.image = `/uploads/${req.file.filename}`;
            }

            // Save the updated patient
            await patient.save();
            await incrementReportField('totalPatientsUpdated');  // Increment updated patients count

            return res.status(200).json({
                message: 'Patient updated successfully',
                patient: {
                    _id: patient._id,
                    name: patient.name,
                    contactNumber: patient.contactNumber,
                    age: patient.age,
                    gender: patient.gender,
                    address: patient.address,
                    medicalHistory: patient.medicalHistory,
                    image: patient.image  // Return updated image URL if available
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Server error', error });
        }
    });
});*/


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = './uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append extension
    }
});

const upload = multer({ storage: storage });


/*router.post('/register', upload.single('image'), async (req, res) => {*/
router.post('/:doctorId/register', protect, upload.single('image'), async (req, res) => {
        //this 2 line extra
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: Doctors only.' });
    }
    const { name,email,password, age, gender, address, contactNumber, medicalHistory, createdAt } = req.body;

    try {
        const patientExists = await Patient.findOne({ contactNumber });
        if (patientExists) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        // Store image path if image is uploaded
        
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }//this user is extra
        const user = new User({
            name,
            email,
            password,
            role: 'patient'
        });

        // Save the User document to the database
        await user.save();
        const patient = await Patient.create({
            name,
            age,
            gender,
            address,
            contactNumber,
            medicalHistory,
            createdAt,
            image: `/uploads/${req.file.filename}`,
            userId: user._id,
            doctor: req.user._id  
            // Save image path to patient document
        });

        if (patient) {
            await incrementReportField('totalPatientsRegistered');  // Increment patient registration count
            await incrementReportField('totalPatientsAdded');       // Increment added patients count

            return res.status(201).json({
                _id: patient._id,
                name: patient.name,
                contactNumber: patient.contactNumber,
                filePath: `/uploads/${req.file.filename}`,   // Return the image URL in the response
                token: generateToken(patient._id)
            });
        } else {
            return res.status(400).json({ message: 'Invalid patient data' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

// GET route to serve images
router.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Image not found');
    }
});

//main put
/*router.put('/:contactNumber', protect, upload.single('image'), async (req, res) => {
    *//*router.put('/:contactNumber',  upload.single('image'), async (req, res) => {*//*
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: Doctors only.' });
    }
    const { contactNumber } = req.params;
    const { name: newName, contactNumber: newContactNumber, age, address, medicalHistory } = req.body;

    try {
        const patient = await Patient.findOne({ contactNumber });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        // Check if new contactNumber is being used by another patient
        if (newContactNumber && newContactNumber !== contactNumber) {
            const anotherPatient = await Patient.findOne({ contactNumber: newContactNumber });
            if (anotherPatient && anotherPatient._id.toString() !== patient._id.toString()) {
                return res.status(400).json({ error: 'Contact number is already in use' });
            }
        }

        // Update patient details
        patient.name = newName || patient.name;
        patient.contactNumber = newContactNumber || patient.contactNumber;
        patient.age = age || patient.age;
        patient.address = address || patient.address;
        patient.medicalHistory = medicalHistory || patient.medicalHistory;

        // Check if an image is uploaded and update image path
        if (req.file) {
            // Optionally delete the old image from the server (if applicable)
            const oldImagePath = patient.image;
            if (oldImagePath && fs.existsSync(path.join(__dirname, oldImagePath))) {
                fs.unlinkSync(path.join(__dirname, oldImagePath));  // Remove old image file
            }

            patient.image = `/uploads/${req.file.filename}`;  // Update with new image path
        }

        await patient.save();
        await incrementReportField('totalPatientsUpdated');  // Increment updated patients count

        return res.status(200).json({
            message: 'Patient updated successfully',
            patient: {
                _id: patient._id,
                name: patient.name,
                contactNumber: patient.contactNumber,
                age: patient.age,
                address: patient.address,
                medicalHistory: patient.medicalHistory,
                image: patient.image   // Include image path in response
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});
*/

router.put('/:doctorId/patients/:patientId/:contactNumber', protect, upload.single('image'), async (req, res) => {
    /*router.put('/:contactNumber',  upload.single('image'), async (req, res) => {*/
    if (req.user.role !== 'doctor') {
        return res.status(403).json({ message: 'Access denied: Doctors only.' });
    }
    const patient = await Patient.findOne({ _id: req.params.patientId, doctor: req.user._id });
    if (!patient) {
        return res.status(404).json({ message: 'Patient not found' });
    }

    const { contactNumber } = req.params;
    const {  contactNumber: newContactNumber, age, address, medicalHistory } = req.body;

    try {
       

        // Check if new contactNumber is being used by another patient
        if (newContactNumber && newContactNumber !== contactNumber) {
            const anotherPatient = await Patient.findOne({ contactNumber: newContactNumber });
            if (anotherPatient && anotherPatient._id.toString() !== patient._id.toString()) {
                return res.status(400).json({ error: 'Contact number is already in use' });
            }
        }

        // Update patient details
        
        patient.contactNumber = newContactNumber || patient.contactNumber;
        patient.age = age || patient.age;
        patient.address = address || patient.address;
        patient.medicalHistory = medicalHistory || patient.medicalHistory;

        // Check if an image is uploaded and update image path
        if (req.file) {
            // Optionally delete the old image from the server (if applicable)
            const oldImagePath = patient.image;
            if (oldImagePath && fs.existsSync(path.join(__dirname, oldImagePath))) {
                fs.unlinkSync(path.join(__dirname, oldImagePath));  // Remove old image file
            }

            patient.image = `/uploads/${req.file.filename}`;  // Update with new image path
        }

        await patient.save();
        await incrementReportField('totalPatientsUpdated');  // Increment updated patients count

        return res.status(200).json({
            message: 'Patient updated successfully',
            patient: {
                _id: patient._id,
                
                contactNumber: patient.contactNumber,
                age: patient.age,
                address: patient.address,
                medicalHistory: patient.medicalHistory,
                image: patient.image   // Include image path in response
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});




module.exports = router;
/*const express = require('express');
const Patient = require('../models/Patient');
const Report = require('../models/Report');
const jwt = require('jsonwebtoken');
const router = express.Router();

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET ;

// Helper function to increment report data
const incrementReportField = async (field) => {
    let report = await Report.findOne();
    if (!report) {
        report = new Report();
    }
    report[field] += 1;
    await report.save();
};

// Auth Middleware to verify token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Invalid token' });
    }
};

// Register a new patient
router.post('/register', async (req, res) => {
    const { name, age, gender, address, contactNumber, medicalHistory } = req.body;

    const patientExists = await Patient.findOne({ contactNumber });
    if (patientExists) {
        return res.status(400).json({ message: 'Patient already exists' });
    }

    const patient = await Patient.create({
        name,
        age,
        gender,
        address,
        contactNumber,
        medicalHistory,
    });

    if (patient) {
        // Increment patient registration count
        await incrementReportField('totalPatientsRegistered');
        await incrementReportField('totalPatientsAdded');

        // Generate JWT Token
        const token = jwt.sign(
            { _id: patient._id, contactNumber: patient.contactNumber },
            JWT_SECRET,
            { expiresIn: '30d' }
        );

        return res.status(201).json({
            _id: patient._id,
            name: patient.name,
            contactNumber: patient.contactNumber,
            token,  // Return the token in the response
        });
    } else {
        return res.status(400).json({ message: 'Invalid patient data' });
    }
});

// Get a patient by contact number (requires authentication)
router.get('/:contactNumber', authMiddleware, async (req, res) => {
    const { contactNumber } = req.params;

    const patient = await Patient.findOne({ contactNumber });

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    return res.status(200).json({
        _id: patient._id,
        name: patient.name,
        age: patient.age,
        gender: patient.gender,
        address: patient.address,
        contactNumber: patient.contactNumber,
        medicalHistory: patient.medicalHistory
    });
});

// Delete a patient (requires authentication)
router.delete('/:contactNumber', authMiddleware, async (req, res) => {
    const { contactNumber } = req.params;
    const patient = await Patient.findOne({ contactNumber });

    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    await Patient.deleteOne({ contactNumber });
    await incrementReportField('totalPatientsDeleted');

    return res.status(200).json({ message: 'Patient deleted' });
});

// Update patient (requires authentication)
router.put('/:contactNumber', authMiddleware, async (req, res) => {
    const { contactNumber } = req.params;
    const { name: newName, contactNumber: newContactNumber, age, address, medicalHistory } = req.body;

    const patient = await Patient.findOne({ contactNumber });
    if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
    }

    const anotherPatient = await Patient.findOne({ contactNumber: newContactNumber });
    if (anotherPatient && anotherPatient._id !== patient._id) {
        return res.status(400).json({ error: 'Contact number is already in use' });
    }

    patient.name = newName;
    patient.contactNumber = newContactNumber;
    patient.age = age;
    patient.address = address;
    patient.medicalHistory = medicalHistory;

    await patient.save();
    await incrementReportField('totalPatientsUpdated');

    return res.status(200).json({ message: 'Patient updated successfully' });
});



module.exports = router;

*/