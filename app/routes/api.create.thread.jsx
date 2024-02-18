import { verifyAppProxyRequest } from "../middleware/proxy";
import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";
import db from "../db";

export const action = async ({ request }) => {
    const user = await verifyAppProxyRequest(request);
    const openai = initOpenAI();

    const thread = await openai.beta.threads.create();

    await db.createThread(user.id, thread.id);

    return json({ threadId: thread.id, assistantName: "Avto AI chatbot Here to help you" }, { status: 201 });
}