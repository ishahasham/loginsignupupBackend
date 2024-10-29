const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const PORT = 5010;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory storage for demonstration purposes
const users = [];

// Secret key for JWT
const JWT_SECRET = "your_secret_key_here";

// Signup route
app.post("/signup", async (req, res) => {
    const { name, username, password } = req.body;
    
    // Check if username already exists
    const existingUser = users.find((u) => u.username === username);
    if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Store the new user with name, username, and hashed password
    users.push({ name, username, password: hashedPassword });
    res.json({ message: "User registered successfully" });
});

// Login route
app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);
    
    if (user && (await bcrypt.compare(password, user.password))) {
        // Generate a JWT token
        const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: "1h" });
        res.json({ token });
    } else {
        res.status(401).json({ error: "Invalid username or password" });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
