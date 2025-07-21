// @ts-nocheck
import { defineConfig } from '@genkit-ai/core';
import { vertexAI } from '@genkit-ai/vertexai';

export default defineConfig({
  plugins: [
    vertexAI({
      // poți adăuga aici config suplimentar dacă vrei
    }),
  ],
}); 