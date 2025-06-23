import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-4xl mx-auto p-4">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex items-end gap-3 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-400 transition-colors duration-200">
            <button
              type="button"
              className="flex-shrink-0 p-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about Ayurveda..."
              disabled={disabled}
              className="flex-1 resize-none bg-transparent border-none outline-none py-3 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 min-h-[24px] max-h-[200px]"
              rows={1}
            />
            
            <button
              type="submit"
              disabled={!message.trim() || disabled}
              className={`flex-shrink-0 p-3 rounded-xl transition-all duration-200 ${
                message.trim() && !disabled
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </form>
        
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center mt-3">
          AyurHaven can make mistakes. Consider checking important information.
        </div>
      </div>
    </div>
  );
};

export default ChatInput;