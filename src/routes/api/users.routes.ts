import { ARouter } from "@root/common/ARouter";
import * as UserService from "@root/service/users.service";

export class UsersRoutes extends ARouter {
  constructor() {
    super("UsersRoutes");
  }

  registerRouters() {
    this.router.route(`/users`).get(UserService.getAllUser).post(UserService.createUser);
    this.router.route(`/users/error`).get(UserService.createTemporaryUserError);

    this.router
      .route(`/users/:userId`)
      .get(UserService.getOneUser)
      .put(UserService.updateUser)
      .delete(UserService.deleteUser);
  }
}
