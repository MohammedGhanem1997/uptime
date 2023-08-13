"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const Route_1 = __importDefault(require("@/user/Route"));
const Route_2 = __importDefault(require("@/check/Route"));
const Route_3 = __importDefault(require("@/report/Route"));
exports.routes = [
    new Route_1.default(),
    new Route_2.default(),
    new Route_3.default(),
];
