import winston from "winston";

const options = {
  file: {
    level: "info",
    filename: "./logs/app.log",
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: "debug",
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File({filename:"./logs/error.log", level: "error"}),
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});

export { logger };

// import winston from "winston";

// const logger = winston.createLogger({
//   level: "info",
//   format: winston.format.json(),
//   transports: [
//     new winston.transports.Console(), // This is for development
//     new winston.transports.Http({ host: "(link unavailable)", port: 3000 }), // This is a fake URL
//     new winston.transports.File({ filename: "error.log", level: "error" }), // This is for production
//     new winston.transports.File({ filename: "combined.log" }), // This is for production
//   ],
// });

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }

// export { logger };
