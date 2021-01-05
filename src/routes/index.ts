import { Router } from "express";
import { UsersRoutes } from "@root/users/users.routes.config";

const router: Router = Router();

router.use("/api", new UsersRoutes().getRouter());

export const ApiRouter: Router = router;
