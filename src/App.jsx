import React, { useState, createContext, useContext } from 'react';
import Layout from './components/Layout';
import TaskManager from './components/TaskManager';
import ApiDataDisplay from './components/ApiDataDisplay';
import Card from './components/Card';

// Create Theme Context
export const ThemeContext = createContext();

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to document
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <Layout onThemeToggle={toggleTheme} isDarkMode={isDarkMode}>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          
          {/* Navigation Tabs */}
          <Card className="mb-6">
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-2 px-4 font-medium ${
                  activeTab === 'tasks'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                Task Manager
              </button>
              <button
                onClick={() => setActiveTab('api')}
                className={`py-2 px-4 font-medium ${
                  activeTab === 'api'
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                API Data
              </button>
            </div>
          </Card>

          {/* Content based on active tab */}
          {activeTab === 'tasks' && <TaskManager />}
          {activeTab === 'api' && <ApiDataDisplay />}
        </div>
      </Layout>
    </ThemeContext.Provider>
  );
}

export default App;