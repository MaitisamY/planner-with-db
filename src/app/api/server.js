import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import bcrypt from 'bcrypt'
import { validationResult, body } from 'express-validator';
import helmet from 'helmet'
import User from './model/User.js'

const app = express();
const PORT = 3002;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Custom middleware to check request parameters based on route
// Middleware to check request parameters based on route
const requests = (req, res, next) => {
    if (req.path === '/signup') {
        // Validate and sanitize input for signup route
        [
            body('username').notEmpty().trim().escape(),
            body('email').isEmail().normalizeEmail(),
            body('password').isLength({ min: 6 }).trim(),
        ];
    } else if (req.path === '/login') {
        // Validate and sanitize input for login route
        [
            body('email').isEmail().normalizeEmail(),
            body('password').notEmpty().trim(),
        ];
    }

    // Applying validation middleware
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: 400, errors: errors.array() });
    }

    // Proceed to the next middleware
    next();
}

// Signup route
app.post('/signup', requests, async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if user exists
        const existingUser = await User.findOne({ where: { 
            [Op.or]: [
                { username },
                { email }
            ]
        }});

        for (const user of existingUser) {
            if (user.username === username && user.email === email) {
                return res.status(409).json({
                    status: 409,
                    message: 'User already exists'
                })
            }
            if (user.username === username) {
                return res.status(409).json({
                    status: 409,
                    message: 'Username already exists'
                });
            }
            if (user.email === email) {
                return res.status(409).json({
                    status: 409,
                    message: 'Email already exists'
                });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ username, email, password: hashedPassword });

        if (!newUser) {
            return res.status(500).json({
                status: 500,
                message: 'Credentials insertion failed. Try again!'
            })
        }
        else {
            res.status(201).json({
                status: 201,
                message: 'User created and logged in successfully',
            })
        }
    }
    catch (error) {
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        })
    }
})

// Login route
app.post('/login', requests, async (req, res) => {
    const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({
                status: 404,
                message: 'User not found'
            });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                status: 401,
                message: 'Invalid credentials'
            });
        }

        res.status(200).json({
            status: 200,
            message: 'Logged in successfully.'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: 'Internal server error'
        });
    }
});

// Adding security headers
app.use(helmet());

// Server status
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
