import React from 'react';

const CategorySelect = ({ categories, selectedCategory, setSelectedCategory }) => (
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
);

export default CategorySelect;