const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Connection to MongoDB failed:", error.message);
    }
};

connectDB(); // Ensure this is called to initiate the connection
