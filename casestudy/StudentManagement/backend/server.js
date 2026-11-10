const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const studentRoutes = require("./routes/studentRoutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/students", studentRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Student Management System Backend is Running!");
});

// Health Check
app.get("/api/health", (req, res) => {
    res.json({
        status: "success",
        message: "Backend is working!"
    });
});

// Connect MongoDB and Start Server
const PORT = process.env.PORT || 5001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Atlas Connected Successfully!");
        console.log("Database:", mongoose.connection.name);
        console.log("Host:", mongoose.connection.host);

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error.message);
    });