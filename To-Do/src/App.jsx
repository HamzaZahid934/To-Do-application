import React, { useState, useEffect } from 'react';
import './App.css'

function App() {

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [categories, setCategories] = useState(['Work', 'Personal']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: tasks.length,
        text: taskInput,
        completed: false,
        category: selectedCategory
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (task) => {
    setIsEditing(true);
    setTaskInput(task.text);
    setEditTaskId(task.id);
  };

  const saveTask = () => {
    setTasks(tasks.map(task =>
      task.id === editTaskId ? { ...task, text: taskInput } : task
    ));
    setIsEditing(false);
    setTaskInput('');
    setEditTaskId(null);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">To-Do List</h1>
        <div className="w-full max-w-md">
          <div className="mb-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              placeholder="Add a new task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />
            <select
              className="w-full px-4 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>
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
          <ul className="mt-4">
            {tasks.map(task => (
              <li
                key={task.id}
                className={`flex justify-between items-center bg-white p-4 rounded shadow-sm mb-2 transition-all duration-300 transform ${task.completed ? 'line-through text-gray-500' : ''}`}
              >
                <span className="flex-1" onClick={() => toggleTaskCompletion(task.id)}>
                  {task.text} - <em>{task.category}</em>
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default App
