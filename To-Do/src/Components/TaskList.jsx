import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, category, toggleTaskInProgress, toggleTaskCompletion, editTask, deleteTask, completed }) => (
    <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">{category}</h2>
        <ul className="mb-8">
            {tasks.map(task => (
                <TaskItem
                    key={task.id}
                    task={task}
                    toggleTaskInProgress={toggleTaskInProgress}
                    toggleTaskCompletion={toggleTaskCompletion}
                    editTask={editTask}
                    deleteTask={deleteTask}
                    completed={completed}
                />
            ))}
        </ul>
    </div>
);

export default TaskList;