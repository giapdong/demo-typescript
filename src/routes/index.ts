import { Router } from "express";
import { UsersRoutes } from "@root/routes/api/users/users.routes";

const router: Router = Router();

router.use("/api", new UsersRoutes().getRouter());

export const ApiRouter: Router = router;
