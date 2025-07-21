// @ts-nocheck
import express from 'express';
import assistantRouter from './assistant-ai.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/assistant', assistantRouter);

app.listen(3001, () => {
  console.log('Assistant API running on http://localhost:3001');
}); 