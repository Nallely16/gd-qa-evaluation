import { Hono } from "hono";
import { UserRoutes } from "./user/routes";

export class V1Routes {
    public get routes(): Hono{
        const routes = new Hono();
        routes.route("/user", new UserRoutes().routes)
        return routes;
    }
}