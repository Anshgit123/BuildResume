import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config(); // Load .env variables

console.log("JWT_SECRET from .env:", process.env.JWT_SECRET);

console.log("JWT_SECRET:", process.env.JWT_SECRET); // should print 'Nexon'
console.log("Mongo URI:", process.env.MONGO_URI ? "Loaded" : "Missing"); // don't print password


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/resume', resumeRoutes);
app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, _path) => {
      res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
    },
  })
);

app.get('/', (req, res) => res.send('API WORKING'));

// Start server
app.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});
