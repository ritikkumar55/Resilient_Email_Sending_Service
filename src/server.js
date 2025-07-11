const express = require('express');
const MockProvider1 = require('./providers/MockProvider1');
const MockProvider2 = require('./providers/MockProvider2');
const EmailService = require('./EmailService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Create service instance
const provider1 = new MockProvider1();
const provider2 = new MockProvider2();
const emailService = new EmailService([provider1, provider2]);

// POST /send-email
app.post('/send-email', async (req, res) => {
  const { emailId, to, subject, message } = req.body;

  if (!emailId || !to || !subject || !message) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const result = await emailService.sendEmail(emailId, { to, subject, message });
  res.json(result);
});

// GET /status-log
app.get('/status-log', (req, res) => {
  res.json(emailService.getStatusLog());
});

// Start server
app.listen(PORT, () => {
  console.log(`Email API running at http://localhost:${PORT}`);
});
