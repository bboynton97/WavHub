import {UserService} from "./user.service";
import {AuthService} from "./auth.service";
import {getOpenAIClient} from "../utils/utils";

export class Services {
    public user: UserService;
    public auth: AuthService;

    constructor(
        // public database: Knex,
        isTesting?: boolean
    )
    {
        this.user = new UserService();
        this.auth = new AuthService()
    }
}