import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => (
    <button
        className="mb-8 px-4 py-2 border rounded shadow-sm focus:outline-none"
        onClick={toggleTheme}
    >
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
    </button>
);

export default ThemeToggle;