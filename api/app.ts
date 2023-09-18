require('dotenv').config();
import {Services} from "./services/_services";
import {Routes} from "./controllers/_routes";
const cors = require('cors')
import {extendPrimitives} from "./utils/extend-primitives";
const path = require('path')
// @ts-ignore
import { Hono } from 'hono'



// extendPrimitives()

const PORT = process.env.PORT || 3000;

const app = new Hono()
const services = new Services();
const routes = new Routes(services).routes()

if (process.env.ENVIRONMENT === 'localhost') {
    app.use('*', async (c: any, next: any) => {
        console.info(`${c.req.method} ${c.req.url.split(PORT)[1]}`)
        await next()
    })
}


app.route('/api', routes)

// app.use(cors())

// ---- Database ---- //



// MongoDB
// mongoose.set('debug', true);
app.get('/status', (c: any) => c.text('Server up'));
app.get('/', (c: any) => {
    return c.text('Hello Hono!')
})

// // ---- App Serve ---- //
//     const _app_folder = path.join(__dirname, process.env.APP_ANGULAR_DIST_ROUTE || '../app/dist/app');
//     app.use('/', express.static(_app_folder, {maxAge: '1y', setHeaders: (res, path) => {
//             if (path.indexOf('.js') >= 0) {
//                 res.setHeader('Content-Type', 'text/javascript')
//             }
//         }}));
//
//     app.all('/*', function (req, res) {
//         if (req.url.indexOf('.js') >= 0) {
//             res.setHeader('Content-Type', 'text/javascript')
//         }
//         res.status(200).sendFile('/', {root: _app_folder});
//     });

// app.listen(PORT,  () => {
//     console.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
// });

// const jobs = new Jobs(services);

export default app
