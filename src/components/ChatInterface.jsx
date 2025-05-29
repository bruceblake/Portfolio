import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getResponse, getTypingDelay } from '../utils/chatResponses';
import './ChatInterface.css';

const ChatInterface = () => {
  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 18) return "Good afternoon!";
    return "Good evening!";
  };

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `${getGreeting()} I'm an AI assistant trained on Bruce Blake's professional background and accomplishments. 

I can help you understand his experience at Google, his entrepreneurial ventures, technical skills, and academic achievements. What would you like to know about Bruce?`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What was Bruce's experience like at Google?",
    "Tell me about his entrepreneurial projects",
    "What technical skills does Bruce have?",
    "What makes Bruce stand out as a candidate?",
    "Can you walk me through his most impactful projects?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    // Get static response based on keywords
    const response = getResponse(userMessage);
    const typingDelay = getTypingDelay(response);

    // Simulate typing delay for more realistic experience
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsLoading(false);
    }, Math.min(typingDelay, 2000)); // Cap at 2 seconds
  };

  const handleSuggestedQuestion = (question) => {
    setInput(question);
    handleSubmit({ preventDefault: () => {} });
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              className={`message ${message.role}`}
              initial={{ opacity: 0, x: message.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="message-content">
                {message.role === 'assistant' ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={vscDarkPlus}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      h1: ({ children }) => <h1 className="markdown-h1">{children}</h1>,
                      h2: ({ children }) => <h2 className="markdown-h2">{children}</h2>,
                      h3: ({ children }) => <h3 className="markdown-h3">{children}</h3>,
                      ul: ({ children }) => <ul className="markdown-ul">{children}</ul>,
                      ol: ({ children }) => <ol className="markdown-ol">{children}</ol>,
                      li: ({ children }) => <li className="markdown-li">{children}</li>,
                      blockquote: ({ children }) => <blockquote className="markdown-blockquote">{children}</blockquote>,
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            className="message assistant loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="suggested-questions">
        <h3>Quick Questions for Recruiters:</h3>
        <div className="questions-grid">
          {suggestedQuestions.map((question, index) => (
            <motion.button
              key={index}
              className="suggested-question"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleSuggestedQuestion(question)}
            >
              {question}
            </motion.button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Bruce's experience, skills, or projects..."
          className="chat-input"
          disabled={isLoading}
        />
        <button type="submit" className="chat-submit" disabled={isLoading || !input.trim()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ChatInterface;