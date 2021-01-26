import { ARouter } from "@root/common/ARouter";
import { ResFormatter } from "@root/utilities/response.format";
import { getListUsers } from "@root/repository/users.repository";
import express from "express";

export class UsersRoutes extends ARouter {
  constructor() {
    super("UsersRoutes");
  }

  configureRoutes() {
    this.router
      .route(`/users`)
      .get((req: express.Request, res: express.Response) => {
        let users = getListUsers();
        let messageResponse = new ResFormatter(200, false, "Get list users", users);
        res.json(messageResponse);
      })
      .post((req: express.Request, res: express.Response) => {
        let messageResponse = new ResFormatter(200, false, "Create new user", null);
        res.json(messageResponse);
      });

    this.router
      .route(`/users/:userId`)
      .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
        console.log(req.url);
        next();
      })
      .get((req: express.Request, res: express.Response) => {
        res.status(200).send(`GET requested for id ${req.params.userId}`);
      })
      .put((req: express.Request, res: express.Response) => {
        res.status(200).send(`PUT requested for id ${req.params.userId}`);
      })
      .patch((req: express.Request, res: express.Response) => {
        res.status(200).send(`PATCH requested for id ${req.params.userId}`);
      })
      .delete((req: express.Request, res: express.Response) => {
        res.status(200).send(`DELETE requested for id ${req.params.userId}`);
      });
  }
}
