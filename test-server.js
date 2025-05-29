// Simple test to check if the server is working
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'Test server is healthy', port: 3001 });
});

app.post('/api/chat', (req, res) => {
  const { message } = req.body;
  res.json({ 
    response: `Test response: You said "${message}". The actual server would connect to the LLM here.`
  });
});

app.listen(3001, () => {
  console.log('Test server running on http://localhost:3001');
});