"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJWT = exports.signJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("@/user/Models/user"));
const signJWT = (userId) => {
    return jsonwebtoken_1.default.sign({ userId }, String(process.env.JWT_SECRET), {
        expiresIn: String(process.env.JWT_EXPIRES_IN),
    });
};
exports.signJWT = signJWT;
const verifyJWT = async (token) => {
    const result = jsonwebtoken_1.default.verify(token, String(process.env.JWT_SECRET));
    //@ts-ignore
    const userId = result.userId;
    const isUserAlreadyExist = await user_1.default.exists({ _id: userId });
    //User exists
    if (isUserAlreadyExist?._id) {
        return { userId, isValid: true };
    }
    return { userId: null, isValid: false };
};
exports.verifyJWT = verifyJWT;
