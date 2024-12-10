import dotenv from "dotenv";
import express from "express";
import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import authRoutes from './routes/auth.routes.js';
import messRoutes from './routes/mess.routes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();
const PORT = process.env.PORT;

app.use('/api/auth',authRoutes);
app.use('/api/mess',messRoutes);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Backend running on port ${PORT}`)
});