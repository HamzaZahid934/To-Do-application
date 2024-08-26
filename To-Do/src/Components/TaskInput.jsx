import React from 'react';
import CategorySelect from './CategorySelect';


const TaskInput = ({ taskInput, setTaskInput, categories, selectedCategory, setSelectedCategory, isEditing, addTask, saveTask }) => (
    <div className="mb-4">
        <input
            type="text"
            className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none mb-2 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-white border-gray-700'}`}
            placeholder="Add a new task"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
        />
        <CategorySelect categories={categories} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
        {isEditing ? (
            <button
                className="w-full bg-green-500 text-white px-4 py-2 rounded shadow-sm hover:bg-green-600 transition"
                onClick={saveTask}
            >
                Save Task
            </button>
        ) : (
            <button
                className="w-full bg-blue-500 text-white px-4 py-2 rounded shadow-sm hover:bg-blue-600 transition"
                onClick={addTask}
            >
                Add Task
            </button>
        )}
    </div>
);

export default TaskInput;