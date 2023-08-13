"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
require("dotenv/config");
const app_1 = __importDefault(require("./app"));
const route_1 = require("@/serviceProvider/route");
// import IRouter from '@/serviceProvider/interfaces/IRouter'
const app = new app_1.default(route_1.routes, Number(process.env.PORT));
app.listen();
