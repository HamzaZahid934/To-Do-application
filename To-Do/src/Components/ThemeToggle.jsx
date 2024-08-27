import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => (
    <div className="absolute top-4 left-3 inline-flex items-center cursor-pointer">
        <input
            type="checkbox"
            id="theme-toggle-checkbox"
            checked={theme === 'light'}
            onChange={toggleTheme}
            className="sr-only"

        />
        <label
            htmlFor="theme-toggle-checkbox"
            className="flex-row items-center cursor-pointer "
        > Switch Theme
            <div className="relative">
                <div
                    className={`block w-14 h-8 rounded-full ${theme === 'dark' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                ></div>
                <div
                    className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white transition-transform ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
                        }`}
                ></div>
            </div>
        </label>
    </div>
);

export default ThemeToggle;