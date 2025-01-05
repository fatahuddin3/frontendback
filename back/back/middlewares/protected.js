/*// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            // Debugging log
            console.log("Authenticated User Role:", req.user.role);
            console.log("Authenticated User Details:", req.user);

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
};*/
// middlewares/protected.js
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');
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
