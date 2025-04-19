
// config/groq.config.ts
export const GROQ_API_KEY = process.env.NEXT_PUBLIC_GROQ_API_KEY;
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

// Updated models on Groq that are currently available
export const GROQ_MODELS = {
  LLAMA3_70B: "llama-3.1-70b-versatile",    // High quality, versatile tasks
  LLAMA3_8B: "llama-3.1-8b-instant",        // Fast responses
  MIXTRAL: "mixtral-8x7b-32768",            // Being decommissioned
  GEMMA2_9B: "gemma2-9b-it",                // Good alternative to Mixtral
  LLAMA3_3_70B: "llama-3.3-70b-versatile",  // Newer version with enhanced capabilities
};