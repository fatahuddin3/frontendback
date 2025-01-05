
/*real code below*/
const express = require('express');
const app = express();
const cors = require('cors');
const authRoutes = require('./routes/auth');
app.use(cors());
// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

module.exports = app;





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
















