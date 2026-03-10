export class APIError extends Error {
  public statusCode: number
  public isPublic: boolean

  constructor(message: string, statusCode: number = 500, isPublic: boolean = false) {
    super(message)
    this.name = 'APIError'
    this.statusCode = statusCode
    this.isPublic = isPublic

    // Restore prototype chain when extending a built-in class in TypeScript
    Object.setPrototypeOf(this, APIError.prototype)
  }
}
