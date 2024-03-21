import { verifyAppProxyRequest } from "../middleware/proxy";
import { rateLimiter } from "../middleware/rate.limiter";
import { getIp } from "../middleware/ip";

import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";

import pullMessages from "../assistant/utils/pullMessages";

export const action = async ({ request }) => {
    const ip = getIp(request);

    rateLimiter({
        ip: ip,
        maxRequests: 500,
        time: 1 * 1000 * 60
    });

    const user = await verifyAppProxyRequest(request, ip);
    const openai = initOpenAI();

    try{
        const body = await request.json();

        if(!body)
            throw json({ message: "No body provided"}, { status: 401 });

        const { threadId, userMessage, runId } = body;
        console.log(threadId, userMessage, runId)

        if(!threadId) 
            throw json({ message: "No thread id provided"}, { status: 401 });

        if(!userMessage && !runId)
            throw json({ message: "No user message or runId provided"}, { status: 401});

        if(!runId){
            await openai.beta.threads.messages.create(threadId, {
                role: "user",
                content: userMessage
            })
    
            const run = await openai.beta.threads.runs.create(threadId, {
                assistant_id: user.assistantId,
            });

            return json({ status: "started", runId: run.id, step: "starting" });
        }

        const run = await openai.beta.threads.runs.retrieve(threadId, runId)
        .on("textCreated", (text) => json({ status: "in_progress", runId: run.id, step: "message_created"}))
        .on("textDelta", (textDelta, snapshot) => {
            json({ status: "in_progress", runId: run.id, step: "message_delta", message: textDelta.value });
        })
        // .on("toolCallCreated", ())


        if(run.status === "failed"){
            throw new Error("Error chatting with the assistant: Assistant failed");
        }
    }
    catch(error) {
        throw new Error("Error chatting with the assistant: " + error.message);
    }
}