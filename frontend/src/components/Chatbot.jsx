// Chatbot.js
import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { useChatStore } from '../store/chatStore';
import { initializeAI, generateResponse } from '../services/ai';
import { ChatInput } from './ChatInput';

// Initialize AI (you can also move this to App.js if you prefer)
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
initializeAI(GEMINI_API_KEY);

export function Chatbot() {
  const { messages, isTyping, addMessage, setIsTyping, isDarkMode } =
    useChatStore();

  // Ref for the scrollable container
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll only the messages container
  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message) => {
    addMessage(message, 'user');
    setIsTyping(true);

    try {
      const response = await generateResponse(message);
      addMessage(response, 'assistant');
    } catch (error) {
      addMessage('Sorry, I encountered an error. Please try again.', 'assistant');
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">
        {/* Scrollable chat messages container */}
        <main
          ref={containerRef}
          className="flex-1 overflow-y-auto px-4 py-2"
        >
          <div className="max-w-4xl mx-auto divide-y dark:divide-gray-700">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>
        </main>

        {/* Chat input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  );
}
