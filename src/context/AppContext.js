import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [tasks, setTasks] = useState([]);

    // On initial load, retrieve users and tasks from localStorage
    useEffect(() => {
        const savedUser = localStorage.getItem('user');

        // Check if 'users' already exists in localStorage, if not, initialize it
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify(existingUsers));
        }

        if (savedUser) {
            try {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                const savedTasks = localStorage.getItem(`tasks_${parsedUser.username}`);
                setTasks(savedTasks ? JSON.parse(savedTasks) : []);
            } catch (error) {
                console.error("Error parsing user or tasks from localStorage:", error);
                localStorage.removeItem('user');
                setUser(null);
            }
        }
    }, []);

    // Signup logic: Registers a new user and saves them in localStorage
    const signup = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username already exists
        const userExists = existingUsers.find(user => user.username === username);
        if (userExists) {
            throw new Error('Username already exists');
        }

        // Register new user
        const newUser = { username, password };
        const updatedUsers = [...existingUsers, newUser];

        // Save new user data in localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('user', JSON.stringify(newUser));
        setUser(newUser);
        setTasks([]);
    };

    // Login logic: Validates existing user credentials and logs them in
    const login = (username, password) => {
        const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
        const foundUser = existingUsers.find(user => user.username === username && user.password === password);

        if (foundUser) {
            localStorage.setItem('user', JSON.stringify(foundUser));
            setUser(foundUser);
            const savedTasks = localStorage.getItem(`tasks_${username}`);
            setTasks(savedTasks ? JSON.parse(savedTasks) : []);
        } else {
            throw new Error('Invalid username or password');
        }
    };

    // Logout logic: Clears the user session and resets tasks
    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setTasks([]);
    };

    // Task management: Adds a new task
    const addTask = (taskTitle) => {
        const newTask = { id: Date.now(), title: taskTitle, completed: false };
        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    };

    // Toggle task completion status
    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    };

    // Edit task title
    const editTask = (taskId, newTitle) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, title: newTitle } : task
        );
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    };

    // Delete task
    const deleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        setTasks(updatedTasks);
        localStorage.setItem(`tasks_${user.username}`, JSON.stringify(updatedTasks));
    };

    return (
        <AppContext.Provider value={{ user, tasks, login, signup, logout, addTask, toggleTaskCompletion, editTask, deleteTask }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
