import { verifyAppProxyRequest } from "../middleware/proxy";
import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";
import db from "../db";

export const loader = async ({ request }) => {
    const user = await verifyAppProxyRequest(request);
    const { assistantName, assistantStarters } = JSON.parse(user.assistantInfo);
    
    const openai = initOpenAI();

    const thread = await openai.beta.threads.create();

    await db.createThread(user.id, thread.id);

    return json({ threadId: thread.id, assistantName: assistantName, assistantStarters: assistantStarters }, { status: 201 });
}