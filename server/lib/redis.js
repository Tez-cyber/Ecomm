import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config()

/* 
    Redis is a key-value store. You can tHink of it as a giant JSON
    There are different data structures such as lists, caches, sets,
    sorted sets and may others
*/
export const redis = new Redis(process.env.REDIS_URL);
