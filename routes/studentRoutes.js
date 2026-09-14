
const express = require("express");

const router = express.Router();

const students = require("../data/students");

// GET all students
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        students: students
    });
});

// GET student by ID
router.get("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            message: "Student ID must be a number"
        });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    res.status(200).json({
        success: true,
        student: student
    });
});

// POST create a new student
router.post("/", (req, res) => {
    const { name, course } = req.body;

    if (
        typeof name !== "string" ||
        typeof course !== "string" ||
        !name.trim() ||
        !course.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Name and course are required"
        });
    }

    const newId = students.length
        ? Math.max(...students.map(s => s.id)) + 1
        : 1;

    const newStudent = {
        id: newId,
        name: name.trim(),
        course: course.trim()
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student created successfully",
        student: newStudent
    });
});

// PUT update a student
router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            message: "Student ID must be a number"
        });
    }

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const { name, course } = req.body;

    if (
        typeof name !== "string" ||
        typeof course !== "string" ||
        !name.trim() ||
        !course.trim()
    ) {
        return res.status(400).json({
            success: false,
            message: "Name and course are required"
        });
    }

    student.name = name.trim();
    student.course = course.trim();

    res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student: student
    });
});

// DELETE a student
router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id)) {
        return res.status(400).json({
            success: false,
            message: "Student ID must be a number"
        });
    }

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1)[0];

    res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        student: deletedStudent
    });
});

module.exports = router;