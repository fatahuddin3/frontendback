const jwt = require('jsonwebtoken');
const User = require('../models/Doctor');

exports.authdoc = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            if (!req.user) {
                return res.status(401).json({ message: 'User not found' });
            }
            next();
        } catch (error) {
            console.error("Error in protect middleware:", error);
            return res.status(401).json({ message: 'Token verification failed' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};
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