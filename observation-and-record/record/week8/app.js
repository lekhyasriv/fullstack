const API = "http://localhost:3000/students";

// GET - Read all students
fetch(API)
    .then(response => response.json())
    .then(data => {
        console.log("GET:", data);
    });

// POST - Add a new student
fetch(API, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Priya",
        course: "ECE",
        year: 3
    })
})
    .then(response => response.json())
    .then(data => {
        console.log("POST:", data);
    });

// PUT - Update complete student record
fetch(`${API}/1`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Lekhyasri",
        course: "AI & ML",
        year: 3
    })
})
    .then(response => response.json())
    .then(data => {
        console.log("PUT:", data);
    });

// PATCH - Update part of a student record
fetch(`${API}/2`, {
    method: "PATCH",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        year: 3
    })
})
    .then(response => response.json())
    .then(data => {
        console.log("PATCH:", data);
    });

// DELETE - Delete a student
fetch(`${API}/2`, {
    method: "DELETE"
})
    .then(() => {
        console.log("DELETE: Student deleted successfully");
    });