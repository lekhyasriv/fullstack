
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// 1. Add a new student
// Add a new student with duplicate checking
router.post("/", async (req, res) => {
    try {
        const { name, rollNo, email, department, year, phone } = req.body;

        // Check for existing roll number or email
        const existingStudent = await Student.findOne({
            $or: [
                { rollNo: rollNo },
                { email: email }
            ]
        });

        if (existingStudent) {
            if (existingStudent.rollNo === rollNo) {
                return res.status(409).json({
                    message: "A student with this Roll Number already exists!"
                });
            }

            return res.status(409).json({
                message: "A student with this Email already exists!"
            });
        }

        const student = new Student({
            name, rollNo, email, department, year, phone
        });

        await student.save();

        res.status(201).json({
            message: "Student added successfully!",
            student
        });

    } catch (error) {
        console.log("POST ERROR:", error.message);

        res.status(400).json({
            message: error.message
        });
    }
});

// 2. Get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 3. Search students by name
router.get("/search", async (req, res) => {
    try {
        const students = await Student.find({
            name: { $regex: req.query.name || "", $options: "i" }
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// 4. Update student details
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// 5. Delete a student
router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
