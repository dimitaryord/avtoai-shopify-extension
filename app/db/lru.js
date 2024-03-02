import { LRUCache } from "lru-cache";

const options = {
    max: 500,

    maxSize: 5000,
    sizeCalculation: () => 1,
    ttl: 1000 * 60 * 60
}

const cache = new LRUCache(options);

export default cache