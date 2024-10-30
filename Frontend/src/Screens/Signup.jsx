import React, { useState } from "react";
import { TextField, Button, Container, Typography, Paper, Link } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post("http://localhost:5010/signup", { name, username, password });

            if (response.data.status) {
                alert(response.data.message);
                navigate("/login");  
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
                <Typography variant="h4" component="h1" align="center" gutterBottom>Signup</Typography>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
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
                <Button variant="contained" color="primary" fullWidth onClick={handleSignup} style={{ marginTop: "1rem" }}>
                    Signup
                </Button>
                <Typography align="center" style={{ marginTop: "1rem" }}>
                    Already have an account?{" "}
                    <Link href="/login" variant="body2">
                        Login
                    </Link>
                </Typography>
            </Paper>
        </Container>
    );
}

export default Signup;
