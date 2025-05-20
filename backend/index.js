import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import dbConnection from './config/db.js';
import StudentModel from './models/student.schema.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import profileRoutes from './routes/profile.routes.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Initialize database connection
const initializeDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }
        await dbConnection();
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Failed to initialize database:', error);
        process.exit(1);
    }
};

// Start the server and connect to database
const PORT = process.env.PORT || 5000;
initializeDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// Routes
app.use('/api/enrollment', enrollmentRoutes);
app.use('/api/profile', profileRoutes);

app.get('/register',(req,res)=>{
    res.send('Hello World');
});

app.post('/register', async (req,res) => {
    try {
        const {username, email, phone, password} = req.body;
        
        // Check if email exists
        const emailExists = await StudentModel.findOne({email: email});
        if(emailExists) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        // Check if phone exists
        const phoneExists = await StudentModel.findOne({phone: phone});
        if(phoneExists) {
            return res.status(400).json({
                success: false,
                message: "Phone number already exists"
            });
        }

        // Create new student
        const newStudent = new StudentModel({
            username,
            email,
            phone,
            password
        });

        await newStudent.save();

        // Generate JWT token
        const token = jwt.sign(
            { id: newStudent._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Return success without sensitive data
        const userData = {
            username: newStudent.username,
            email: newStudent.email,
            phone: newStudent.phone
        };

        res.status(200).json({
            success: true,
            message: "User registered successfully",
            user: userData,
            token
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find student
        const student = await StudentModel.findOne({ email });
        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student not found"
            });
        }

        // Check password
        if (student.password !== password) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        // Update last login
        student.lastLogin = Date.now();
        await student.save();
        
        // Create a safe user object without sensitive data
        const userData = {
            username: student.username,
            email: student.email,
            phone: student.phone
        };

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: userData,
            token
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});