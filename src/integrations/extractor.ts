// SnapAction AI Extraction Module
// Sends an image to Gemini (via OpenRouter) and feeds extracted data into generateOutputs().

import * as dotenv from 'dotenv';
dotenv.config();

import OpenAI from 'openai';
import * as fs from 'fs';
import { generateOutputs, OutputRequest, OutputResult } from './exporters';

const EXTRACTION_PROMPT = `
Analyze this image and extract structured information. Return ONLY a valid JSON object — no markdown, no code blocks, no explanation.

Use this exact structure, but OMIT any top-level key that is not present in the image:

{
  "event": {
    "title": "string",
    "startDate": "ISO 8601 UTC string, e.g. 2026-04-22T09:00:00Z",
    "endDate": "ISO 8601 UTC string (optional)",
    "location": "string (optional)",
    "description": "string (optional)"
  },
  "contact": {
    "name": "string",
    "email": "string (optional)",
    "phone": "string (optional)",
    "organization": "string (optional)",
    "url": "string (optional)"
  },
  "checklist": {
    "title": "Tasks",
    "tasks": ["string", "string"]
  },
  "email": {
    "to": "recipient email if visible",
    "subject": "string",
    "body": "a short, appropriate draft body"
  }
}

Rules:
- Only include a key if that type of data is clearly present in the image.
- For dates: convert to ISO 8601 UTC. If no year is visible assume 2026.
- Return raw JSON only.
`.trim();

function getMimeType(filePath: string): string {
  const ext = filePath.toLowerCase().split('.').pop() ?? '';
  const map: Record<string, string> = {
    jpg:  'image/jpeg',
    jpeg: 'image/jpeg',
    png:  'image/png',
    webp: 'image/webp',
    gif:  'image/gif',
  };
  return map[ext] ?? 'image/jpeg';
}

function parseResponse(text: string): OutputRequest {
  const cleaned = text
    .replace(/^```(?:json)?\s*/m, '')
    .replace(/\s*```$/m, '')
    .trim();
  return JSON.parse(cleaned);
}

export async function extractFromImage(imagePath: string): Promise<OutputResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error('OPENROUTER_API_KEY is not set. Add it to your .env file.');
  }

  const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey,
  });

  const imageBuffer = fs.readFileSync(imagePath);
  const base64Data  = imageBuffer.toString('base64');
  const mimeType    = getMimeType(imagePath);

  const response = await client.chat.completions.create({
    model: 'nvidia/nemotron-nano-12b-v2-vl:free',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'image_url', image_url: { url: `data:${mimeType};base64,${base64Data}` } },
          { type: 'text', text: EXTRACTION_PROMPT },
        ],
      },
    ],
  });

  const text = response.choices[0].message.content ?? '';
  const extracted = parseResponse(text);
  return generateOutputs(extracted);
}
