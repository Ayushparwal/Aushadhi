import React from 'react';
import { MessageSquare, Plus, Settings, Sun, Moon, Trash2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onNewChat: () => void;
  onClearHistory: () => void;
  chatHistory: { id: string; title: string }[];
  setActiveChatId: (id: string) => void;
}


const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onNewChat,
  onClearHistory,
  chatHistory,
  setActiveChatId,
}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300 z-40 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } w-64`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-gray-900 dark:text-white">AyurHaven</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors duration-200"
          >
            <Plus className="w-5 h-5" />
            <span className="font-medium">New Chat</span>
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 px-4 overflow-y-auto">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Recent Chats
          </div>
          <div className="space-y-2">
            {chatHistory.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer group"
              >
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-700 dark:text-gray-300 truncate">{chat.title}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={onClearHistory}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Clear conversations</span>
          </button>
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            <span className="text-sm">{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors duration-200">
            <Settings className="w-4 h-4" />
            <span className="text-sm">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
