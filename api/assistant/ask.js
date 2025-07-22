import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { assistantIndex } from '../../src/assistant-index.js';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'CHEIA_TA_AICI';
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function normalize(str) {
  return str
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // elimină diacritice
    .replace(/[^a-z0-9 ]/g, '') // elimină caractere speciale
    .replace(/\s+/g, ' ') // spații multiple la unul singur
    .trim();
}

const identityKeywords = [
  'google', 'gemini', 'cine esti', 'ce esti', 'ai', 'model', 'asistent', 'lingvistic', 'genai', 'openai', 'gpt',
  'baza de date', 'creator', 'identitate', 'cum esti antrenat', 'ce model folosesti', 'ce model folositi', 'ce model',
  'cine te a creat', 'cine te-a creat', 'cine e creatorul', 'asistent virtual', 'sunt un asistent', 'sunt un model',
  'sunt un model lingvistic', 'sunt un model de limbaj', 'sunt un model de la google', 'sunt un model mare',
  'sunt un model ai', 'sunt un model generativ', 'sunt un model de inteligenta artificiala'
];

function getProjectFilesContent() {
  const exts = ['.md', '.js', '.jsx', '.ts', '.tsx', '.html'];
  const root = path.resolve(__dirname, '../..');
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
  return files.slice(0, 40).map(f => ({
    path: f,
    content: fs.readFileSync(f, 'utf8').slice(0, 1000),
  }));
}

function getAssistantIndexContext() {
  return assistantIndex.map(item =>
    `Categorie: ${item.categorie}\nDescriere: ${item.descriere}\n${item.link ? 'Link: ' + item.link : ''}\nExemple: ${item.exemple.join('; ')}\n`
  ).join('\n');
}

function addRelevantLinks(answer, question) {
  if (/pendul/i.test(question)) {
    answer += '<br><br>Vezi mai multe despre pendule aici: <a href="/resurse/pendule">/resurse/pendule</a>';
  }
  if (/unde/i.test(question)) {
    answer += '<br><br>Vezi mai multe despre unde aici: <a href="/resurse/unde">/resurse/unde</a>';
  }
  if (/lissajous/i.test(question)) {
    answer += '<br><br>Vezi mai multe despre figuri Lissajous aici: <a href="/resurse/lissajous">/resurse/lissajous</a>';
  }
  if (/seism|cutremur/i.test(question)) {
    answer += '<br><br>Vezi mai multe despre seisme aici: <a href="/resurse/seism">/resurse/seism</a>';
  }
  if (/probleme|exerci|test|quiz/i.test(question)) {
    answer += '<br><br>Vezi lista de probleme aici: <a href="/probleme">/probleme</a>';
  }
  if (/resurse|lec.tii|formule|manual|ghid|pdf|documentatie/i.test(question)) {
    answer += '<br><br>Vezi toate resursele aici: <a href="/resurse">/resurse</a>';
  }
  return answer;
}

function cleanAnswer(answer) {
  return answer.replace(/(Gemini|Google|AI|modelul|LLM|sunt un model|sunt un asistent AI|ca model|ca AI|ca asistent AI|ca model de limbaj|ca limbaj|ca model de la Google|ca model generativ|sunt un model lingvistic|antrenat de Google|sunt un model de limbaj|sunt un model mare|sunt un model lingvistic mare|sunt un model de inteligență artificială|sunt un model AI|sunt un model generativ)/gi, '');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  const { question } = req.body;
  const qNorm = normalize(question);
  console.log('Q:', question, 'Qnorm:', qNorm);

  // Filtrul de identitate - PRIMA verificare!
  for (const kw of identityKeywords) {
    if (qNorm.includes(kw)) {
      return res.status(200).json({
        result: "Sunt Profesorul Whiz, asistentul virtual al platformei PULS. Sunt aici să te ajut cu orice întrebare despre fizică, platformă sau cod!"
      });
    }
  }

  const indexContext = getAssistantIndexContext();
  const files = getProjectFilesContent();
  const codeContext = files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n');
  const context = `Index resurse cheie:\n${indexContext}\n\nCod sursă:\n${codeContext}`;
  const prompt = `
Ești Profesorul Whiz, asistentul virtual al platformei PULS. Folosește cu prioritate informațiile din indexul de mai jos pentru a răspunde la întrebări despre funcționalități, resurse, pagini sau probleme. Dacă întrebarea e despre cod, folosește și contextul de cod. 
Dacă găsești în context un exemplu, titlu sau enunț relevant, citează-l exact în răspuns. Dacă există link, include-l. Dacă nu găsești, spune clar „Nu am găsit un exemplu concret în contextul dat”.
Explică clar, dă exemple, arată pașii, oferă linkuri directe dacă există. Nu menționa că ești AI sau Gemini.

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
    let answer = response.text;
    answer = cleanAnswer(answer);
    answer = addRelevantLinks(answer, question);
    res.status(200).json({ result: answer });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
