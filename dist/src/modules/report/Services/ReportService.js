"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ts_results_1 = require("ts-results");
const Report_1 = __importDefault(require("@/report/Models/Report"));
const ping_1 = require("@/serviceProvider/cache/ping");
// import { IGetPingList } from '@/serviceProvider/interfaces/ping.interface'
const pingStatus_1 = __importDefault(require("@/serviceProvider/Constant/pingStatus"));
class ReportService {
    constructor() {
        this.get = async (body) => {
            try {
                const pingList = await (0, ping_1.getPingList)(body.checkId);
                const lastPingStatus = pingList.history[pingList.history.length - 1].status;
                const outages = pingList.history.filter((ping) => ping.status === pingStatus_1.default.DOWN).length;
                const ups = pingList.history.filter((ping) => ping.status === pingStatus_1.default.UP).length;
                const uptime = (pingList.check.interval ?? 0) * ups;
                const downtime = (pingList.check.interval ?? 0) * outages;
                const availability = parseFloat(Number((uptime / (uptime + downtime)) * 100).toFixed(2));
                const averageResponseTime = parseFloat(Number(pingList.history.map((entry) => entry.responseTime).reduce((prev, curr) => prev + curr, 0) /
                    pingList.history.length).toFixed(2));
                const newReport = {
                    status: lastPingStatus,
                    ups,
                    outages,
                    uptime,
                    downtime,
                    averageResponseTime,
                    availability,
                    //@ts-ignore
                    history: pingList.history,
                    timestamp: Date.now(),
                    forCheck: pingList.check._id,
                };
                //Create the Report
                const report = await Report_1.default.create(newReport);
                if (!report._id) {
                    return (0, ts_results_1.Err)('Error in creating the report');
                }
                return (0, ts_results_1.Ok)(newReport);
            }
            catch (error) {
                return (0, ts_results_1.Err)('Error in not cheaked yot please wait');
            }
        };
    }
}
exports.default = ReportService;
