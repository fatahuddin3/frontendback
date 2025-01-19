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

//real code below
/*const app = require('./app');
const connectDB = require('./DatabaseConnection');
const user = require('./models/User');
require('dotenv').config({ path: './config.env' });

const PORT = process.env.PORT || 5000;

connectDB();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/

/*const app = require('./app');
const connectDB = require('./DatabaseConnection');
const user = require('./models/User');
require('dotenv').config({ path: './config.env' });

const PORT = process.env.PORT || 5010;

connectDB();
app.post('/register', (req, res) => {
    user.create(req.body).then(info => (res.json(info)).catch(err => res.json(err)))
})
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
*/

/*const express = require("express")
const collection = require("./models/User")
require('dotenv').config({ path: './config.env' });
const cors = require("cors")
const app = express()
const connectDB = require('./DatabaseConnection');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const PORT = process.env.PORT || 5010;
connectDB();
app.get("/", cors(), (req, res) => {

})


app.post("/", async (req, res) => {
    const { email, password } = req.body

    try {
        const check = await collection.findOne({ email: email })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
        }

    }
    catch (e) {
        res.json("fail")
    }

})



app.post("/signup", async (req, res) => {
    const { email, password } = req.body

    const data = {
        email: email,
        password: password
    }

    try {
        const check = await collection.findOne({ email: email })

        if (check) {
            res.json("exist")
        }
        else {
            res.json("notexist")
            await collection.insertMany([data])
        }

    }
    catch (e) {
        res.json("fail")
    }

})

app.listen(PORT, () => {
    console.log("port connected");
})
*/
/*const express = require("express");
const mongoose = require('mongoose');
const collection = require("./models/User");
require('dotenv').config({ path: './config.env' });
const cors = require("cors");
const app = express();
const connectDB = require('./DatabaseConnection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.set('debug', true);  // Enable Mongoose debug mode

const PORT = process.env.PORT || 5010;
connectDB();

// Default route
app.get("/", cors(), (req, res) => {
    res.send("API is running...");
});

// Login route
app.post("/", async (req, res) => {
    const { email, password } = req.body;

    console.log("Login attempt: ", { email, password });

    try {
        const check = await collection.findOne({ email: email });
        console.log("User found: ", check);

        if (check) {
            res.json("exist");
        } else {
            res.json("notexist");
        }
    } catch (e) {
        console.log("Error during login: ", e);
        res.json("fail");
    }
});

// Signup route
app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    console.log("Signup attempt: ", { email, password });

    try {
        const check = await collection.findOne({ email: email });
        console.log("Existing user check: ", check);

        if (check) {
            res.json("exist");
        } else {
            const newUser = new collection({ email, password });
            await newUser.save();
            console.log("New user created: ", newUser);
            res.json("notexist");
        }
    } catch (e) {
        console.log("Error during signup: ", e);
        res.json("fail");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});*/

/*const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const authRoutes = require('./routes/auth');

require('dotenv').config({ path: './config.env' });

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));*/

/*const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcryptjs = require("bcryptjs");
const PORT = 5000;
const app = express();
const MONGB_UR = "mongodb+srv://fatah:lumberdit45.@cluster0.kwhfx.mongodb.net/MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM?retryWrites=true&w=majority&appName=Cluster0";

// mdillrwre
app.use(cors());
app.use(express.json());
mongoose.connect(MONGB_UR);
const db = mongoose.connection;
db.on("error", (err) => {
    console.error("Mongodb connnection error", err);
});
db.once("open", () => {
    console.log("Mongodb is connected");
});

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});
const User = mongoose.model("User", userSchema);
app.post("/register", async (req, res) => {
    try {
        const hasspassword = await bcryptjs.hashSync(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hasspassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error druing registration ", error);
        res.status(500).json({ error: "inter server error" });
    }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
*/
//real real code below
/*const http = require('http');
const app = require('./App');
const connectDB = require('./DatabaseConnection');

// Load environment variables
require('dotenv').config({ path: './config.env' });

// Connect to the database
connectDB();

const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/
//API developement aust
/*const express = require('express');

const  userss  = require('./data');
const app = express();
const PORT = 4001;
app.use(express.json());


app.get('/', (req, res) => {
   
    res.status(200).json({ message: 'Hospital Management  ' });
});
app.get("/users", (req, res) => {
    res.status(200).json(userss);

});
app.post("/users", (req, res) => {
    const { name, email } = (req.body);
    const anoth = userss.find((user) => user.email === email);
    if (anoth) {
      return  res.staus(400).json({error:'already in use'})

    }
    
   return  res.status(201).json({ message: 'user created' });
});
app.put("/users/:email", (req, res) => {
    const { email } = req.params;
    const { name: newName, email: newEmail } = req.body();
    const user = userss.find((user) => user.email === email);
    console.log(user);
    if (!user) {
        return res.staus(404).json({ error: 'not found' })
    }
    user.name = newName;
    user.email = newEmail;
    
    console.log(newName, newEmail);

    return res.status(200).json({ message: 'user updated' });
}
);
app.delete("/users/:email", (req, res) => {
    const { email } = (req.params);
    const user = userss.find((user) => user.email === email);
    if (!user) {
        return res.staus(404).json({ error: "user notexist" })
    }
    const newuser = userss.filter((user) => user.email !== email);

    console.log(newuser);
    return res.status(200).json({ message: 'user deleted' });

});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/
//Original code i said original below
/*const express = require('express');
const userRouter = require('./routes/doctorRoutes')
const log = require('./middlewares/logger');
const mongoose = require("mongoose");
require('dotenv').config({ path: './config.env' });
const app = express();
mongoose.connect(process.env.MONGO_URI).
    then(() => console.log('Database connected')).catch((err) => console.log('error'));
const PORT =process.env.PORT|| 4000;
app.use(express.json());
app.use(log);
app.get('/', (req, res) => {

    res.status(200).json({ message: 'Hospital Management  ' });
});
app.use("/users", userRouter);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/
// server.js

/*const express = require('express');
const doctorRouter = require('./routes/doctorRoutes');
const log = require('./middlewares/logger');
const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });
const app = express();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('error'));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(log);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hospital Management' });
});

app.use("/doctors", doctorRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/



//updated server.js below real server.js
/*const express = require('express');
const doctorRouter = require('./routes/doctorRoutes');
const reportRouter = require('./routes/reportRoutes');
const billRouter = require('./routes/billRoutes');
const appointRouter = require('./routes/appointmentRoutes');
const patientRouter = require('./routes/patientRoutes');
const bookRouter = require('./routes/bookRoutes');
const booRouter = require('./routes/booRoutes');
const recoRouter = require('./routes/medirecoRoutes');
const prescripRouter = require('./routes/presRoutes');
const pharmRouter = require('./routes/pharmRoutes');
const teleRouter = require('./routes/TelemediRoutes');
const inpatiRouter = require('./routes/inpatroutes');
const mediRouter = require('./routes/mediRoutes');
const dischRouter = require('./routes/dischargeRoutes');
const disRouter = require('./routes/dischRoutes');
const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Importing CORS
require('dotenv').config({ path: './config.env' });

const app = express();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error:', err));

// CORS setup to allow requests from the frontend
// Enable all CORS requests
app.use(cors());
// Alternatively, specify the origin(s) allowed
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET','POST','PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    withCredentials: true
}));

const PORT = process.env.PORT || 4000;

app.use(express.json());

// Middleware to parse JSON bodies
app.use(log); // Custom logger middleware

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hospital Management' });
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Doctors route
app.use("/doctors", doctorRouter);
app.use('/reports', reportRouter); 
app.use('/bills', billRouter); 
app.use('/appoint', appointRouter);
app.use('/pati', patientRouter);
app.use('/bookings', bookRouter);
app.use('/booki', booRouter);
app.use('/digi', recoRouter);
app.use('/prescription', prescripRouter);
app.use('/phar', pharmRouter);
app.use('/tele', teleRouter);
app.use('/inpa', inpatiRouter);
app.use('/medicat', mediRouter);
app.use('/dis', dischRouter);
app.use('/disc', disRouter);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/
/*app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hospital Management' });
});*/
/*const express = require('express');
const doctorRouter = require('./routes/doctorRoutes');
const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 4000;

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error:', err));

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(express.json());
app.use(log); // Custom logger middleware

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Backend Server is running!');
});

// Doctors route
app.use('/doctors', doctorRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/



/*const express = require('express');
const doctorRouter = require('./routes/doctorRoutes');
const reportRouter = require('./routes/reportRoutes');
const billRouter = require('./routes/billRoutes');
const appointRouter = require('./routes/appointmentRoutes');
const patientRouter = require('./routes/patientRoutes');
const bookRouter = require('./routes/bookRoutes');
const booRouter = require('./routes/booRoutes');
const recoRouter = require('./routes/medirecoRoutes');
const prescripRouter = require('./routes/presRoutes');
const pharmRouter = require('./routes/pharmRoutes');
const teleRouter = require('./routes/TelemediRoutes');
const inpatiRouter = require('./routes/inpatroutes');
const mediRouter = require('./routes/mediRoutes');
const dischRouter = require('./routes/dischargeRoutes');
const disRouter = require('./routes/dischRoutes');
const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './config.env' });

const app = express();

// Set up storage engine for Multer
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

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error:', err));

// CORS setup to allow requests from the frontend
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend's URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(log); // Custom logger middleware

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hospital Management' });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Doctors route
app.use("/doctors", doctorRouter);
app.use('/reports', reportRouter);
app.use('/bills', billRouter);
app.use('/appoint', appointRouter);
app.use('/pati', patientRouter);
app.use('/bookings', bookRouter);
app.use('/booki', booRouter);
app.use('/digi', recoRouter);
app.use('/prescription', prescripRouter);
app.use('/phar', pharmRouter);
app.use('/tele', teleRouter);
app.use('/inpa', inpatiRouter);
app.use('/medicat', mediRouter);
app.use('/dis', dischRouter);
app.use('/disc', disRouter);

// POST route for image upload
app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    res.status(200).json({ message: 'Image uploaded successfully', filePath: `/uploads/${req.file.filename}` });
});

// GET route to serve images
app.get('/uploads/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('Image not found');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/




const express = require('express');
const http = require('http');

const doctorRouter = require('./routes/doctorRoutes');
const reportRouter = require('./routes/reportRoutes');
const billRouter = require('./routes/billRoutes');
const appointRouter = require('./routes/appointmentRoutes');
const patientRouter = require('./routes/patientRoutes');
const bookRouter = require('./routes/bookRoutes');
const booRouter = require('./routes/booRoutes');
const recoRouter = require('./routes/medirecoRoutes');
const prescripRouter = require('./routes/presRoutes');
const pharmRouter = require('./routes/pharmRoutes');
const teleRouter = require('./routes/TelemediRoutes');
const inpatiRouter = require('./routes/inpatroutes');
const mediRouter = require('./routes/mediRoutes');
const dischRouter = require('./routes/dischargeRoutes');
const disRouter = require('./routes/dischRoutes');
const userRoute = require('./routes/UserRoute');

const PatientRoute = require('./routes/PatientRoute');
const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// Importing CORS
require('dotenv').config({ path: './config.env' });

const app = express();
const server = http.createServer(app);
/*const io = socketIO(server);*/
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

// CORS setup to allow requests from the frontend
// Enable all CORS requests
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
app.use("/doctors", doctorRouter);
app.use('/reports', reportRouter);
app.use('/bills', billRouter);
app.use('/appoint', appointRouter);
app.use('/pati', patientRouter);
app.use('/bookings', bookRouter);
app.use('/booki', booRouter);
app.use('/digi', recoRouter);
app.use('/prescription', prescripRouter);
app.use('/phar', pharmRouter);
app.use('/tele', teleRouter);
app.use('/inpa', inpatiRouter);
app.use('/medicat', mediRouter);
app.use('/dis', dischRouter);
app.use('/disc', disRouter);
app.use('/user', userRoute);
app.use('/patien', PatientRoute);

// Start server

/*io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
/*const express = require('express');
const doctorRouter = require('./routes/doctorRoutes');
const reportRouter = require('./routes/reportRoutes');
const billRouter = require('./routes/billRoutes');
const appointRouter = require('./routes/appointmentRoutes');
const patientRouter = require('./routes/patientRoutes');
const bookRouter = require('./routes/bookRoutes');
const booRouter = require('./routes/booRoutes');
const recoRouter = require('./routes/medirecoRoutes');
const prescripRouter = require('./routes/presRoutes');
const pharmRouter = require('./routes/pharmRoutes');
const teleRouter = require('./routes/TelemediRoutes');
const log = require('./middlewares/logger');
const mongoose = require('mongoose');
const cors = require('cors');

// Importing CORS
require('dotenv').config({ path: './config.env' });

const app = express();

// Connecting to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Database connected'))
    .catch((err) => console.log('Error:', err));

// CORS setup to allow requests from the frontend
// Enable all CORS requests
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
    res.status(200).json({ message: 'Hospital Management' });
});

// Doctors route
app.use("/doctors", doctorRouter);
app.use('/reports', reportRouter);
app.use('/bills', billRouter);
app.use('/appoint', appointRouter);
app.use('/pati', patientRouter);
app.use('/bookings', bookRouter);
app.use('/booki', booRouter);
app.use('/digi', recoRouter);
app.use('/prescription', prescripRouter);
app.use('/phar', pharmRouter);
app.use('/tele', teleRouter);
// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});*/