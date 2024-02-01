import OpenAI from "openai";

const openai = global.openai || new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

if(process.env.NODE_ENV !== "production"){
    if(!global.openai)
        global.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export default openai
