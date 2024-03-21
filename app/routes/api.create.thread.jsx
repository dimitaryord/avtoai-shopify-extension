import { verifyAppProxyRequest } from "../middleware/proxy";
import { rateLimiter } from "../middleware/rate.limiter";
import { getIp } from "../middleware/ip";

import { initOpenAI } from "../openai";
import { json } from "@remix-run/node";

import db from "../db";
import cache from "../db/lru";

export const action = async ({ request }) => {
    const ip = getIp(request);

    rateLimiter({
        ip: ip,
        maxRequests: 100,
        time: 1 * 1000 * 60
    });

    const user = await verifyAppProxyRequest(request, ip);
    if(user.threadId){
        const { threadId, assistantName, assistantStarters } = user;
        return json({ threadId: threadId, assistantName: assistantName,
             assistantStarters: assistantStarters}, { status: 201 });
    }
    else{
        const { assistantId, assistantName, assistantStarters } = user;
        const openai = initOpenAI();
        const thread = await openai.beta.threads.create();
        await db.createThread(user.id, thread.id);
            cache.set(ip, { threadId: thread.id, assistantId: assistantId,
                assistantName: assistantName, assistantStarters: assistantStarters });
        return json({ threadId: thread.id,assistantName: assistantName, assistantStarters: assistantStarters },
             { status: 201 });
    }
}