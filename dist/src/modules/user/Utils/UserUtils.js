"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildUserResult = exports.verifyPassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const hashPassword = async (password) => {
    return await bcrypt_1.default.hashSync(password, 10);
};
exports.hashPassword = hashPassword;
const verifyPassword = async (password, hashedPassword) => {
    const isPasswordMatch = await bcrypt_1.default.compareSync(password, hashedPassword);
    return isPasswordMatch;
};
exports.verifyPassword = verifyPassword;
const buildUserResult = (completUser) => {
    return {
        id: completUser._id,
        name: completUser.name,
        email: completUser.email,
    };
};
exports.buildUserResult = buildUserResult;
