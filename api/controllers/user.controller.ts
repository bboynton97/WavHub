import {Services} from "../services/_services";
// import { Request, Response } from "express-serve-static-core";
import Context from "../middleware/context";
// import {Channel, ChannelEpisode, DashboardData, ProductClick, TimeSeriesData, User, VisitData} from "types";
// import {countEventsByPeriod, refreshUser} from "../utils/utils";
// import {ChannelEpisodeModel, ChannelModel, UserModel} from "../models";
// @ts-ignore
import {Hono} from "hono";

export class UserController {
    services: Services
    app: Hono

    constructor(services: Services) {
        this.app = new Hono();
        this.services = services

        // this.router.post('/push',(res, req) => this.push(res, req))
        this.app.get('/', (c: any) => this.getSelf(c))
        // this.router.get('/dashboard', (res, req) => this.getDashboardData(res, req))
        // this.router.get('/completedWalkthrough', (res, req) => this.completedWalkthrough(res, req))
        // this.router.get('/resetWalkthrough', (res, req) => this.resetWalkthrough(res, req))
        // this.router.get('/:id', (res, req) => this.getUser(res, req))
    }

    async getSelf(c:any) {
        // user = await refreshUser(user)
        // delete user?.otp

        // return c.json(user)
        return c.json('hi')
    }

    /*
    async completedWalkthrough(req: Request, res: Response) {
        let user: User | undefined = Context.get(req)?.user
        if (!user?._id) return res.status(400).json({error: 'Missing user ID'})
        await UserModel.updateOne({_id: user._id}, { $set: { completedWalkthrough: true } }, {strict:false})
        return res.status(200).json(user)
    }

    async resetWalkthrough(req: Request, res: Response) {
        let user: User | undefined = Context.get(req)?.user
        if (!user?._id) return res.status(400).json({error: 'Missing user ID'})
        await UserModel.updateOne({_id: user._id}, { $set: { completedWalkthrough: false } }, {strict:false})
        return res.status(200).json(user)
    }

    async getUser(req: Request, res: Response) {
        const userLookup = await UserModel.findById(req.params.id) as User

        // Only some info
        return res.status(200).json({
            _id: userLookup._id,
            name: userLookup.name,
            email: userLookup.email, // TODO: decide if we want to expose this
        })
    }
    */

    routes(): Hono {
        return this.app
    }
}