"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * HttpException: main error class that sent from the controllers to express global error handler
 * @param message - Error message sent to the client in the response
 * @param statusCode - HTTP status code sent to the client in the response
 */
class HttpException extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.default = HttpException;
