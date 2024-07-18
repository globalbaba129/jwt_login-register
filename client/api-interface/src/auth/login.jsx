import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [loginData, setLoginData] = useState({ name: '', password: '' });
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/login', loginData);
            setMessage('Login successful! Token: ' + response.data.token);
        } catch (error) {
            setMessage('Login failed: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="loginName">Name:</label>
                    <input
                        type="text"
                        id="loginName"
                        name="name"
                        value={loginData.name}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="loginPassword">Password:</label>
                    <input
                        type="password"
                        id="loginPassword"
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;
