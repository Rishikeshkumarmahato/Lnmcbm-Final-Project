import jwt from 'jsonwebtoken';
import StudentModel from '../models/student.schema.js';

export const verifyToken = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No authentication token, access denied'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find student
        const student = await StudentModel.findById(decoded.id).select('-password');
        if (!student) {
            return res.status(401).json({
                success: false,
                message: 'Token is not valid'
            });
        }

        // Add student to request object
        req.user = student;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Token is not valid'
        });
    }
}; 