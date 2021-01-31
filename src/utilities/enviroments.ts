import * as dotenv from "dotenv";
import * as path from "path";
if (!process.env.BREAK_POINT) dotenv.config({ path: "enviroments/.env" });

export const APP_ENV = process.env.APP_ENV; // development | production | test
export const IS_PRODUCTION = APP_ENV === "production";
export const APP_PORT = normalizePort(process.env.APP_PORT);
export const LOG_DIRECTORY = process.env.LOG_DIRECTORY || path.resolve("logs");
export const SLACK_WEBHOOK_ERROR = process.env.SLACK_WEBHOOK_ERROR || "";

function normalizePort(value: string | null | undefined) {
  let defaultPort = 8088;
  if (!value) return defaultPort;

  let port: number = parseInt(value, 10);
  if (!isNaN(port) && port >= 0) return port;

  return defaultPort;
}
