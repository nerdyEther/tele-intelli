import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Brought to you by <a href="https://github.com/NerdyEther" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">nerdyEther</a>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="mailto:ethre1926@gmail.com" 
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z" fill="currentColor" />
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/neelansh-bansiwal-91b586237/" 
            className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM15 15V12C15 10.8 14.2 10 13 10C12.2 10 11.5 10.4 11.2 11H11V10H9V15H11V12.5C11 11.9 11.4 11.5 12 11.5C12.6 11.5 13 11.9 13 12.5V15H15ZM6 15H8V10H6V15ZM7 9C7.55228 9 8 8.55228 8 8C8 7.44772 7.55228 7 7 7C6.44772 7 6 7.44772 6 8C6 8.55228 6.44772 9 7 9Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;