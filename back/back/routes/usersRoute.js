const express = require("express");
const router = express.Router();
const Patient = require("../models/userModel")
const jwt = require('jsonwebtoken');


const multer = require('multer');
const path = require('path');
const fs = require('fs');
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '250d',
    });
};
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const doctor = await Patient.findOne({ email });

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
router.post('/register', upload.single('image'), async (req, res) => {
    //this 2 line extra
    
    const { name, email, password, age, gender, address, contactNumber , createdAt } = req.body;

    try {
        const patientExists = await Patient.findOne({ contactNumber });
        if (patientExists) {
            return res.status(400).json({ message: 'Patient already exists' });
        }

        // Store image path if image is uploaded

        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }//this user is extra
        
        const patient = await Patient.create({
            email,
            password,
            name,
            age,
            gender,
            address,
            contactNumber,
           
            createdAt,
            image: `/uploads/${req.file.filename}`,
            
            // Save image path to patient document
        });

        if (patient) {
                 // Increment added patients count

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




module.exports = router
