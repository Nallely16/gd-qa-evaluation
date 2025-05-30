import {serve} from "@hono/node-server"
import {Hono} from "hono"
import {cors} from "hono/cors"
//import AppRoutes from "@/presentation/routes/routes";
import { env } from "../shared/env";
import { DbSequelize } from "../infraestructure/database/init";


export class Server {
    public readonly app: Hono
    private readonly port: number

    constructor() {
        this.app = new Hono()
        this.port = env.DB_PORT

    }

    public async start(): Promise<void> {
        try {
            console.time('start server')
            this.cors()
            //this.app.route('/', new AppRoutes().routes)
            await DbSequelize()
            this.server()

            console.timeEnd('start server')
        } catch (error) {
            console.log(error);
        }
    }

    public cors(): void {
        this.app.use('*', async (c, next) => {
            const corsMiddleware = cors()
            return await corsMiddleware(c, next)
        })
    }

    public server(): void {
        serve({
            fetch: this.app.fetch,
            port: this.port
        }, (info) => {
            console.log(`Server is running on port ${info.port}`);
        })
    }
}
