export function extendPrimitives(): void {
    // Extend BigInt prototype for easier JSON stringification
    Object.defineProperty(BigInt.prototype, 'toJSON', {
        value: function (): string {
            return this.toString()
        }
    })
}