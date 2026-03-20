require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const {errorHandler} = require('./src/middleware/errorHandler');

const authRoutes = require('./src/routes/auth.routes');
const projectRoutes = require('./src/routes/project.routes');
const taskRoutes = require('./src/routes/task.routes');

connectDB();

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://project-manager-frontend-eight.vercel.app',
  ],
  credentials: true,
}));app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res)=>{
    res.send('API is running');
})

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})