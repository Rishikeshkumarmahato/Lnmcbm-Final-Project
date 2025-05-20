import express from 'express';
import StudentModel from '../models/student.schema.js';
import EnrollmentModel from '../models/enrollment.schema.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Get student profile
router.get('/', verifyToken, async (req, res) => {
    try {
        const student = await StudentModel.findById(req.user.id)
            .select('-password')
            .populate('enrolledCourses');
            
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching profile',
            error: error.message
        });
    }
});

// Get student dashboard with enrolled courses
router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const student = await StudentModel.findById(req.user.id)
            .select('-password');
            
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        const enrollments = await EnrollmentModel.find({ studentId: req.user.id });
        
        res.status(200).json({
            success: true,
            data: {
                student,
                enrollments,
                stats: {
                    totalCourses: enrollments.length,
                    completedCourses: enrollments.filter(e => e.status === 'completed').length,
                    inProgressCourses: enrollments.filter(e => e.status === 'active').length
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching dashboard',
            error: error.message
        });
    }
});

// Update student profile
router.put('/update', verifyToken, async (req, res) => {
    try {
        const { username, bio, profilePicture } = req.body;
        
        const student = await StudentModel.findById(req.user.id);
        if (!student) {
            return res.status(404).json({
                success: false,
                message: 'Student not found'
            });
        }

        if (username) student.username = username;
        if (bio) student.bio = bio;
        if (profilePicture) student.profilePicture = profilePicture;

        await student.save();
        res.status(200).json({
            success: true,
            data: student
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message
        });
    }
});

export default router; 