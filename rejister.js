import User from "./product.js";
import bcrypt  from "bcrypt";
import cors from "cors";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Auth");

const app = express();
app.use(express.json());
app.use(cors()); 

// Registration route
app.post('/register', async (req, res) => {
    const { name, password } = req.body;
    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ name });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password and save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, password: hashedPassword });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).send(error.message);
    }
});


// Login route
app.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, 'my_jwt_secret', { expiresIn: '1h' });
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});


// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});