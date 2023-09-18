import {Services} from "../services/_services"
import {middleware} from "../middleware/middleware";
import {UserController} from "./user.controller";
// @ts-ignore
import {Hono} from "hono";

export class Routes {
    app: Hono;
    constructor(services: Services) {
        this.app = new Hono();
        // this.app.use(middleware);
        // this.router.use('/auth', new AuthController(services).routes());
        this.app.route('/user', new UserController(services).routes());

        this.app.get('/status', (c: any) =>
            { return c.text('Server Up') }
        )

        this.app.notFound((c: any) => {
            return c.text('Custom 404 Not Found', 404)
        })
        // this.app.all('/*', (c: any) => { return c.res.status(404).send() })
    }

    routes(): Hono {
        return this.app
    }
}
