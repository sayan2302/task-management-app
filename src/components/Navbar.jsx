import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Navbar = () => {
    const { user, logout } = useContext(AppContext);

    return (
        <div className="navbar">
            <div style={{ display: "flex", alignItems: "center" }}>
                <h1>Task Manager</h1>
                <h5>~by sayan</h5>
            </div>
            {user && (
                <button onClick={logout}>
                    Logout ({user.username})
                </button>
            )}
        </div>
    );
};

export default Navbar;
