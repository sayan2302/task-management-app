import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const { signup } = useContext(AppContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            signup(username, password);
            navigate('/'); // Redirect to Task Manager after signup
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="signup-form" style={{ marginTop: 90 }}>
            <h2 style={{ marginBottom: 20, textAlign: "center" }}>Sign Up</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSignup}>
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
                <button type="submit">Sign Up</button>
            </form>
            <p style={{ marginTop: 20 }}>
                Already have an account? <Link to="/login">Login Here</Link>
            </p>
        </div >
    );
};

export default Signup;
