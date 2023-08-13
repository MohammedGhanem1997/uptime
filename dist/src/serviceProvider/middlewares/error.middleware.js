"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Express global error handler
 * @param err - HttpException passed from controllers
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next function
 */
function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message || 'Something went wrong!';
    res.status(status).json({
        status,
        message,
    });
}
exports.default = errorHandler;
