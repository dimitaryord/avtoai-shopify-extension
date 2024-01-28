import { verifyAppProxyHmac } from 'shopify-application-proxy-verification';    

const usersAssistant = new Map()

export const action = async ( { request }) => {
    if(verifyAppProxyHmac(request.query, process.env.SHOPIFY_API_SECRET || "")) {
        return new Response(JSON.stringify({ message : "Query valid"}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        })
    }
    return new Response(JSON.stringify({ message: "Invalid query"}), {
        status: 400,
        headers: {
            "Content-Type": "application/json",
        }
    })
}


export const loader = ( { request }) => {
    return new Response(JSON.stringify({ message: "Hello from Shopify App Proxy!" }), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    })
}