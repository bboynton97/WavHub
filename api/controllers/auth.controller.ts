import {Services} from "../services/_services";
// import {UserModel} from "../models/";
// import {User, PhoneNumber} from "types";
// import {isAdmin} from "../utils/utils";
// @ts-ignore
import {Router} from "hono/dist/types/router";

export class AuthController {
    services: Services
    router: Router

    constructor(services: Services) {
        this.router = Router()
        this.services = services

        // this.router.post('/', (req, res) => this.sendMagicLink(req,res))
        // this.router.post('/getUrl', (req, res) => this.getMagicLink(req,res))
        // this.router.post('/verify', (req, res) => this.verifyCode(req, res))
        // this.router.post('/verifyAdmin', (req, res) => this.verifyAdminCode(req, res))
        // this.router.post('/alpha/waitlist', (req, res) => this.joinAlphaWaitlist(req, res))
        // this.router.post('/alpha/waitlist/confirm', (req, res) => this.confirmAlphaWaitlist(req, res))
        // this.router.get('/invite/:code', (req, res) => this.getInviteCode(req, res))
    }

    /*
    async sendMagicLink(c: any): Promise<Response> {
        try {
            const {email, inviteCode} = c.req.body

            await this.services.auth.sendMagicLink(email, inviteCode)
        } catch (e) {
            return c.res.status(500).json(e)
        }
        return c.res.status(200).send()
    }

    async getMagicLink(c: any): Promise<Response> {
        try {
            const {email, inviteCode} = c.req.body

            const url = await this.services.auth.getMagicLink(email, inviteCode)
            return c.res.status(200).json(url)
        } catch (e) {
            return c.res.status(500).json(e)
        }
    }


    async verifyCode(c: any): Promise<Response> {
        try {
            // const { code, userId } = req.body
            //
            // const user = await UserModel.findById(userId) as User
            // if (!user) return res.status(401).json('No user exists for that code')
            //
            // const isAuthed = await this.services.auth.verifyOtp(user, code)
            //
            // if (!isAuthed.success) return res.status(401).json(isAuthed)
            //
            // const token = await this.services.auth.newJwtForUser(user)
            //
            return c.res.status(200).send({token: 'Bearer '}) //+ token});
        } catch (e) {
            console.error(e)
            return c.res.status(500).json(e)
        }
    }

    async verifyAdminCode(c: any): Promise<Response> {
        try {
            // const { countryCode, phoneNumber, code } = c.req.body
            //
            // const phoneNumberObj = new PhoneNumber(countryCode, phoneNumber)
            // const user = await UserModel.findOne({phoneNumber: phoneNumberObj}) as User
            // if (!user) return res.status(401).json('No user exists for that phone number')
            // if (!isAdmin(user)) return res.status(401).json('Only admin accounts can access this dashboard')
            //
            // const isAuthed = await this.services.auth.verifyOtp(user, code)
            //
            // if (!isAuthed.success) return res.status(401).json(isAuthed)
            //
            // const token = await this.services.auth.newJwtForUser(user)

            return c.res.status(200).send({token: 'Bearer ' }) //+ token});
        } catch (e) {
            return c.res.status(500).json(e)
        }
    }
    */

    routes(): Router {
        return this.router
    }
}