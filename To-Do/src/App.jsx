import React, { useState, useEffect } from 'react';
import TaskInput from './Components/TaskInput';
import TaskList from './Components/TaskList';
import ThemeToggle from './Components/ThemeToggle';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [categories, setCategories] = useState(['Work', 'Personal']);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [theme, setTheme] = useState('light');

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

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

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

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed, inProgress: false } : task
    ));
    toast.info('Task status updated to Completed!');
  };

  const toggleTaskInProgress = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, inProgress: !task.inProgress, completed: false } : task
    ));
    toast.info('Task status updated to In Progress!');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.error('Task deleted!');
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
    toast.success('Task edited successfully!');
  };

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const completedTasks = tasks.filter(task => task.completed);
  const inProgressTasks = tasks.filter(task => task.inProgress && !task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed && !task.inProgress);

  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen ${theme === 'light' ? 'bg-gray-100 text-black' : 'bg-gray-900 text-white'}`}>
        <h1 className="text-4xl font-bold mb-8">To-Do List</h1>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <div className="w-full max-w-md">
          <TaskInput
            taskInput={taskInput}
            setTaskInput={setTaskInput}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isEditing={isEditing}
            addTask={addTask}
            saveTask={saveTask}
            theme={theme}
          />

          <TaskList
            tasks={inProgressTasks}
            category="In Progress"
            toggleTaskInProgress={toggleTaskInProgress}
            toggleTaskCompletion={toggleTaskCompletion}
            editTask={editTask}
            deleteTask={deleteTask}
          />
          <TaskList
            tasks={incompleteTasks}
            category="Incomplete"
            toggleTaskInProgress={toggleTaskInProgress}
            editTask={editTask}
            deleteTask={deleteTask}
          />
          <TaskList
            tasks={completedTasks}
            category="Completed"
            editTask={editTask}
            deleteTask={deleteTask}
            completed
          />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default App;