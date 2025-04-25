import express from "express";

import choreRouter from './routes/chores';
import childRouter from './routes/children';

import { config } from 'dotenv';
config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.use('/children', childRouter);
app.use('/child/chores', choreRouter);

app.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));