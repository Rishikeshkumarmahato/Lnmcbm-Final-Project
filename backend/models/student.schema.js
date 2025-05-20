import mongoose from "mongoose";

const student = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 25
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
    },
    password: {
        type: String,
        required: true,
        minLength: [5, 'Password must be at least 5 characters'],
        maxLength: [20, 'Password cannot exceed 20 characters']
    },
    profilePicture: {
        type: String,
        default: ''
    },
    bio: {
        type: String,
        default: '',
        maxLength: 500
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Enrollment'
    }],
    lastLogin: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const StudentModel = mongoose.model('Student', student);
export default StudentModel;