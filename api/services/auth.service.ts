// import {OTP, UserModel} from "../models";
// import {InviteCode, PhoneNumber, User} from "types"
import {generateOtpCode} from "../utils/utils";
import fs from "fs";
// import jwt from "jsonwebtoken";
// import {Guid} from "guid-typescript";
// const sgMail = require('@sendgrid/mail')

export class AuthService {

    constructor() {
        // sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    }

    /*
    async sendMagicLink(email: string, inviteCode?: InviteCode): Promise<void> {
        const loginUrl = await this.getMagicLink(email, inviteCode)

        try {
            await sgMail.send({
                to: email.toLowerCase(), // Change to your recipient
                from: 'sponsors@infinitetimelines.com', // Change to your verified sender
                dynamic_template_data: {
                    loginUrl
                },
                template_id: 'd-3ba3378d56084ca395a503618fd6cdf7'
            })
        } catch (e) {
            console.error(e)
        }
    }

    async getMagicLink(email: string, inviteCode?: InviteCode): Promise<string> {
        let user = await UserModel.findOne({email}) as User
        const otp: OTP = {
            code: Guid.raw(),
            exp: new Date(new Date().getTime() + 1800000) // 30 min from now
        }

        if (user) {
            // Update OTP
            user.otp = otp
            await UserModel.updateOne({_id: user._id}, user)
        } else {
            const newUser = new User()
            newUser.email = email
            newUser.otp = otp
            if (inviteCode?.userType === 'demo') newUser.role = 'demo'

            // Create new user
            user = await UserModel.create(newUser) as any
        }

        let origin = process.env.ENVIRONMENT === 'production' ? process.env.HOST_URL : 'http://localhost:4200'
        let loginUrl = `${origin}/auth/confirm/${user._id}/${otp.code}`
        if (inviteCode) loginUrl += `/${inviteCode.code}`

        return loginUrl
    }

    async sendWaitlistEmail(email: string): Promise<void> {
        let user = await UserModel.findOne({email}) as User
        const otp: OTP = {
            code: Guid.raw(),
            exp: new Date(new Date().getTime() + 1800000) // 30 min from now
        }

        if (user) {
            // Update OTP
            throw new Error("You're already on the waitlist")
        } else {
            const newUser = new User()
            newUser.email = email
            newUser.otp = otp

            // Create new user
            user = await UserModel.create(newUser) as any
        }

        let origin = process.env.HOST_URL
        const msg = {
            to: email, // Change to your recipient
            from: 'sponsors@infinitetimelines.com', // Change to your verified sender
            subject: 'Confirm your ShopWithUs email',
            text: 'Click the magic link in this email',
            html: `<p>Click <a href="${`${origin}/auth/waitlist/${user._id}/${otp.code}`}">here</a> to join the waitlist.</p>`,
        }
        await sgMail.send(msg)
    }

    async sendOtp(phoneNumber: PhoneNumber): Promise<void> {
        // Check if number belongs to a user
        const existingUser = await UserModel.findOne({phoneNumber}) as User

        const otp: OTP = {
            code: generateOtpCode(),
            exp: new Date(new Date().getTime() + 1800000) // 30 min from now
        }

        if (existingUser) {
            // Update OTP
            existingUser.otp = otp
            await UserModel.updateOne({_id: existingUser._id}, existingUser)
        } else {
            // Create new user
            await UserModel.create({
                phoneNumber,
                otp,
                createdAt: new Date().toISOString()
            })
        }
    }

    async verifyOtp(user: User, code: string): Promise<{success: boolean, message?: string}> {
        if (!user.otp?.code) return {success: false, message:'No OTP has been requested for this user'}
        if (user.otp.code != code) return {success: false, message:'Incorrect OTP for this email'}

        if (user.otp.exp < new Date()) return {success: false, message:'OTP has expired, please start over'}

        return {success: true}
    }

    async newJwtForUser(user: User): Promise<string> {
        let privateKey;
        try {
            privateKey = fs.readFileSync('keys/key.pem');
        } catch (e) {
            privateKey = process.env.PRIVATE_KEY || "no key"
            privateKey = (privateKey as string).replace(/\\n/g,'\n')
        }

        delete user.otp
        return jwt.sign(JSON.stringify(user), privateKey, {algorithm: 'RS256'})
    }
    */
}