"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const errors_httpException_1 = __importDefault(require("@/serviceProvider/errors/errors.httpException"));
const jwt_1 = require("@/serviceProvider/utils/jwt");
const UserServices_1 = __importDefault(require("@/user/Services/UserServices"));
class UserController {
}
_a = UserController;
UserController.signup = async (req, res, next) => {
    const userService = new UserServices_1.default();
    const data = await userService.signup(req.body);
    if (data.ok) {
        res.status(200).set('token', (0, jwt_1.signJWT)(data.val.id)).json({
            message: 'verification mail sent to your mail',
            data: data.val,
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 404));
};
UserController.signin = async (req, res, next) => {
    const userService = new UserServices_1.default();
    const data = await userService.signin(req.body);
    if (data.ok) {
        let token = (0, jwt_1.signJWT)(data.val.id);
        res.status(200).json({
            data: data.val,
            token
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 404));
};
UserController.verify = async (req, res, next) => {
    const userService = new UserServices_1.default();
    const data = await userService.verify(req.body);
    if (data.ok) {
        res.status(200).json({
            message: data.val,
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 404));
};
exports.default = UserController;
