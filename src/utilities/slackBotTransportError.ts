import * as winston from "winston";
import SlackHook from "winston-slack-webhook-transport";
import * as ENV from "@root/utilities/enviroments";

const slackErrorLogger = winston.createLogger({
  transports: [
    new SlackHook({
      webhookUrl: ENV.SLACK_WEBHOOK_ERROR
    })
  ]
});

export default slackErrorLogger;
