export class UserSafeError extends Error {
    constructor(msg: string) {
        super(msg)

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, UserSafeError.prototype)
    }
}
