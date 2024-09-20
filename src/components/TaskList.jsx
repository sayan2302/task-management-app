import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import Task from './Task';

const TaskList = () => {
    const { tasks } = useContext(AppContext);

    if (tasks.length === 0) {
        return <p style={{ marginTop: 100, border: "2px dotted gray", textAlign: 'center' }}>No tasks added yet!</p>;
    }

    return (
        <ul className="task-list">
            {tasks.map(task => (
                <Task key={task.id} task={task} />
            ))}
        </ul>
    );
};

export default TaskList;
