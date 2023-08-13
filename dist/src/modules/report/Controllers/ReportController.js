"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const errors_httpException_1 = __importDefault(require("@/serviceProvider/errors/errors.httpException"));
const ReportService_1 = __importDefault(require("@/report/Services/ReportService"));
class ReportController {
    intializeRoutes() {
    }
}
_a = ReportController;
ReportController.getOne = async (req, res, next) => {
    const reportService = new ReportService_1.default();
    const data = await reportService.get({ checkId: req.params.checkId, userId: res.locals.userId });
    if (data.ok) {
        res.status(200).json({
            message: 'Report created',
            data: data.val,
        });
    }
    else
        next(new errors_httpException_1.default(data.val, 400));
};
exports.default = ReportController;
