// @ts-nocheck
import { defineFlow, z } from '@genkit-ai/core';
import { gemini } from '@genkit-ai/vertexai';
import fs from 'fs';
import path from 'path';

function getProjectFilesContent() {
  const exts = ['.md', '.js', '.jsx', '.ts', '.tsx', '.html'];
  const root = path.resolve(__dirname, '.');
  let files: string[] = [];

  function walk(dir: string) {
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

export const assistantRag = defineFlow(
  {
    name: 'assistantRag',
    inputSchema: z.object({
      question: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ question }) => {
    const files = getProjectFilesContent();
    const context = files.map(f => `File: ${f.path}\n${f.content}`).join('\n\n');
    const prompt = `\nEști un asistent virtual pentru acest proiect. Folosește contextul de mai jos pentru a răspunde la întrebarea utilizatorului.\n\nContext:\n${context}\n\nÎntrebare: ${question}\nRăspuns:`;
    const result = await gemini.generate({
      prompt,
    });
    return result.text();
  }
); 