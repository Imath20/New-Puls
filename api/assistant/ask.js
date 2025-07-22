import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'CHEIA_TA_AICI';

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function getProjectFilesContent() {
  const exts = ['.md', '.js', '.jsx', '.ts', '.tsx', '.html'];
  const root = path.resolve(__dirname, '../..'); // urcă la root-ul proiectului
  let files = [];
  function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!file.startsWith('.') && file !== 'node_modules' && file !== '.git' && file !== '.vercel') walk(fullPath);
      } else if (exts.includes(path.extname(fullPath))) {
        files.push(fullPath);
      }
    });
  }
  walk(root);
  return files.slice(0, 10).map(f => ({
    path: f,
    content: fs.readFileSync(f, 'utf8').slice(0, 2000),
  }));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { question } = req.body;
  const files = getProjectFilesContent();
  const context = files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n');
  const prompt = `
Ești un asistent virtual pentru acest proiect. Folosește contextul de mai jos pentru a răspunde la întrebarea utilizatorului.

Context:
${context}

Întrebare: ${question}
Răspuns:
  `;
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: prompt,
    });
    res.status(200).json({ result: response.text });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
