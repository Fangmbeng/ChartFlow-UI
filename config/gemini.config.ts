// src/config/gemini.config.ts
import * as dotenv from 'dotenv';
dotenv.config();

export const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
export const GEMINI_API_URL = process.env.NEXT_PUBLIC_GEMINI_API_URL;


if (!GEMINI_API_KEY || !GEMINI_API_URL) {
  throw new Error('Gemini API environment variables are missing');
}
