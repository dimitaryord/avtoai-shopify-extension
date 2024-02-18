import { verifyAppProxyRequest } from "../middleware/proxy";
import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";
import db from "../db";

export const action = async ({ request }) => {
    const user = await verifyAppProxyRequest(request);
    const assistantName = JSON.parse(user.formDataFileContent).assistantName;
    
    const openai = initOpenAI();

    const thread = await openai.beta.threads.create();

    await db.createThread(user.id, thread.id);

    return json({ threadId: thread.id, assistantName: assistantName }, { status: 201 });
}