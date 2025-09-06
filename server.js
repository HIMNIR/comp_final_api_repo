import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createClient } from "@supabase/supabase-js";
import apiRouter from './apiRouter.js';

dotenv.config();

const app = express();

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase credentials in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add supabase to request object
app.use((req, res, next) => {
    req.supabase = supabase;
    next();
});

// Routes
app.use('/api', apiRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3000; // Changed back to 3000 for local development
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Add graceful shutdown handlers
process.on('SIGTERM', () => {
    console.info('SIGTERM signal received.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.info('SIGINT signal received.');
    server.close(() => {
        console.log('Server closed.');
        process.exit(0);
    });
});