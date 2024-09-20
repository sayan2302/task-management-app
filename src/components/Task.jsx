import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MdDeleteForever, MdEdit } from 'react-icons/md';
import { IoIosSave } from 'react-icons/io';

const Task = ({ task }) => {
    const { toggleTaskCompletion, editTask, deleteTask } = useContext(AppContext);
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(task.title);

    const handleEdit = () => {
        if (isEditing && newTitle.trim()) {
            editTask(task.id, newTitle);
        }
        setIsEditing(!isEditing);
    };

    return (
        <li className={`task ${task.completed ? 'completed' : ''}`} style={{ cursor: "pointer" }}>
            {isEditing ? (
                <input
                    style={{ minWidth: "400px" }}
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    required
                />
            ) : (
                <span style={{ minWidth: "400px", margin:"0px 20px" }} onClick={() => toggleTaskCompletion(task.id)}>{task.title}</span>
            )}
            <div className="task-buttons">
                <button style={{ marginRight: 10 }} onClick={handleEdit}>
                    {isEditing ? <IoIosSave style={{ fontSize: "20px" }} /> : <MdEdit style={{ fontSize: "20px" }} />}
                    {/* {isEditing ? 'Save' : 'Edit'} */}
                </button>
                <button style={{ marginRight: 10 }} className='delete-button' onClick={() => deleteTask(task.id)}><MdDeleteForever style={{ fontSize: "20px" }} /></button>
            </div>
        </li>
    );
};

export default Task;
