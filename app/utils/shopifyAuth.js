// utils/shopifyAuth.js

import crypto from 'crypto';
// This function exchanges a code for a Shopify access token
export async function exchangeCodeForToken(shop, code) {
  // endpoint where I can swap for a teporar access token
    const tokenExchangeUrl = `https://${shop}/admin/oauth/access_token`;
    const response = await fetch(tokenExchangeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_API_KEY,
        client_secret: process.env.SHOPIFY_API_SECRET,
        code,
      }),
    });
  
    const data = await response.json();
    return data.access_token;
  }
  
  // Validating the url
  export function validateHMAC(hmac, params, secret) {
    const map = {};
    params.forEach((value, key) => { map[key] = value; });
  
    const message = Object.keys(map)
      .filter(key => key !== 'hmac')
      .sort()
      .map(key => `${key}=${map[key]}`)
      .join('&');
  
    const generatedHmac = crypto
      .createHmac('sha256', secret)
      .update(message)
      .digest('hex');
  //Don't know how this works
    return crypto.timingSafeEqual(Buffer.from(hmac), Buffer.from(generatedHmac));
  }
  
  