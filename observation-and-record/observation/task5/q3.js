// Import the Express.js module
const express = require("express");

// Create an Express application
const app = express();

// Define the port number on which the server will run
const PORT = 3000;


// Create an array containing student names
const students = [
    "Ananya",
    "Rahul",
    "Priya",
    "Arjun",
    "Sneha"
];


// Route for the home page
// When the user visits "/", this function will execute
app.get("/", function (req, res) {

    // Send HTML content as the response
    res.send("<h1>Welcome to Student Server</h1>");
});


// Route for displaying the list of students
// When the user visits "/students", this function will execute
app.get("/students", function (req, res) {

    // Send the students array as JSON response
    res.json(students);
});


// Route for the About page
// When the user visits "/about", this function will execute
app.get("/about", function (req, res) {

    // Send HTML content as the response
    res.send(`
        <h1>About</h1>
        <p>This is a basic Express.js student server.</p>
        <p>It demonstrates routing and HTTP GET requests.</p>
    `);
});


// Start the Express server on the specified port
app.listen(PORT, function () {

    // Display a message in the terminal when the server starts
    console.log(`Server running at http://localhost:${PORT}`);
});