import { LRUCache } from "lru-cache";
import { json } from "@remix-run/node";

const BAN_TIME = 15 * 1000 * 60

const limiter = new LRUCache({
    max: 1000,

    maxSize: 10000,
    sizeCalculation: () => 1,
    ttl: BAN_TIME * 1000 * 60,
});

export function rateLimiter({ maxRequests, ip, time }) {
    const session = limiter.get(ip);
    const currentTime = Date.now();

    if(!session){
        limiter.set(ip, {
            requests: 1,
            last_called: currentTime
        });
    }
    else {
        if(currentTime - session.last_called < time ){
            if(session.requests >= maxRequests){
                throw json({ message: `Too many requests. Try again after ${BAN_TIME / 1000 / 60 } minutes.`}, 
                { status: 429 });
            }
            else {
                limiter.set(ip, { requests: session.requests + 1, last_called: currentTime});
            }
        }
        else {
            limiter.set(ip, { requests: 1, last_called: currentTime });
        }
    }
}