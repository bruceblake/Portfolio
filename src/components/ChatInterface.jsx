import { useState, useRef, useEffect } from 'react';
import './ChatInterface.css';

function ChatInterface({ portfolioData }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: "Hi! I'm an AI assistant for Bruce Blake's portfolio. I can answer questions about his experience, skills, projects, and professional background. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Generate session ID on mount
  useEffect(() => {
    const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    setSessionId(id);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputValue.trim() || isLoading) return;
    
    const userMessage = inputValue.trim();
    setInputValue('');
    
    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      type: 'user',
      content: userMessage
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setIsLoading(true);
    
    try {
      // Call backend API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
          // Add API key if configured
          ...(import.meta.env.VITE_API_KEY && { 'x-api-key': import.meta.env.VITE_API_KEY })
        },
        body: JSON.stringify({
          message: userMessage,
          sessionId: sessionId
        })
      });
      
      const data = await response.json();
      
      if (response.ok && data.response) {
        // Add assistant response
        const assistantMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: data.response
        };
        
        setMessages(prev => [...prev, assistantMessage]);
      } else {
        // Handle error or fallback
        const errorMessage = {
          id: messages.length + 2,
          type: 'assistant',
          content: data.message || "I'm sorry, I couldn't process your request. Please try again later.",
          isError: true
        };
        
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      
      // Add error message
      const errorMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: "I'm having trouble connecting to the server. Please check your connection and try again.",
        isError: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = async () => {
    try {
      // Clear conversation on backend
      await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/chat/clear`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
          ...(import.meta.env.VITE_API_KEY && { 'x-api-key': import.meta.env.VITE_API_KEY })
        },
        body: JSON.stringify({ sessionId })
      });
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
    
    // Reset to initial message
    setMessages([
      {
        id: 1,
        type: 'assistant',
        content: "Hi! I'm an AI assistant for Bruce Blake's portfolio. I can answer questions about his experience, skills, projects, and professional background. What would you like to know?"
      }
    ]);
  };

  const suggestedQuestions = [
    "What is Bruce's experience with AI/ML?",
    "Tell me about the RedBarSushiAI project",
    "What technologies is Bruce proficient in?",
    "What did Bruce do at Google?"
  ];

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h3>AI Assistant</h3>
        <button 
          className="clear-button"
          onClick={clearChat}
          title="Clear conversation"
        >
          Clear Chat
        </button>
      </div>
      
      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.type} ${message.isError ? 'error' : ''}`}
          >
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant loading">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {messages.length === 1 && (
        <div className="suggested-questions">
          <p>Try asking:</p>
          {suggestedQuestions.map((question, index) => (
            <button
              key={index}
              className="suggestion-button"
              onClick={() => setInputValue(question)}
            >
              {question}
            </button>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Bruce's experience, skills, or projects..."
          className="chat-input"
          disabled={isLoading}
          maxLength={1000}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!inputValue.trim() || isLoading}
        >
          {isLoading ? '...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default ChatInterface;