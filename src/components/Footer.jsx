import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} PLP Task Manager. All rights reserved.
        </p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">About</a>
          <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Contact</a>
          <a href="#" className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;