import { verifyAppProxyRequest } from "../middleware/proxy";
import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";


import adaptivePollingWithInitialDelay from "../assistant/utils/polling";
import pullMessages from "../assistant/utils/pullMessages";

export const action = async ({ request }) => {
    const user = await verifyAppProxyRequest(request);
    const openai = initOpenAI();

    try{
        const body = await request.json();

        if(!body)
            throw json({ message: "No body provided"}, { status: 401 });

        const { threadId, userMessage } = body;

        if(!threadId) 
            throw json({ message: "No thread id provided"}, { status: 401 });

        if(!userMessage)
            throw json({ message: "No user message provided"}, { status: 401});

        await openai.beta.threads.messages.create(threadId, {
            role: "user",
            content: userMessage
        })

        const run = await openai.beta.threads.runs.create(threadId, {
            assistant_id: user.assistantId,
        });

        await adaptivePollingWithInitialDelay({
            openai: openai,
            threadId: threadId,
            runId: run.id,
            initialDelay: 3000,
            subsequentDelay: 100
        });

        const messages = await pullMessages({
            openai: openai,
            threadId: threadId,
        });

        return json({ messages: messages });
    }
    catch(error) {
        throw new Error("Error chatting with the assistant: " + error.message);
    }
}


export const loader = ({ request }) => {
    return new Response(JSON.stringify({ message: "Hello from Shopify App Proxy!" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}