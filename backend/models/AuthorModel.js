"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var authorSchema = new mongoose_1.default.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true });
var AuthorModel = mongoose_1.default.model('Author', authorSchema);
exports.default = AuthorModel;
