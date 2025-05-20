import express from 'express';
import EnrollmentModel from '../models/enrollment.schema.js';
import StudentModel from '../models/student.schema.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get all enrollments for a student
router.get('/my-courses', verifyToken, async (req, res) => {
    try {
        const enrollments = await EnrollmentModel.find({ studentId: req.user._id });
        res.status(200).json({
            success: true,
            data: enrollments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching enrollments',
            error: error.message
        });
    }
});

// Enroll in a course
router.post('/enroll', verifyToken, async (req, res) => {
    try {
        const { courseId, courseName, instructor } = req.body;

        // Check if student exists
        const student = await StudentModel.findById(req.user._id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        // Check if already enrolled
        const existingEnrollment = await EnrollmentModel.findOne({
            studentId: req.user._id,
            courseId: courseId
        });

        if (existingEnrollment) {
            return res.status(400).json({
                success: false,
                message: 'Already enrolled in this course'
            });
        }

        // Create new enrollment
        const enrollment = new EnrollmentModel({
            studentId: req.user._id,
            courseId,
            courseName,
            instructor
        });

        // Save enrollment
        await enrollment.save();

        // Add enrollment to student's enrolledCourses array
        student.enrolledCourses.push(enrollment._id);
        await student.save();

        res.status(201).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error enrolling in course',
            error: error.message
        });
    }
});

// Update course progress
router.put('/progress/:enrollmentId', verifyToken, async (req, res) => {
    try {
        const { progress, completedModule } = req.body;
        const enrollment = await EnrollmentModel.findOne({
            _id: req.params.enrollmentId,
            studentId: req.user._id
        });

        if (!enrollment) {
            return res.status(404).json({
                success: false,
                message: 'Enrollment not found'
            });
        }

        if (progress) enrollment.progress = progress;
        if (completedModule) {
            if (!enrollment.completedModules.includes(completedModule)) {
                enrollment.completedModules.push(completedModule);
            }
        }
        enrollment.lastAccessed = Date.now();

        await enrollment.save();
        res.status(200).json({
            success: true,
            data: enrollment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating progress',
            error: error.message
        });
    }
});

// Get enrollment status
router.get('/status/:courseId', verifyToken, async (req, res) => {
    try {
        const enrollment = await EnrollmentModel.findOne({
            studentId: req.user._id,
            courseId: req.params.courseId
        });

        if (!enrollment) {
            return res.status(200).json({
                success: true,
                data: { enrolled: false }
            });
        }

        res.status(200).json({
            success: true,
            data: { enrolled: true, enrollment }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error checking enrollment status',
            error: error.message
        });
    }
});

// Get all enrollments for dashboard
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const enrollments = await EnrollmentModel.find({ studentId: req.user._id })
            .sort({ lastAccessed: -1 });

        const stats = {
            totalCourses: enrollments.length,
            completedCourses: enrollments.filter(e => e.status === 'completed').length,
            inProgressCourses: enrollments.filter(e => e.status === 'active').length
        };

        res.status(200).json({
            success: true,
            data: {
                enrollments,
                stats
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard data',
            error: error.message
        });
    }
});

export default router; 