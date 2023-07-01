import { createLogger, transports, format } from "winston";
import { createStream } from "rotating-file-stream";
import path from "path";
import { errorHandler } from "./error";
const loggingLogStream = createStream("server.log", {
  size: "10M",
  interval: "1d", // rotate daily
  path: path.join(__dirname, "..", "..", "logs"),
  compress: "gzip",
});
const errorLogStream = createStream("server-error.log", {
  size: "10M",
  interval: "1d", // rotate daily
  path: path.join(__dirname, "..", "..", "logs"),
  compress: "gzip",
});

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Stream({
      stream: loggingLogStream,
    }),
    new transports.Console(),
    new transports.Stream({
      stream:errorLogStream,
      level:'error'
    })
  ],
});


export { logger };
