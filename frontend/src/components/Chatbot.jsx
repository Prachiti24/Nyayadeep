// Chatbot.jsx
import { useEffect, useRef } from 'react';
import { generateResponse, initializeAI } from '../services/ai';
import { useChatStore } from '../store/chatStore';
import { ChatInput } from './ChatInput';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';

// Initialize Gemini AI
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Check if API key is loading
console.log("Gemini API Key:", GEMINI_API_KEY);

initializeAI(GEMINI_API_KEY);

export function Chatbot() {
  const {
    messages,
    isTyping,
    addMessage,
    setIsTyping,
    isDarkMode,
  } = useChatStore();

  // Ref for scrollable container
  const containerRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    const container = containerRef.current;

    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle sending messages
  const handleSendMessage = async (message) => {
    addMessage(message, 'user');

    setIsTyping(true);

    try {
      // Generate AI response
      const response = await generateResponse(message);

      // Add assistant message
      addMessage(response, 'assistant');

    } catch (error) {

      // Print exact Gemini error in browser console
      console.error("Gemini Error:", error);

      // Show fallback message in UI
      addMessage(
        'Sorry, I encountered an error. Please try again.',
        'assistant'
      );

    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900">

        {/* Chat messages area */}
        <main
          ref={containerRef}
          className="flex-1 overflow-y-auto px-4 py-2"
        >
          <div className="max-w-4xl mx-auto divide-y dark:divide-gray-700">

            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message}
              />
            ))}

            {isTyping && <TypingIndicator />}

            <div ref={messagesEndRef} />

          </div>
        </main>

        {/* Chat input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
        />

      </div>
    </div>
  );
}