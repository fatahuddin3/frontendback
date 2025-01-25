
const express = require('express');
const http = require('http');

const doctorRouter = require('./routes/carsRoute');

const billRouter = require('./routes/usersRoute');

const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Importing CORS
require('dotenv').config({ path: './config.env' });

const app = express();
const server = http.createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:5173",  // Frontend URL
        methods: ["GET", "POST"],
        credentials: true
    }
});
app.set('socketio', io);
// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error:', err));


app.use(cors());
// Alternatively, specify the origin(s) allowed
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const PORT = process.env.PORT || 4000;

app.use(express.json());

// Middleware to parse JSON bodies
app.use(log); // Custom logger middleware

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hospital Management system' });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));




// Pass the Socket.IO instance to routes
app.set('socketio', io);
// Doctors route
app.use("/h", doctorRouter);

app.use('/userrr', billRouter);




app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


