"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const errors_httpException_1 = __importDefault(require("@/serviceProvider/errors/errors.httpException"));
const CheckServices_1 = __importDefault(require("@/check/Services/CheckServices"));
class CheckController {
}
_a = CheckController;
CheckController.create = async (req, res, next) => {
    const checkService = new CheckServices_1.default;
    const data = await checkService.create(req.body, res.locals.userId);
    if (data.ok) {
        res.status(200).json({
            message: 'Check created',
            data: data.val,
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 400));
};
CheckController.getOne = async (req, res, next) => {
    const checkService = new CheckServices_1.default;
    const data = await checkService.getOne({ checkId: req.params.id, userId: res.locals.userId });
    if (data.ok) {
        res.status(200).json({
            message: 'Check found',
            data: data.val,
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 404));
};
CheckController.update = async (req, res, next) => {
    const checkService = new CheckServices_1.default;
    const data = await checkService.update({ checkId: req.params.id, userId: res.locals.userId, ...req.body });
    if (data.ok) {
        res.status(200).json({
            message: 'Check updated',
            data: data.val,
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 404));
};
CheckController.delete = async (req, res, next) => {
    const checkService = new CheckServices_1.default;
    const data = await checkService.delete({ checkId: req.params.id, userId: res.locals.userId });
    if (data.ok) {
        res.status(204).json({
            message: "record has been deleted"
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 404));
};
exports.default = CheckController;
