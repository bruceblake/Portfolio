import React, { useState } from 'react';

const SimpleChat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    setError('');
    setResponse('');
    
    try {
      const res = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(`Error ${res.status}: ${data.error || 'Unknown error'}`);
      } else {
        setResponse(data.response);
      }
    } catch (err) {
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Simple Chat Test</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button 
        onClick={sendMessage} 
        disabled={loading || !message}
        style={{ padding: '10px 20px' }}
      >
        {loading ? 'Sending...' : 'Send'}
      </button>
      
      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {response && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f0f0f0' }}>
          <strong>Response:</strong> {response}
        </div>
      )}
      
      <div style={{ marginTop: '20px', fontSize: '12px', color: '#666' }}>
        <p>Server endpoint: http://localhost:3000/api/chat</p>
        <p>Check browser console for detailed errors.</p>
      </div>
    </div>
  );
};

export default SimpleChat;