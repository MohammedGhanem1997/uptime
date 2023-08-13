"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/serviceProvider/middlewares/validation.middleware"));
const CreateRequest_1 = require("@/check/Request/CreateRequest");
const authentication_middleware_1 = require("@/serviceProvider/middlewares/authentication.middleware");
const CheckControllers_1 = __importDefault(require("@/check/Controllers/CheckControllers"));
const updateCheckSchema_1 = require("@/check//Request/updateCheckSchema");
class Route {
    constructor() {
        this.path = '/checks';
        this.router = (0, express_1.Router)();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(`${this.path}/`, authentication_middleware_1.authenticationMiddleWare, (0, validation_middleware_1.default)(CreateRequest_1.createCheckSchema), CheckControllers_1.default.create);
        this.router.get(`${this.path}/:id`, authentication_middleware_1.authenticationMiddleWare, CheckControllers_1.default.getOne);
        this.router.patch(`${this.path}/:id`, authentication_middleware_1.authenticationMiddleWare, (0, validation_middleware_1.default)(updateCheckSchema_1.updateCheckSchema), CheckControllers_1.default.update);
        this.router.delete(`${this.path}/:id`, authentication_middleware_1.authenticationMiddleWare, CheckControllers_1.default.delete);
    }
}
exports.default = Route;
