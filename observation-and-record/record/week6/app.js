const express = require('express');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

// Student data
let students = [
    { id: 1, name: "Lekhyasri", course: "CSE" },
    { id: 2, name: "Aarav", course: "CSE" }
];

// Home Page
app.get('/', (req, res) => {
    res.send(`
        <h1>Student Management System</h1>

        <a href="/students">View Students</a>
        <br><br>

        <a href="/add">Add Student</a>
    `);
});

// View Students
app.get('/students', (req, res) => {

    let studentList = students.map(student => `
        <li>
            ${student.name} - ${student.course}
            <form method="POST" action="/delete/${student.id}" style="display:inline;">
                <button type="submit">Delete</button>
            </form>
        </li>
    `).join('');

    res.send(`
        <h1>Student List</h1>

        <ul>
            ${studentList || "<li>No students available</li>"}
        </ul>

        <br>
        <a href="/add">Add New Student</a>
        <br><br>
        <a href="/">Back to Home</a>
    `);
});

// Add Student Form
app.get('/add', (req, res) => {
    res.send(`
        <h1>Add Student</h1>

        <form method="POST" action="/add">

            <label>Name:</label>
            <input type="text" name="name" required>
            <br><br>

            <label>Course:</label>
            <input type="text" name="course" required>
            <br><br>

            <button type="submit">Add Student</button>

        </form>

        <br>
        <a href="/">Back to Home</a>
    `);
});

// Add Student
app.post('/add', (req, res) => {

    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(newStudent);

    res.redirect('/students');
});

// Delete Student
app.post('/delete/:id', (req, res) => {

    const id = parseInt(req.params.id);

    students = students.filter(student => student.id !== id);

    res.redirect('/students');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});