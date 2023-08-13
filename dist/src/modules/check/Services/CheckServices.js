"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_results_1 = require("ts-results");
const Check_1 = __importDefault(require("@/check/Models/Check"));
const Report_1 = __importDefault(require("@/report/Models/Report"));
const ping_1 = __importDefault(require("@/serviceProvider/schedulers/ping"));
class CheckService {
    constructor() {
        this.create = async (body, userId) => {
            try {
                const isCheckAlreadyExist = await Check_1.default.exists({ url: body.url });
                //Check is already exist
                if (isCheckAlreadyExist?._id) {
                    return (0, ts_results_1.Err)('Check already exists');
                }
                const check = await Check_1.default.create({ ...body, createdBy: userId });
                if (check._id) {
                    //Push the check to the PingQueue
                    await ping_1.default.addPing(check);
                    //Create Inital Report
                    const report = await Report_1.default.create({
                        status: 'up',
                        availability: 0,
                        outages: 0,
                        downtime: 0,
                        uptime: 0,
                        averageResponseTime: 0,
                        history: [{}],
                        timestamp: Date.now(),
                        forCheck: check._id,
                    });
                    return (0, ts_results_1.Ok)(check);
                }
                else
                    return (0, ts_results_1.Err)('Error in creating check');
            }
            catch (error) {
                return (0, ts_results_1.Err)(error);
            }
        };
        this.getOne = async (body) => {
            const check = await Check_1.default.findOne({ _id: body.checkId, createdBy: body.userId }, { __v: false });
            if (check == null) {
                return (0, ts_results_1.Err)('Check not found');
            }
            return (0, ts_results_1.Ok)(check);
        };
        this.update = async (body) => {
            try {
                const check = await Check_1.default.findOneAndUpdate({ _id: body.checkId, createdBy: body.userId }, body);
                if (check == null) {
                    return (0, ts_results_1.Err)('Check not found');
                }
                //Delete the old check from the ping scheduler
                await ping_1.default.deletePing(body.checkId);
                // Get the new data
                //@ts-ignore
                const newcheck = await Check_1.default.findOne({ _id: body.checkId, createdBy: body.userId }, { __v: false });
                //Then add the new one
                await ping_1.default.addPing(newcheck);
                return (0, ts_results_1.Ok)(newcheck);
            }
            catch (error) {
                return (0, ts_results_1.Err)(error);
            }
        };
        this.delete = async (body) => {
            try {
                const check = await Check_1.default.findOneAndDelete({ _id: body.checkId, createdBy: body.userId });
                if (check == null) {
                    return (0, ts_results_1.Err)('Check not found');
                }
                await ping_1.default.deletePing(body.checkId);
                return (0, ts_results_1.Ok)(true);
            }
            catch (error) {
                return (0, ts_results_1.Err)(error);
            }
        };
    }
}
exports.default = CheckService;
