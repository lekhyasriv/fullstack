const express = require("express");

const app = express();

const students = [
    "Rahul",
    "Priya",
    "Arjun",
    "Sneha",
    "Kiran"
];

// Home route
app.get("/", function (req, res) {
    res.send("<h1>Welcome to Student Server</h1>");
});

// Students route
app.get("/students", function (req, res) {
    res.json(students);
});

// About route
app.get("/about", function (req, res) {
    res.send("<h2>About</h2><p>This is a simple Express.js Student Application.</p>");
});

// Start server
app.listen(3000, function () {
    console.log("Server running at http://localhost:3000");
});