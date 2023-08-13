"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const bullmq_1 = require("bullmq");
const ioredis_1 = __importDefault(require("ioredis"));
const axios_utils_1 = require("@/shared/utils/axios.utils");
const ping_cache_1 = require("@/shared/cache/ping.cache");
const pingStatus_enum_1 = __importDefault(require("@/shared/enums/pingStatus.enum"));
const notification_services_1 = require("@/shared/services/notification.services");
const emailNotificaion_service_1 = __importDefault(require("@/shared/services/emailNotificaion.service"));
class PingScheduler {
    static async addPing(ping) {
        try {
            await this.queue.add(ping._id.toString(), ping, {
                repeat: {
                    every: ping.interval,
                },
                jobId: ping._id.toString(),
            });
        }
        catch (error) { }
    }
    static async deletePing(id) {
        try {
            const jobKey = await (await this.queue.getRepeatableJobs())
                .filter((entry) => {
                return entry.id === id;
            })
                .map((entry) => entry.key)[0];
            const job = await this.queue.removeRepeatableByKey(jobKey);
        }
        catch (error) { }
    }
    static async jobHandler(job) {
        const check = job.data;
        (0, axios_utils_1.axios)({
            method: 'GET',
            baseURL: check.url,
            url: check.path,
            auth: check.authentication,
            timeout: check.timeout,
        })
            .then(async (response) => {
            const responseTime = Number(response.headers['Request-Duration']);
            await (0, ping_cache_1.pushLatestPing)({ check, status: pingStatus_enum_1.default.UP, responseTime: responseTime ?? 0, timestamp: Date.now() });
        })
            .catch(async (error) => {
            await (0, ping_cache_1.pushLatestPing)({ check, status: pingStatus_enum_1.default.DOWN, responseTime: 0, timestamp: Date.now() });
            //Send Notification for that down
            if (check.email) {
                const notificationService = notification_services_1.NotificationFactory.create(emailNotificaion_service_1.default);
                await notificationService.notify({
                    pingResult: { check, status: pingStatus_enum_1.default.DOWN, responseTime: 0, timestamp: Date.now() },
                    reciepentData: check.email,
                });
            }
            else {
                //Choose another notification channel
            }
        });
    }
}
exports.default = PingScheduler;
_a = PingScheduler;
PingScheduler.connection = new ioredis_1.default();
PingScheduler.queue = new bullmq_1.Queue('ping', { connection: _a.connection });
PingScheduler.worker = new bullmq_1.Worker('ping', _a.jobHandler);
