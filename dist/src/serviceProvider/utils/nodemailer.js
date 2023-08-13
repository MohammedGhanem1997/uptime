"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mailer = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    host: String(process.env.NODEMAILER_HOST),
    port: Number(process.env.NODEMAILER_PORT),
    auth: {
        user: String(process.env.NODEMAILER_AUTH_USER),
        pass: String(process.env.NODEMAILER_AUTH_PASSWORD),
    },
});
exports.mailer = transporter;
