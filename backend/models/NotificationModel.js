"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var notificationSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
    },
}, { timestamps: true });
var NotificationModel = mongoose_1.default.model('Notification', notificationSchema);
exports.default = NotificationModel;
