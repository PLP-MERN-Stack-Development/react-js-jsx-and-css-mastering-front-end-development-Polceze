import React from 'react';
import Button from './Button';

const Navbar = ({ onThemeToggle, isDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold">PLP Task Manager</h1>
        <Button
          variant="secondary"
          size="sm"
          onClick={onThemeToggle}
          className="flex items-center gap-2"
        >
          {isDarkMode ? '☀️ Light' : '🌙 Dark'}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;