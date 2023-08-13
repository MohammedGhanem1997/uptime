"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationMiddleWare = void 0;
const jwt_utils_1 = require("@/shared/utils/jwt.utils");
const errors_httpException_1 = __importDefault(require("@/shared/errors/errors.httpException"));
const authenticationMiddleWare = async (req, res, next) => {
    const authorizationHeader = req.get('authorization');
    if (authorizationHeader) {
        const token = authorizationHeader.split(' ')[1];
        const isTokenValid = await (0, jwt_utils_1.verifyJWT)(token);
        if (isTokenValid.isValid === false)
            next(new errors_httpException_1.default('Token is not valid', 401));
        res.locals.userId = isTokenValid.userId;
        // req.userId = isTokenValid.userId
    }
    else
        next(new errors_httpException_1.default('No authorization header found', 401));
    return next();
};
exports.authenticationMiddleWare = authenticationMiddleWare;
