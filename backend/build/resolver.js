"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var models_1 = require("../models");
var graphql_1 = require("graphql");
var graphql_subscriptions_1 = require("graphql-subscriptions");
var pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = {
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        parseValue: function (value) {
            return new Date(value);
        },
        serialize: function (value) {
            return value.toISOString();
        }
    }),
    Query: {
        folders: function (_, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var folders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.FolderModel.find({
                            authorId: context.uid
                        }).sort({
                            updatedAt: 'desc'
                        })];
                    case 1:
                        folders = _a.sent();
                        return [2 /*return*/, folders];
                }
            });
        }); },
        folder: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var folderId, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        folderId = args.folderId;
                        return [4 /*yield*/, models_1.FolderModel.findOne({
                                _id: folderId
                            })];
                    case 1:
                        data = _a.sent();
                        return [2 /*return*/, data];
                }
            });
        }); },
        note: function (parent, args) { return __awaiter(void 0, void 0, void 0, function () {
            var noteId, note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        noteId = args.noteId;
                        return [4 /*yield*/, models_1.NoteModel.findById(noteId)];
                    case 1:
                        note = _a.sent();
                        return [2 /*return*/, note];
                }
            });
        }); }
    },
    Folder: {
        author: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var authorId, author;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authorId = parents.authorId;
                        return [4 /*yield*/, models_1.AuthorModel.findOne({
                                uid: authorId
                            })];
                    case 1:
                        author = _a.sent();
                        return [2 /*return*/, author];
                }
            });
        }); },
        notes: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var notes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.NoteModel.find({
                            folderId: parents.id
                        }).sort({
                            updatedAt: 'desc'
                        })];
                    case 1:
                        notes = _a.sent();
                        return [2 /*return*/, notes];
                }
            });
        }); }
    },
    Mutation: {
        addFolder: function (parents, args, context) { return __awaiter(void 0, void 0, void 0, function () {
            var newFolder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newFolder = new models_1.FolderModel(__assign(__assign({}, args), { authorId: context.uid }));
                        pubsub.publish('FOLDER_CREATED', {
                            folderCreated: {
                                message: 'A new folder created'
                            }
                        });
                        return [4 /*yield*/, newFolder.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, newFolder];
                }
            });
        }); },
        addNote: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var newNote;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newNote = new models_1.NoteModel(__assign({}, args));
                        return [4 /*yield*/, newNote.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, newNote];
                }
            });
        }); },
        updateNote: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var noteId, note;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        noteId = args.id;
                        return [4 /*yield*/, models_1.NoteModel.findByIdAndUpdate(noteId, args)];
                    case 1:
                        note = _a.sent();
                        return [2 /*return*/, note];
                }
            });
        }); },
        register: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var foundUser, newUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, models_1.AuthorModel.findOne({ uid: args.uid })];
                    case 1:
                        foundUser = _a.sent();
                        if (!!foundUser) return [3 /*break*/, 3];
                        newUser = new models_1.AuthorModel(args);
                        return [4 /*yield*/, newUser.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, newUser];
                    case 3: return [2 /*return*/, foundUser];
                }
            });
        }); },
        pushNotification: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var newNotification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newNotification = new models_1.NotificationModel(args);
                        pubsub.publish('PUSH_NOTIFICATION', {
                            notification: {
                                message: args.content
                            }
                        });
                        return [4 /*yield*/, newNotification.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Success' }];
                }
            });
        }); },
        deleteFolder: function (parents, args) { return __awaiter(void 0, void 0, void 0, function () {
            var folderId, deleteFolder;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        folderId = args.folderId;
                        return [4 /*yield*/, models_1.FolderModel.deleteOne({
                                _id: folderId,
                            })];
                    case 1:
                        deleteFolder = _a.sent();
                        if (deleteFolder.deletedCount) {
                            return [2 /*return*/, {
                                    message: 'Delete successfully',
                                    deletedCount: deleteFolder.deletedCount
                                }];
                        }
                        return [2 /*return*/, {
                                message: 'Delete failed',
                                deletedCount: 0
                            }];
                }
            });
        }); }
    },
    Subscription: {
        folderCreated: {
            subscribe: function () { return pubsub.asyncIterator(['FOLDER_CREATED']); },
        },
        notification: {
            subscribe: function () { return pubsub.asyncIterator(['PUSH_NOTIFICATION']); },
        }
    }
};
