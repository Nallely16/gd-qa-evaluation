import { Context } from "hono";
import UserRepositoryImpl from "~~/server/src/infraestructure/repositories/user.repository.impl";

export class UserController {
    private readonly userRepositoryImpl = new UserRepositoryImpl();

    public registerOrUpdate = async (c: Context) => {
        try {
            const userDto = await c.req.json();
            return c.json(await this.userRepositoryImpl.registerOrUpdate(userDto), 201)
        } catch (error) {
            return c.json({error}, 500);
        }
    }
}