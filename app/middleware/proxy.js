import { verifyAppProxyHmac } from 'shopify-application-proxy-verification';
import db from "../db";
import { json } from "@remix-run/node";

export async function verifyRequest(request) {
    if(!verifyAppProxyHmac(request.query, process.env.SHOPIFY_API_SECRET || "")) {
        throw json({ message: "Authentication failed"}, { status: 401 });
    }

    const body = await request.json();
    const user = await db.findUserByShop(body.shop);

    if(!user){
        throw json({ message: "Authentication failed" }, { status: 401 });
    }

    if(!body.userMessage){
        throw json({ message: "No body message!" }, { status: 401 });
    }

    return {
        assistantId: user.assistantId, 
        userMessage: body.userMessage
    };
}

export function grabIP(request) {
    const ip = request.headers["cf-connecting-ip"] ?? request.socket.remoteAddress;
    if (typeof ip !== "string") 
        throw json({message : "Client disconnected or forged information."}, { status: 400 });
}