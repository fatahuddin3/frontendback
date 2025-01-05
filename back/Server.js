/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
dotenv.config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

/*real code below*/
const app = require('./app');
const connectDB = require('./DatabaseConnection');
require('dotenv').config({ path: './config.env' });

const PORT = process.env.PORT || 5010;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// jwtExample.js

// Import required modules
/*const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Step 1: Generate a strong JWT secret key
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex'); // 256-bit key
};

// Step 2: Define your payload
const payload = {
    userId: 12345,
    username: 'exampleUser',
    role: 'user'
};

// Step 3: Generate the JWT
const generateJWT = (payload, secretKey) => {
    // Sign the token with the payload and secret key, set expiration to 1 hour
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

// Step 4: Verify the JWT
const verifyJWT = (token, secretKey) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return { valid: true, decoded };
    } catch (err) {
        return { valid: false, error: err.message };
    }
};

// Main execution
const main = () => {
    // Generate secret key
    const jwtSecretKey = generateSecretKey();
    console.log('Generated JWT Secret Key:', jwtSecretKey);

    // Generate JWT
    const token = generateJWT(payload, jwtSecretKey);
    console.log('Generated JWT:', token);

    // Verify JWT
    const verification = verifyJWT(token, jwtSecretKey);
    if (verification.valid) {
        console.log('Decoded JWT:', verification.decoded);
    } else {
        console.log('Invalid JWT:', verification.error);
    }
};

// Run the main function
main();
*/
// Import required modules
/*const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config.env' });

// Create an Express app
const app = express();

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Define a simple GET route for testing
app.get('/test', (req, res) => {
    res.send({ message: 'API is working!' });
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
*/