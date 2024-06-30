import redis from 'redis';
import dotenv from 'dotenv';
dotenv.config();

const client = redis.createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    }
});

client.on('connect', () => {
    console.log('Redis client connected to the Redis-Cloud server!');
});

export default client;



// import redis from "redis";

// const client = redis.createClient({
//   host: "localhost",
//   port: "6379",
// });

// client.on("connect", () => {
//   console.log("Redis client connected");
// });

// export default client;