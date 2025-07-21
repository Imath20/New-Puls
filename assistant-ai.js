import express from 'express';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Aceste două linii trebuie să fie imediat după importuri!
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const GEMINI_API_KEY = 'AIzaSyAUTD_5CjcjY5mJwGZ_GQUStaRlxzqrBhI';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const router = express.Router();

function getProjectFilesContent() {
  const exts = ['.md', '.js', '.jsx', '.ts', '.tsx', '.html'];
  const root = path.resolve(__dirname, '.');
  let files = [];
  function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules' && file !== '.git') walk(fullPath);
      } else if (exts.includes(path.extname(fullPath))) {
        files.push(fullPath);
      }
    });
  }
  walk(root);
  return files.slice(0, 20).map(f => ({
    path: f,
    content: fs.readFileSync(f, 'utf8').slice(0, 2000),
  }));
}

router.post('/ask', async (req, res) => {
  const { question } = req.body;
  const files = getProjectFilesContent();
  const context = files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n');
  const prompt = `\nEști un asistent virtual pentru acest proiect. Folosește contextul de mai jos pentru a răspunde la întrebarea utilizatorului.\n\nContext:\n${context}\n\nÎntrebare: ${question}\nRăspuns:`;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    res.json({ result: response.text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router; 