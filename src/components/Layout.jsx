import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children, onThemeToggle, isDarkMode }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Navbar onThemeToggle={onThemeToggle} isDarkMode={isDarkMode} />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;