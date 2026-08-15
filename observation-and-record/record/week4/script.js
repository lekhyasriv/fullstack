class Student {
    constructor(name, rollNumber, department, cgpa) {
        this.name = name;
        this.rollNumber = rollNumber;
        this.department = department;
        this.cgpa = cgpa;
    }

    getProfile() {
        return `
            <div class="student-card">
                <h2>Student Profile</h2>

                <div class="detail">
                    <span>Name</span>
                    <span>: ${this.name}</span>
                </div>

                <div class="detail">
                    <span>Roll No</span>
                    <span>: ${this.rollNumber}</span>
                </div>

                <div class="detail">
                    <span>Department</span>
                    <span>: ${this.department}</span>
                </div>

                <div class="detail">
                    <span>CGPA</span>
                    <span>: ${this.cgpa}</span>
                </div>
            </div>
        `;
    }
}

function generateProfile() {

    const name = document.getElementById("studentName").value;
    const rollNumber = document.getElementById("studentRoll").value;
    const department = document.getElementById("studentDept").value;
    const cgpa = document.getElementById("studentCgpa").value;

    if (name === "" || rollNumber === "" ||
        department === "" || cgpa === "") {

        alert("Please enter all student details.");
        return;
    }

    const student = new Student(
        name,
        rollNumber,
        department,
        cgpa
    );

    const output = document.getElementById("output");

    output.innerHTML = student.getProfile();
}