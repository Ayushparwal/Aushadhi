import React from 'react';
import { Menu, MessageSquare, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onNewChat }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">AyurHaven</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNewChat}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors duration-200"
          >
            <span className="text-sm font-medium">New Chat</span>
          </button>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          >
            {theme === 'dark' ? 
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" /> : 
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            }
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;