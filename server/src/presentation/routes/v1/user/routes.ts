import { Hono } from "hono";
import { UserController } from "./controller";

export class UserRoutes {
    public get routes(): Hono {
        const router = new Hono();
        const controller = new UserController;
        router.post('/', controller.registerOrUpdate);
        router.post('/credentials', controller.getCredentials);
        router.put('/profile', controller.changeUsername);
        router.put('/profile-password', controller.updatePassword);
        return router;
    }
}