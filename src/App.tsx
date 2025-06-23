import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
// import Footer from './components/Footer';
import { v4 as uuidv4 } from 'uuid';

interface Message {
  role: string;
  content: string;
}

interface ChatEntry {
  id: string;
  title: string;
  messages: Message[];
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatEntry[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  // Load chat history on mount
  useEffect(() => {
    const stored = localStorage.getItem("chat-history");
    if (stored) {
      const parsed = JSON.parse(stored);
      setChatHistory(parsed);
      if (parsed.length > 0) setActiveChatId(parsed[0].id); // Set last chat as active
    }
  }, []);

  // Save chat history to localStorage
  useEffect(() => {
    localStorage.setItem("chat-history", JSON.stringify(chatHistory));
  }, [chatHistory]);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNewChat = () => {
    const newId = uuidv4();
    const newChat: ChatEntry = {
      id: newId,
      title: "New Chat",
      messages: [],
    };
    setChatHistory(prev => [newChat, ...prev]);
    setActiveChatId(newId);
    setSidebarOpen(false);
  };

  const handleClearHistory = () => {
    setChatHistory([]);
    setActiveChatId(null);
    localStorage.removeItem("chat-history");
  };

  const handleMessagesChange = (newMessages: Message[]) => {
    if (!activeChatId) return;

    const keywords = ["learn", "remedy", "treatment", "understand", "benefits"];
    const latestMessage = newMessages[newMessages.length - 1];
    const matched = latestMessage?.role === 'assistant' && keywords.some(k =>
      latestMessage.content.toLowerCase().includes(k)
    );

    setChatHistory(prev =>
      prev.map(chat => {
        if (chat.id === activeChatId) {
          const updatedTitle =
            matched && chat.title === "New Chat"
              ? latestMessage.content.slice(0, 30) + "..."
              : chat.title;

          return {
            ...chat,
            title: updatedTitle,
            messages: newMessages,
          };
        }
        return chat;
      })
    );
  };

  const currentMessages =
    chatHistory.find(chat => chat.id === activeChatId)?.messages || [];

  return (
    <ThemeProvider>
      <div className="h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onNewChat={handleNewChat}
          onClearHistory={handleClearHistory}
          chatHistory={chatHistory}
          setActiveChatId={setActiveChatId}
        />

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main */}
        <div className={`flex flex-col h-full transition-all duration-300 ${
          sidebarOpen ? 'lg:ml-64' : ''
        }`}>
          <Header
            onToggleSidebar={handleToggleSidebar}
            onNewChat={handleNewChat}
          />

          <main className="flex-1 overflow-hidden">
            <Chat
              messages={currentMessages}
              onMessagesChange={handleMessagesChange}
            />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
