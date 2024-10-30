import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:5010/login", { username, password });
            
            if (response.data.status) {
                alert("Login successful!");
                navigate("/dashboard");  
            } else {
                alert(response.data.message); 
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <Container maxWidth="sm" style={{ marginTop: "50px" }}>
            <Paper elevation={3} style={{ padding: "2rem" }}>
                <Typography variant="h4" component="h1" align="center" gutterBottom>Login</Typography>
                <TextField
                    label="Username"
                    fullWidth
                    margin="normal"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth onClick={handleLogin} style={{ marginTop: "1rem" }}>
                    Login
                </Button>
                <Typography align="center" style={{ marginTop: "1rem" }}>
                    Don't have an account?{" "}
                    <Link href="/signup" variant="body2">
                        Signup
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Login;
