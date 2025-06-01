import { Context } from "hono";
import UserRepositoryImpl from "~~/server/src/infraestructure/repositories/user.repository.impl";
import { generateJWT } from "~~/server/src/shared/utils";

export class UserController {
    private readonly userRepositoryImpl = new UserRepositoryImpl();

    public registerOrUpdate = async (c: Context) => {
        try {
            const userDto = await c.req.json();
            return c.json(await this.userRepositoryImpl.registerOrUpdate(userDto), 201)
        } catch (error) {
            return c.json({ error }, 500);
        }
    }

    public getCredentials = async (c: Context) => {
        try {
            const { email, password } = await c.req.json();
            const user = await this.userRepositoryImpl.getCredentials(email, password);
            const token = generateJWT({
                email: user.email,
                username: user.username
            });

            return c.json({ user, token }, 200);
        } catch (error) {
            return c.json({ error }, 500);
        }
    };

    public changeUsername = async (c: Context) => {
        try {
            const { username, email } = await c.req.json();
            const updatedUser = await this.userRepositoryImpl.changeUsername(username, email);
            return c.json(updatedUser, 200);
        } catch (error) {
            return c.json({ error }, 500);
        }
    }

    public updatePassword = async (c: Context) => {
        try {
            const { email, currentPassword, newPassword } = await c.req.json();
            await this.userRepositoryImpl.updatePassword(email, currentPassword, newPassword);
            return c.json({ message: 'Actualizado correctamente!' }, 200);
        } catch (error) {
            return c.json({ error }, 500);
        }
    }
}