import db from "../db";
import cache from "../db/lru";
import { createHmac } from 'crypto'
import { json } from "@remix-run/node";

function verifyShopifySignature(queryParams, secret) {
    const { signature, ...params } = Object.fromEntries(queryParams)
  
    const sortedParamsString = Object.keys(params).sort().map(key => {
      return `${key}=${params[key]}`;
    }).join('')
  
    const hash = createHmac('sha256', secret).update(sortedParamsString).digest('hex')
  
    const shop = params.shop;
    return {
        isValid : hash === signature && shop,
        shop: shop,
    }
}

export async function verifyAppProxyRequest(request, ip, fetchDirectlyFromDb=false) {
    const queryParams = new URL(request.url).searchParams
    const { isValid, shop } = verifyShopifySignature(queryParams, process.env.SHOPIFY_API_SECRET || "");
    if(!isValid)
        throw json({ message: "Authentication failed query"}, { status: 401 });

    
    let user;

    if(!fetchDirectlyFromDb){
        user = cache.get(ip);
        if(!user){
            user = await db.findUserByShop(shop);
        }
    }
    else{
        user = await db.findUserByShop(shop);
    }

    if(!user)
        throw json({ message: "Authentication failed no user" }, { status: 401 });

    return user;
}