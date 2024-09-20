import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            login(username, password);
            navigate('/'); // Redirect to Task Manager after login
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-form" style={{ marginTop: 90 }}>
            <h2 style={{ marginBottom: 20, textAlign: "center" }}>Login</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
            <p style={{ marginTop: 20 }}>
                Don't have an account? <Link to="/signup">Sign Up Here</Link>
            </p>
        </div>
    );
};

export default Login;
