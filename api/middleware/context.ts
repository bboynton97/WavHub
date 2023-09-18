import { Request } from 'express';
import {User} from "types";

export default class Context {

    static _bindings = new WeakMap<Request, Context>();

    private _user?: User;

    constructor () {}

    static bind (req: Request) : void {
        const ctx = new Context();
        Context._bindings.set(req, ctx);
    }

    static get (req: Request) : Context | null {
        return Context._bindings.get(req) || null;
    }

    get user(): User | undefined {
        return this._user;
    }

    set user(value: User | undefined) {
        this._user = value;
    }
}