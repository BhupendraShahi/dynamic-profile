import 'dotenv/config'
export const secretKey = process.env.JWT_SECRET_KEY;
export const dbURL = process.env.dbURL;
export const redisURL = process.env.REDIS_URL;
