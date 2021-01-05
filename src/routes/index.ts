import { Router } from "express";
import { UsersRoutes } from "@root/users/users.routes.config";

const router: Router = Router();

// router.use("/users", UsersRoutes);

export const ApiRouter: Router = router;
