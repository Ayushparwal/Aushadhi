import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import EmptyState from './EmptyState';

interface Message {
  role: string;
  content: string;
}

interface ChatProps {
  messages: Message[];
  onMessagesChange: (messages: Message[]) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onMessagesChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const inference = async (userInput: string) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
    };

    try {
      const chatCompletion = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `
                You are a helpful assistant.
                You're known as the AyurHaven bot for the AyurHaven platform – the go-to platform for holistic wellness and Ayurvedic living.
                You specialize in helping with Ayurveda-related questions, including topics like herbal remedies, dosha balancing, Ayurvedic nutrition, daily routines (dinacharya), seasonal practices (ritucharya), and natural healing methods.
                When a user approaches you with a query, you must answer appropriately and in detail, providing information rooted in Ayurvedic principles and classical wisdom.
                Your response must be purely in text format, with no special code snippets. Formatting MUST be proper and reader-friendly.
                You will politely decline to help with non-Ayurveda-related questions.
              `,
            },
            {
              role: "user",
              content: userInput,
            },
          ],
          max_tokens: 1000,
        },
        { headers }
      );

      const reply = chatCompletion.data.choices[0].message.content;

      // Replace "Thinking..." with actual response
      onMessagesChange([
        ...messages.slice(0, -1),
        {
          role: "system",
          content: reply || "Sorry, I couldn't respond.",
        },
      ]);
    } catch (err) {
      onMessagesChange([
        ...messages.slice(0, -1),
        {
          role: "system",
          content: "An error occurred while processing your request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message: string) => {
    if (isLoading) return;

    setIsLoading(true);
    
    // Add user message and thinking placeholder
    const newMessages = [
      ...messages,
      { role: "user", content: message },
      { role: "system", content: "Thinking..." },
    ];
    
    onMessagesChange(newMessages);
    await inference(message);
  };

  const handleSampleQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <EmptyState onSampleQuestion={handleSampleQuestion} />
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message}
                isLoading={isLoading && index === messages.length - 1}
              />
            ))}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
    </div>
  );
};

export default Chat;