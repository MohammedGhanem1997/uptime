"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_middleware_1 = require("@/serviceProvider/middlewares/authentication.middleware");
const ReportController_1 = __importDefault(require("@/report/Controllers/ReportController"));
class Route {
    constructor() {
        this.path = '/reports';
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(`${this.path}/:checkId`, authentication_middleware_1.authenticationMiddleWare, ReportController_1.default.getOne);
    }
}
exports.default = Route;
