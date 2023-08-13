"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errors_httpException_1 = __importDefault(require("@/serviceProvider/errors/errors.httpException"));
function validationMiddleWare(schema) {
    return async (req, res, next) => {
        await schema
            .parseAsync(req.body)
            .then((value) => {
            req.body = value;
            next();
        })
            .catch((zodError) => {
            zodError.errors.length = 1;
            const errorMessage = zodError.errors[0].message;
            next(new errors_httpException_1.default(errorMessage, 400));
        });
    };
}
exports.default = validationMiddleWare;
