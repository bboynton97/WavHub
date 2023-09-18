import fs from "fs";
// @ts-ignore
import * as jwt from "jsonwebtoken"
import Context from "./context";
// import {User} from "types";

export function middleware(req: any, res: any, next: any) {
    Context.bind(req);
    const ctx: Context | null = Context.get(req);

    // If no token, skip
    if (!req.headers.authorization) {
        return next();
    }

    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token || token === 'none') return next()

    let privateKey;
    try {
        privateKey = fs.readFileSync('keys/key.pem');
    } catch (e) {
        privateKey = process.env.PRIVATE_KEY || "no key"
        privateKey = (privateKey as string).replace(/\\n/g,'\n')
    }


    jwt.verify(token, privateKey, { algorithms: ['RS256', 'HS256'] }, function (err: any, decoded: any) {
        if (err) {
            return res.status(500).json(err);
        }

        if (ctx) ctx.user = decoded; // as User;
        return next();
    })
}