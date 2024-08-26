import React, { useState, useEffect } from 'react';
import './App.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [categories, setCategories] = useState(['Work', 'Personal']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [theme, setTheme] = useState('light');

  // Load tasks and theme from localStorage on initial render
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    const storedTheme = localStorage.getItem('theme');
    if (storedTasks) {
      setTasks(storedTasks);
    }
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, []);

  // Save tasks to localStorage whenever the tasks array changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save the current theme to localStorage whenever the theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Function to add a new task
  const addTask = () => {
    if (taskInput.trim()) {
      const newTask = {
        id: tasks.length,
        text: taskInput,
        completed: false,
        inProgress: false,
        category: selectedCategory,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      toast.success('Task added successfully!');
    } else {
      toast.error('Please enter a task!');
    }
  };

  // Function to toggle the completion status of a task
  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed, inProgress: false } : task
    ));
    toast.info('Task status updated to Completed!');
  };

  // Function to toggle the "in progress" status of a task
  const toggleTaskInProgress = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, inProgress: !task.inProgress, completed: false } : task
    ));
    toast.info('Task status updated to In Progress!');
  };

  // Function to delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.error('Task deleted!');
  };

  // Function to start editing a task
  const editTask = (task) => {
    setIsEditing(true);
    setTaskInput(task.text);
    setEditTaskId(task.id);
  };

  // Function to save the edited task
  const saveTask = () => {
    setTasks(tasks.map(task =>
      task.id === editTaskId ? { ...task, text: taskInput } : task
    ));
    setIsEditing(false);
    setTaskInput('');
    setEditTaskId(null);
    toast.success('Task edited successfully!');
  };

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Categorize tasks into Completed, In Progress, and Incomplete
  const completedTasks = tasks.filter(task => task.completed);
  const inProgressTasks = tasks.filter(task => task.inProgress && !task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed && !task.inProgress);

  return (
    <>
      {/* Main container with dynamic theme classes */}
      <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
        <h1 className="text-4xl font-bold mb-8">To-Do List</h1>

        {/* Button to toggle between light and dark themes */}
        <button
          className="mb-8 px-4 py-2 border rounded shadow-sm focus:outline-none"
          onClick={toggleTheme}
        >
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>

        <div className="w-full max-w-md">
          <div className="mb-4">
            {/* Input field for adding or editing tasks */}
            <input
              type="text"
              className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none mb-2 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-white border-gray-700'}`}
              placeholder="Add a new task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
            />

            {/* Dropdown to select the category for the task */}
            <select
              className={`w-full px-4 py-2 border rounded shadow-sm focus:outline-none mb-2 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-800 text-white border-gray-700'}`}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Button to add or save a task */}
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

          <div className="mt-8">
            {/* Section for tasks in progress */}
            <h2 className="text-2xl font-bold mb-4">In Progress</h2>
            <ul className="mb-8">
              {inProgressTasks.map(task => (
                <li
                  key={task.id}
                  className={`flex justify-between items-center p-4 rounded shadow-sm mb-2 transition-all duration-300 ${theme === 'light' ? 'bg-yellow-100' : 'bg-yellow-700'}`}
                >
                  <span className="flex-1" onClick={() => toggleTaskInProgress(task.id)}>
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
                    <button
                      className="text-green-500 hover:text-green-700 transition mx-2"
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      Complete
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Section for incomplete tasks */}
            <h2 className="text-2xl font-bold mb-4">Incomplete</h2>
            <ul className="mb-8">
              {incompleteTasks.map(task => (
                <li
                  key={task.id}
                  className={`flex justify-between items-center p-4 rounded shadow-sm mb-2 transition-all duration-300 ${theme === 'light' ? 'bg-red-100' : 'bg-red-700'}`}
                >
                  <span className="flex-1" onClick={() => toggleTaskInProgress(task.id)}>
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
                    <button
                      className="text-yellow-500 hover:text-yellow-700 transition mx-2"
                      onClick={() => toggleTaskInProgress(task.id)}
                    >
                      In Progress
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Section for completed tasks */}
            <h2 className="text-2xl font-bold mb-4">Completed</h2>
            <ul>
              {completedTasks.map(task => (
                <li
                  key={task.id}
                  className={`flex justify-between items-center p-4 rounded shadow-sm mb-2 transition-all duration-300 line-through ${theme === 'light' ? 'bg-green-100 text-gray-500' : 'bg-green-700 text-gray-300'}`}
                >
                  <span className="flex-1">
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
      </div>
      <ToastContainer />
    </>
  );
}

export default App;