import OpenAI from "openai";

export function initOpenAI() {
    return new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
}

