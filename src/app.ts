// https://www.toptal.com/express-js/nodejs-typescript-rest-api-pt-1
import "module-alias/register";
import "@babel/polyfill";
import express from "express";
import { Application } from "express";
import cors from "cors";
import * as http from "http";
import * as bodyparser from "body-parser";

import debug from "debug";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import * as ENVIROMENTS from "@root/utilities/enviroments";

import { ApiRouter } from "@root/routes";
import { CommonRoutesConfig } from "@root/common/common.routes.config";
import { UsersRoutes } from "@root/users/users.routes.config";

const app: Application = express();
const server: http.Server = http.createServer(app);
const port: Number = 3000;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug("app");

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

// here we are adding the UserRoutes to our array,
// after sending the Express.js application object to have the routes added to our app!
routes.push(new UsersRoutes(app));

// here we are configuring the expressWinston error-logging middleware,
// which doesn't *handle* errors per se, but does *log* them
app.use(
  expressWinston.errorLogger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(winston.format.colorize(), winston.format.json())
  })
);

app.use("/api", ApiRouter);

// this is a simple route to make sure everything is working properly
app.get("/", (req: express.Request, res: express.Response) => {
  console.log(ENVIROMENTS.APP_ENV, ENVIROMENTS.APP_PORT, ENVIROMENTS.IS_PRODUCTION);
  res.status(200).send(`Server up and running!`);
});

server.listen(port, () => {
  console.log("Hihi, server started!");
  debugLog(`Server running at http://localhost:${port}`);
  routes.forEach((route: CommonRoutesConfig) => {
    debugLog(`Routes configured for ${route.getName()}`);
  });
});
