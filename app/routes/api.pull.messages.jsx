import { verifyAppProxyRequest } from "../middleware/proxy";
import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";
import pullMessages from "../assistant/utils/pullMessages";

export const action = async ({ request }) => {
    await verifyAppProxyRequest(request);
    const openai = initOpenAI();

    try{
        const body = await request.json();

        if(!body)
            throw json({ message: "No body provided"}, { status: 401 });

        const { threadId } = body;
        if(!threadId) 
            throw json({ message: "No thread id provided"}, { status: 401 });

        const messages = await pullMessages({
            openai: openai,
            threadId: threadId
        });

        return json({ messages: messages });
    }
    catch(error){
        throw new Error("Error pulling messages: " + error.message);
    }

}