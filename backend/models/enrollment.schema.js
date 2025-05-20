import mongoose from "mongoose";

const enrollment = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    courseId: {
        type: String,
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    enrollmentDate: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0
    },
    completedModules: [{
        type: String
    }],
    status: {
        type: String,
        enum: ['active', 'completed', 'dropped'],
        default: 'active'
    },
    lastAccessed: {
        type: Date,
        default: Date.now
    }
});

const EnrollmentModel = mongoose.model('Enrollment', enrollment);
export default EnrollmentModel; 