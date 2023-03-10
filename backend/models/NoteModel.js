"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var noteSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
    },
    folderId: {
        type: String,
        required: true
    }
}, { timestamps: true });
var NoteModel = mongoose_1.default.model('Note', noteSchema);
exports.default = NoteModel;
