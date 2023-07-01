import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import { errorHandler } from "./utils/error";
import cors from "cors";
import compression from "compression";
import { allRoutes } from "./routes";

const app = express();
app.use(helmet());
dotenv.config();
app.disable("x-powered-by");
var allowedOrigins = ["http://localhost:3000"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    exposedHeaders: ["Content-Disposition"],
    maxAge: 86400,
  })
);
// Improve Performance for User experience
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(allRoutes)
app.use(errorHandler);

app.listen(process.env.PORT, async () => {
  console.log(`REST API server ready at: http://localhost:${process.env.PORT}`);
});
