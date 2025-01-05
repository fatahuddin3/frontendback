
//real code below
/*const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;*/


//amer vai code
/*require('dotenv').config({ path: './.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const bookRoutes = require('./routes/books');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define Routes
app.use('/api/v1', userRoutes);
app.use('/api/v1/books', bookRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
*/














/*import express from "express";

import { config } from "dotenv";

import cors from "cors";
import fileUpload from "express-fileupload";
const app = express();
config({ path: "./config.env" });
app.use(
    cors({        
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use('/api/patients', patientRoutes);




export default app;*/

/*const express = require('express');
const app = express()
const port = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");

app.use(cors())
require('./models/model')

app.use(express.json())
app.use(require("./routes/auth"))

mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})


app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})
*/
// server/server.js
/*const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './keys' });

const app = express();
app.use(cors());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a simple schema and model
const RequestSchema = new mongoose.Schema({
    query: String,
    params: Object,
    date: { type: Date, default: Date.now },
});

const RequestModel = mongoose.model('Request', RequestSchema);

// Route to handle GET requests
app.get('/', async (req, res) => {
    const newRequest = new RequestModel({
        query: req.query.queryString,
        params: req.query,
    });

    try {
        const savedRequest = await newRequest.save();
        res.status(200).json({ message: 'Request saved!', data: savedRequest });
    } catch (error) {
        res.status(500).json({ message: 'Error saving request', error });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
*/


const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/doctors', require('./routes/doctorRoutes'));
app.use('/api/patients', require('./routes/patientRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));

// Sample route
app.get('/', (req, res) => {
    res.send('Hospital Management System API is running...');
});

module.exports = app;










