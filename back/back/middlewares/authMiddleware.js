/*const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        req.user = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};*/
//real code below
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            
            req.doctor = await Doctor.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
};

module.exports = authMiddleware;


/*const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];  // Extract token from "Bearer <token>"

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Fetch the authenticated doctor
            req.doctor = await Doctor.findById(decoded.id).select('-password');
            next();  // Proceed to the next middleware/route handler
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
};

module.exports = authMiddleware;*/
// middleware/authMiddleware.js

