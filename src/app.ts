// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
import "module-alias/register";
import "@babel/polyfill";

import express from "express";
import { Application } from "express";
import cors from "cors";
import * as http from "http";
import * as bodyparser from "body-parser";

import * as winston from "winston";
import * as expressWinston from "express-winston";
import logger from "@root/utilities/logger";
import { ApiRouter } from "@root/routes";
import * as ENV from "@root/utilities/enviroments";

const app: Application = express();
const server: http.Server = http.createServer(app);
const port: Number = ENV.APP_PORT;

app.use(bodyparser.json());
app.use(cors());

// here we are configuring the expressWinston logging middleware,
// which will automatically log all HTTP requests handled by Express.js
app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.label({ label: "HTTP" }),
      winston.format.timestamp(),
      winston.format.printf(({ level, message, label, timestamp }) => {
        return `${level}: [${label}] ${timestamp} ${message}`;
      })
    ),
    msg: "{{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) {
      return false;
    }
  })
);

app.use(ApiRouter);

// here we are configuring the expressWinston error-logging middleware,
// which doesn't *handle* errors per se, but does *log* them
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json())
  })
);

server.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at https://localhost:${port}`);
});
