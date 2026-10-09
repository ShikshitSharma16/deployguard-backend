require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth.route');

if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET is required. Please set it in your environment variables.');
}

const app = express();
const PORT = process.env.PORT || 4000;

// Same configurable CORS pattern from store-api / SevaSetu
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

app.use(
  cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'DeployGuard API is running' });
});

app.use('/api/auth', authRoutes);
// Service routes (add/list/delete monitored services) come in Day 2

async function startServer() {
  await connectDatabase();
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
}

startServer();
