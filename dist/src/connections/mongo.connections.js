"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class MongoConnection {
    static connect() {
        console.log(process.env.MONGODB_URI);
        mongoose_1.default.connect(String(process.env.MONGODB_URI));
    }
}
exports.default = MongoConnection;
