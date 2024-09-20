import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import TaskList from './TaskList';
import { IoMdAddCircle } from 'react-icons/io';

const TaskManager = () => {
    const { addTask } = useContext(AppContext);
    const [taskTitle, setTaskTitle] = useState('');

    const handleAddTask = (e) => {
        e.preventDefault();
        if (taskTitle.trim()) {
            addTask(taskTitle);
            setTaskTitle('');
        }
    };

    return (
        <div className="task-manager" style={{ marginTop: 90 }}>
            <h2 style={{ marginBottom: 30, textAlign: "center" }}>Your Tasks</h2>
            <form onSubmit={handleAddTask} className="add-task-form">
                <input
                    type="text"
                    placeholder="Enter new task"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                    required
                />
                <button type="submit" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}> <IoMdAddCircle style={{ fontSize: "22px", marginRight: 5, marginBottom: 3 }} /> Add Task</button>
            </form>
            <TaskList />
        </div>
    );
};

export default TaskManager;
