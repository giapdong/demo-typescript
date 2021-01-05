import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: "enviroments/.env" });

export const APP_ENV = process.env.APP_ENV; // development|production
export const IS_PRODUCTION = APP_ENV === "production";
export const APP_PORT = process.env.APP_PORT || 8088;
export const LOG_DIRECTORY = process.env.LOG_DIRECTORY || path.resolve("logs");
