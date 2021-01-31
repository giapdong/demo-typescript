import express from "express";
import Formatter from "response-format";

import * as UserRepository from "@root/repository/users.repository";

export function getAllUser(req: express.Request, res: express.Response) {
  let users = UserRepository.getListUsers();
  res.json(Formatter.success("Get list users", users));
}

export function createUser(req: express.Request, res: express.Response) {
  res.json(Formatter.success("Create new user", null));
}

export function createTemporaryUserError(req: express.Request, res: express.Response) {
  res.json(Formatter.badRequest("Error in user", null));
}

export function getOneUser(req: express.Request, res: express.Response) {
  res.status(200).send(`GET requested for id ${req.params.userId}`);
}

export function updateUser(req: express.Request, res: express.Response) {
  res.status(200).send(`PUT requested for id ${req.params.userId}`);
}

export function deleteUser(req: express.Request, res: express.Response) {
  res.status(200).send(`DELETE requested for id ${req.params.userId}`);
}
