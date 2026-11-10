
import { useState, useEffect } from "react";
import "./App.css";

const rawApiUrl = (import.meta.env.VITE_API_URL || "http://localhost:5001/api").trim().replace(/\/+$/, "");
const API_URL = rawApiUrl.endsWith("/api") ? rawApiUrl : `${rawApiUrl}/api`;

function App() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [editingStudentId, setEditingStudentId] = useState(null);
  const [activePage, setActivePage] = useState("Dashboard");
  const [darkMode, setDarkMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    email: "",
    department: "",
    year: "",
    phone: ""
  });

  const fetchStudents = async () => {
    try {
      const response = await fetch(`${API_URL}/students`);
      if (!response.ok) throw new Error("Failed to fetch students");

      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        editingStudentId
          ? `${API_URL}/students/${editingStudentId}`
          : `${API_URL}/students`,
        {
          method: editingStudentId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...formData,
            year: Number(formData.year)
          })
        }
      );

      // Read response only once
      const data = await response.json();

      // Handle duplicate or other errors
      if (!response.ok) {
        alert("⚠️ " + data.message);
        return;
      }

      // Success alert
      alert(
        editingStudentId
          ? "Student updated successfully!"
          : "Student added successfully!"
      );

      // Reset form
      setFormData({
        name: "",
        rollNo: "",
        email: "",
        department: "",
        year: "",
        phone: ""
      });

      setEditingStudentId(null);
      setShowForm(false);

      // Refresh student records
      await fetchStudents();

    } catch (error) {
      alert("Something went wrong: " + error.message);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API_URL}/students/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete student");
      }

      await fetchStudents();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit = (student) => {
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      email: student.email,
      department: student.department,
      year: student.year,
      phone: student.phone || ""
    });

    setEditingStudentId(student._id);
    setShowForm(true);
    setError("");
  };



  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase()) ||
    student.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  const departments = new Set(
    students.map((student) => student.department)
  ).size;

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>


      <aside className="sidebar">
        <h2>StudentHub</h2>

        <nav>
          <button
            className={activePage === "Dashboard" ? "active" : ""}
            onClick={() => setActivePage("Dashboard")}
            title="Dashboard"
          >
            <span className="nav-icon">⌂</span>
            <span className="nav-text">Dashboard</span>
          </button>

          <button
            className={activePage === "Students" ? "active" : ""}
            onClick={() => setActivePage("Students")}
            title="Students"
          >
            <span className="nav-icon">♙</span>
            <span className="nav-text">Students</span>
          </button>

          <button
            className={activePage === "Settings" ? "active" : ""}
            onClick={() => setActivePage("Settings")}
            title="Settings"
          >
            <span className="nav-icon">⚙</span>
            <span className="nav-text">Settings</span>
          </button>
        </nav>
      </aside>



      <main className="main-content">
        {activePage === "Dashboard" && (
          <>
            <header>
              <div>
                <h1>Student Dashboard</h1>
                <p>Manage your student records in one place.</p>
              </div>

              <button
                className="add-btn"
                onClick={() => {
                  setError("");
                  setShowForm(!showForm);
                }}
              >
                {showForm ? "Cancel" : "+ Add Student"}
              </button>
            </header>
          </>
        )}

        {activePage === "Students" && (
          <>
            <header>
              <div>
                <h1>All Students</h1>
                <p>View and manage all registered students.</p>
              </div>
              <h3>Total: {students.length}</h3>
            </header>

            <section className="student-section">
              <h2>Student Details</h2>

              <table>
                <thead>
                  <tr>
                    <th align="center">Name</th>
                    <th align="center">Roll Number</th>
                    <th align="center">Email</th>
                    <th align="center">Department</th>
                    <th align="center">Year</th>
                    <th align="center">Phone</th>
                  </tr>
                </thead>

                <tbody>
                  {students.length > 0 ? (
                    students.map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.email}</td>
                        <td>{student.department}</td>
                        <td>{student.year}</td>
                        <td>{student.phone || "—"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No students registered yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </section>
          </>
        )}
        {activePage === "Settings" && (
          <>
            <header>
              <div>
                <h1>Settings</h1>
                <p>Customize your dashboard appearance.</p>
              </div>
            </header>

            <section className="student-section settings-section">
              <h2>Appearance</h2>

              <p>
                Current Theme: {darkMode ? "Dark Mode" : "Light Mode"}
              </p>

              <button
                className="add-btn"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              </button>
            </section>
          </>
        )}

        {activePage === "Dashboard" && (
          <>
            {showForm && (
              <section className="student-section form-section">
                <h2>{editingStudentId ? "Edit Student" : "Add New Student"}</h2>
                <form onSubmit={handleSubmit}>
                  <div className="form-grid">
                    <input
                      name="name"
                      placeholder="Student Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />

                    <input
                      name="rollNo"
                      placeholder="Roll Number"
                      value={formData.rollNo}
                      onChange={handleChange}
                      required
                    />

                    <input
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />

                    <input
                      name="department"
                      placeholder="Department"
                      value={formData.department}
                      onChange={handleChange}
                      required
                    />

                    <input
                      name="year"
                      type="number"
                      placeholder="Academic Year"
                      min="1"
                      max="5"
                      value={formData.year}
                      onChange={handleChange}
                      required
                    />

                    <input
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  {error && <p className="error-message">{error}</p>}

                  <button type="submit" className="add-btn">
                    {editingStudentId ? "Update Student" : "Save Student"}
                  </button>
                </form>
              </section>
            )}
          </>
        )}
        {activePage === "Dashboard" && (

          <section className="stats">
            <div className="stat-card">
              <h3>Total Students</h3>
              <h2>{students.length}</h2>
            </div>

            <div className="stat-card">
              <h3>Departments</h3>
              <h2>{departments}</h2>
            </div>

            <div className="stat-card">
              <h3>Academic Year</h3>
              <h2>2026–27</h2>
            </div>
          </section>
        )}
        {activePage === "Dashboard" && (
          <section className="student-section">
            <h2>Student Records</h2>

            <input
              type="text"
              placeholder="Search by name or roll number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
              <p>Loading students...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th align="center">Name</th>
                    <th align="center">Roll Number</th>
                    <th align="center">Email</th>
                    <th align="center">Department</th>
                    <th align="center">Year</th>
                    <th align="center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student._id}>
                        <td>{student.name}</td>
                        <td>{student.rollNo}</td>
                        <td>{student.email}</td>
                        <td>{student.department}</td>
                        <td>{student.year}</td>

                        <td>
                          <button
                            className="edit-btn"
                            onClick={() => handleEdit(student)}
                          >
                            Edit
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() => handleDelete(student._id)}
                          >
                            Delete
                          </button>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6">No students found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
