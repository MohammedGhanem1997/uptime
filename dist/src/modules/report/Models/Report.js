"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reportSchema = new mongoose_1.Schema({
    status: { type: String, required: true },
    availability: { type: Number, required: true },
    ups: { type: Number, required: false },
    outages: { type: Number, required: true },
    downtime: { type: Number, required: true },
    uptime: { type: Number, required: true },
    averageResponseTime: { type: Number, required: true },
    history: { type: [], required: true },
    timestamp: { type: Number, required: true },
    forCheck: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Check' },
});
const Report = (0, mongoose_1.model)('Report', reportSchema);
exports.default = Report;
