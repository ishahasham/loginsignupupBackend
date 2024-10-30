import express from "express";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import cors from "cors";
import userModel from "./userSchema.js";

const app = express();
const PORT = 5010;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB uri
const DBURI = "mongodb+srv://ishahasham:isha123@cluster0.r67vq.mongodb.net/yourDatabaseName";

// Connect to MongoDB
mongoose.connect(DBURI);


mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.log("MongoDB connection error:", err));


// Signup route
app.post("/signup", async (req, res) => {
    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        res.json({
            message: "Required fields are missing",
            status: false,
        });
        return;
    }

    // Check if username already exists //use can use this for email 
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
        res.json({
            message: "Username already exists",
            status: false,
        });
        return ;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashpassword", hashedPassword)

    // Create the user in the db
    const createuser = await userModel.create({
        name,
        username,
        password: hashedPassword,
    });

    res.json({
        message: "User created successfully",
        status: true,
        data: createuser,
    });
});

// Login route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.json({
            message: "Required fields are missing",
            status: false,
        });
        return;
    }

    // Check if user exists
    const user = await userModel.findOne({ username });
    if (!user) {
        res.json({
            message: "Invalid username or password",
            status: false,
        });
        return;
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        res.json({
            message: "Invalid username or password",
            status: false,
        });
        return;
    }

    // Login successful
    res.json({
        message: "Login successful",
        status: true,
    });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
