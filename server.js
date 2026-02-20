const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Agent } = require('./agent');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const agent = new Agent();

app.get('/', (req, res) => {
  res.send('GemChat Server is running');
});

app.post('/chat', async (req, res) => {
  try {
    const { message, image } = req.body;
    if (!message && !image) {
      return res.status(400).json({ error: 'Message or image is required' });
    }
    const response = await agent.chat(message || "", image);
    res.json({ response });
  } catch (error) {
    console.error('Error processing chat:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
