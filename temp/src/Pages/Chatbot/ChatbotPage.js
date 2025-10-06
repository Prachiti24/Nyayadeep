import React, { useState } from 'react';
import { askAI } from '../../Components/askAI';
import './ChatbotPage.css';

const ChatbotPage = () => {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question) return;
    setLoading(true);
    const answer = await askAI(question);
    setResponse(answer);
    setLoading(false);
    setQuestion('');
  };

  return (
    <div className="chatbot-container">
      <h2>NyayaDeep Chatbot</h2>
      <div className="chat-window">
        <div className="chat-response">
          {loading ? <p>AI is thinking...</p> : <p>{response}</p>}
        </div>
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me anything..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
        />
        <button onClick={handleAsk}>Send</button>
      </div>
    </div>
  );
};

export default ChatbotPage;
