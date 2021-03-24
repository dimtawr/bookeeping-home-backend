export class ApiError extends Error {
    constructor(code, message, risedBy) {
        super(Array.isArray(message) ? message.join('\n') : message)
        this.code = code;
        this.message = message;
        this.risedBy = risedBy
    }
}