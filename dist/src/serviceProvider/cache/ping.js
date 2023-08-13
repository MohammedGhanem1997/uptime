"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPingList = exports.pushLatestPing = void 0;
const redis_connections_1 = __importDefault(require("@/connections/redis.connections"));
const pushLatestPing = async (pingResult) => {
    const redis = redis_connections_1.default.getClient();
    const result = await redis.rpush(`Ping:checkid#${pingResult.check._id}`, JSON.stringify(pingResult));
};
exports.pushLatestPing = pushLatestPing;
const getPingList = async (checkId) => {
    try {
        const redis = redis_connections_1.default.getClient();
        const redisResult = await redis.lrange(`Ping:checkid#${checkId}`, 0, -1);
        const pingList = redisResult.map((entry) => {
            const jsonEntry = JSON.parse(entry);
            return jsonEntry;
        });
        const check = pingList[0].check;
        const history = pingList.map((ping) => {
            return { status: ping.status, responseTime: ping.responseTime, timestamp: ping.timestamp };
        });
        return { check, history };
    }
    catch (error) {
        return new Error(error);
    }
};
exports.getPingList = getPingList;
