"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = void 0;
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create();
exports.axios = instance;
instance.interceptors.request.use((config) => {
    //@ts-ignore
    config.headers['Request-Starttime'] = Date.now();
    return config;
});
instance.interceptors.response.use((response) => {
    const currentTime = Date.now();
    //@ts-ignore
    const startTime = response.config.headers['Request-Starttime'];
    //@ts-ignore
    response.headers['Request-Duration'] = Math.abs(currentTime - startTime) / 1000;
    return response;
});
