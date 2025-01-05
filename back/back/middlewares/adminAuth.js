const jwt = require("jsonwebtoken");


function adminAuth(req, res, next) {
    // console.log("adminAuth hit",);
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        // console.log("adminAuth ",payload);
        if (payload.userType == "Admin") {
            next();
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    });

}

module.exports = adminAuth;
// middlewares/adminAuth.js
/*
const jwt = require("jsonwebtoken");

function adminAuth(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Check if the userType in the payload is 'Admin'
        if (payload.userType === "Admin") {
            next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Admins only' });
        }
    });
}

module.exports = adminAuth;
*/