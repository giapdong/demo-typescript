import * as fs from "fs";
import moment from "moment";
import winston, { createLogger, format, transports } from "winston";
import { APP_ENV, LOG_DIRECTORY } from "@root/utilities/enviroments";

if (!fs.existsSync(LOG_DIRECTORY)) {
  fs.mkdirSync(LOG_DIRECTORY);
}

const logLevel = APP_ENV === "production" ? "info" : "silly";

winston.addColors({
  error: "bold red",
  warn: "bold yellow",
  info: "bold white",
  http: "bold white",
  verbose: "bold white",
  debug: "bold blue",
  silly: "bold gray"
});

const logger: winston.Logger = createLogger({
  transports: [
    new transports.Console({
      level: logLevel,
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    }),
    new transports.File({
      level: "warn",
      filename: `logs/${moment().format("YY")}/${moment().format("MM")}/${moment().format("DD")}.log`,
      format: format.combine(
        format.errors({ stack: true }),
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss"
        }),
        format.printf(info => {
          let levelPad = info.level.toString().padEnd(5, " ");
          let prefix = `[${info.timestamp}] ${levelPad}`;
          let data = `: ${info.message}`;
          return prefix + data;
        })
      )
    })
  ],
  exitOnError: false // do not exit on handled exceptions
});

export default logger;
