import React from 'react';
import ReactMarkdown from 'react-markdown';
import { User, Bot } from 'lucide-react';

interface Message {
  role: string;
  content: string;
}

interface ChatMessageProps {
  message: Message;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLoading }) => {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  return (
    <div className={`group relative px-4 py-6 ${isUser ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-900'}`}>
      <div className="max-w-4xl mx-auto flex gap-4">
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser 
            ? 'bg-emerald-500' 
            : 'bg-gradient-to-br from-purple-500 to-pink-500'
        }`}>
          {isUser ? (
            <User className="w-5 h-5 text-white" />
          ) : (
            <Bot className="w-5 h-5 text-white" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {isUser ? 'You' : 'AyurHaven Assistant'}
          </div>
          
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {isLoading && message.content === 'Thinking...' ? (
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span className="text-gray-500 dark:text-gray-400">Thinking...</span>
              </div>
            ) : (
              <ReactMarkdown
                className="text-gray-800 dark:text-gray-200 leading-relaxed"
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-800 dark:text-gray-200">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-white">{children}</strong>,
                  code: ({ children }) => (
                    <code className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
                      {children}
                    </code>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;