import React from 'react';

const TaskItem = ({ task, toggleTaskInProgress, toggleTaskCompletion, editTask, deleteTask, completed, theme }) => (
    <li
        className={`flex justify-between items-center p-4 rounded shadow-sm mb-2 transition-all duration-300 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-black border-gray-700'} ${completed ? 'line-through' : ''}  ${task.inProgress ? 'bg-yellow-100' : 'bg-red-100'}`}
    >
        <span className="flex-1" onClick={() => toggleTaskInProgress(task.id)}>
            {task.text} - <strong>{task.category}</strong>
        </span>
        <div>
            <button
                className="text-blue-500 hover:text-blue-700 transition mx-2"
                onClick={() => editTask(task)}
            >
                Edit
            </button>
            <button
                className="text-red-500 hover:text-red-700 transition"
                onClick={() => deleteTask(task.id)}
            >
                Delete
            </button>
            {!completed && !task.inProgress && (
                <button
                    className="text-yellow-500 hover:text-yellow-700 transition mx-2"
                    onClick={() => toggleTaskInProgress(task.id)}
                >
                    In Progress
                </button>
            )}
            {!completed && task.inProgress && (
                <button
                    className="text-green-500 hover:text-green-700 transition mx-2"
                    onClick={() => toggleTaskCompletion(task.id)}
                >
                    Complete
                </button>
            )}
        </div>
    </li>
);

export default TaskItem;