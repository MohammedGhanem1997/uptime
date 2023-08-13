"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/serviceProvider/middlewares/validation.middleware"));
const UserRequest_1 = require("@/user/Requests/UserRequest");
const UserController_1 = __importDefault(require("@/user/Controllers/UserController"));
class Route {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(`${this.path}/signup`, (0, validation_middleware_1.default)(UserRequest_1.signUpSchema), UserController_1.default.signup);
        this.router.post(`${this.path}/signin`, (0, validation_middleware_1.default)(UserRequest_1.signInSchema), UserController_1.default.signin);
        this.router.post(`${this.path}/verify`, (0, validation_middleware_1.default)(UserRequest_1.verifySchema), UserController_1.default.verify);
    }
}
exports.default = Route;
