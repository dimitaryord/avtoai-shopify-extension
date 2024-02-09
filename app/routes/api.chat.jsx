import { verifyRequest, grabIP } from "../middleware/proxy";
import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";

const userThreads = {};

export const action = async ({ request }) => {
    const openai = initOpenAI();
    const { assistantId, userMessage } = await verifyRequest(request);
    const ip = grabIP();

    const userByIP = userThreads[ip];

    if(userByIP) {
        await openai.beta.threads.create(userByIP.threadId, {
            role: "user",
            content: userMessage
        });

        await openai.beta.threads.runs.create(
            userByIP.threadId,
            { assistant_id: assistantId }
        );

        const messages = await openai.beta.threads.messages.list(
            userByIP.threadId
        );

        return json({ messages: messages }, { status: 201 });
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