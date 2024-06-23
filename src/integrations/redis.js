// import redis from "redis";

// const client = redis.createClient({
//   host: "localhost",
//   port: "6379",
// });

// client.on("connect", () => {
//   console.log("Redis client connected");
// });

// export default client;

import redis from 'redis';

const client = redis.createClient({
    password: 'QJoN8dL9Sd59RH4HDxlL13iKfZKnOyK5',
    socket: {
        host: 'redis-16273.c74.us-east-1-4.ec2.redns.redis-cloud.com',
        port: 16273
    }
});

client.on('connect', () => {
    console.log('Redis client connected to the Redis-Cloud server!');
});

export default client;