import db from "../db";
import { createHmac } from 'crypto'
import { json } from "@remix-run/node";

function verifyShopifySignature(queryParams, secret) {
    const { signature, ...params } = Object.fromEntries(queryParams)
  
    const sortedParamsString = Object.keys(params).sort().map(key => {
      return `${key}=${params[key]}`;
    }).join('')
  
    const hash = createHmac('sha256', secret).update(sortedParamsString).digest('hex')
  
    return hash === signature
}

export async function verifyAppProxyRequest(request) {
    const queryParams = new URL(request.url).searchParams
    if(!verifyShopifySignature(queryParams, process.env.SHOPIFY_API_SECRET || ""))
        throw json({ message: "Authentication failed"}, { status: 401 });

    const shop = await request.headers.get("Shopify-Store-Domain");

    if(!shop) throw json({ message: "No shop specified"}, { status: 401 });

    const user = await db.findUserByShop(shop);

    if(!user){
        throw json({ message: "Authentication failed" }, { status: 401 });
    }

    return user;
}

export function grabIP(request) {
    const ip = request.headers["cf-connecting-ip"] ?? request.socket.remoteAddress;
    if (typeof ip !== "string") 
        throw json({message : "Client disconnected or forged information."}, { status: 400 });
}