"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
class RedisConnection {
    static connect() {
        this.client = new ioredis_1.default();
    }
    static getClient() {
        return this.client;
    }
}
exports.default = RedisConnection;
