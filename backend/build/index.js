"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var server_1 = require("@apollo/server");
var drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var express4_1 = require("@apollo/server/express4");
var resolver_1 = require("./resolver");
var mongoose_1 = __importDefault(require("mongoose"));
var app = (0, express_1.default)();
require("dotenv/config");
require("../firebaseConfig");
var auth_1 = require("firebase-admin/auth");
var schema_1 = require("@graphql-tools/schema");
var ws_1 = require("ws");
var ws_2 = require("graphql-ws/lib/use/ws");
var typeDefs = fs.readFileSync(path.join(process.cwd(), "schema.graphql"), {
    encoding: "utf-8",
});
var port = process.env.PORT || 4000;
var URI = "mongodb+srv://".concat(process.env.DB_USERNAME, ":").concat(process.env.DB_PASSWORD, "@cluster0.wiotwkt.mongodb.net/?retryWrites=true&w=majority");
var authorizationJWT = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, accessToken;
    return __generator(this, function (_a) {
        authorizationHeader = req.headers.authorization;
        if (authorizationHeader) {
            accessToken = authorizationHeader.split(' ')[1];
            (0, auth_1.getAuth)().verifyIdToken(accessToken).then(function (decodeToken) {
                res.locals.uid = decodeToken.uid;
                next();
            }).catch(function (error) {
                console.log(error);
                return res.status(403).json({ message: 'Forbidden', error: error });
            });
        }
        else {
            return [2 /*return*/, res.status(401).json({ message: 'Unauthorized' })];
        }
        return [2 /*return*/];
    });
}); };
var httpServer = http_1.default.createServer(app);
var schema = (0, schema_1.makeExecutableSchema)({ typeDefs: typeDefs, resolvers: resolver_1.resolvers });
// Creating the WebSocket server
var wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: '/',
});
var serverCleanup = (0, ws_2.useServer)({ schema: schema }, wsServer);
var server = new server_1.ApolloServer({
    schema: schema,
    plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer: httpServer }),
        {
            serverWillStart: function () {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, {
                                drainServer: function () {
                                    return __awaiter(this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, serverCleanup.dispose()];
                                                case 1:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    });
                                },
                            }];
                    });
                });
            },
        },
    ],
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, server.start()];
            case 1:
                _a.sent();
                app.use((0, cors_1.default)(), authorizationJWT, body_parser_1.default.json(), (0, express4_1.expressMiddleware)(server, {
                    context: function (_a) {
                        var req = _a.req, res = _a.res;
                        return __awaiter(void 0, void 0, void 0, function () {
                            return __generator(this, function (_b) {
                                return [2 /*return*/, { uid: res.locals.uid }];
                            });
                        });
                    }
                }));
                return [2 /*return*/];
        }
    });
}); })();
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(URI).then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Connected to Mongoose');
                return [4 /*yield*/, new Promise(function (resolve) { return httpServer.listen({ port: port }, resolve); })];
            case 1:
                _a.sent();
                console.log("Server already listening on port ".concat(port));
                return [2 /*return*/];
        }
    });
}); });
