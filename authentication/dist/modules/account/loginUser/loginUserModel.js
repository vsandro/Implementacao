"use strict";
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
        while (_) try {
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
exports.__esModule = true;
exports.AuthenticateUserModel = void 0;
var prisma_1 = require("../../../database/prisma");
var bcrypt_1 = require("bcrypt");
var jsonwebtoken_1 = require("jsonwebtoken");
var elasticsearch_1 = __importDefault(require("../../../client/elasticsearch"));
var AuthenticateUserModel = /** @class */ (function () {
    function AuthenticateUserModel(messagingAdapter) {
        this.messagingAdapter = messagingAdapter;
    }
    AuthenticateUserModel.prototype.execute = function (_a) {
        var username = _a.username, password = _a.password;
        return __awaiter(this, void 0, void 0, function () {
            var user, clientElasticSearc, passwordMatch, result_1, countFailed, updateUser_1, result_2, updateUser_2, token, updateUser, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prisma_1.prisma.users.findFirst({
                            where: {
                                username: username
                            }
                        })];
                    case 1:
                        user = _b.sent();
                        clientElasticSearc = (0, elasticsearch_1["default"])();
                        if (!user) {
                            throw new Error('Username or password invalid!');
                        }
                        if (user.blocked) {
                            console.log('Username ' + username + ' blocked! Contact your System Administrator.');
                            throw new Error('Username blocked! Contact your System Administrator.');
                        }
                        return [4 /*yield*/, (0, bcrypt_1.compare)(password, user.password)];
                    case 2:
                        passwordMatch = _b.sent();
                        if (!!passwordMatch) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.messagingAdapter.sendMessage('authentications.new-authorization', {
                                user: {
                                    username: username,
                                    message: "access denied"
                                }
                            })
                            // Criar um registro no elasticsearch
                        ];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, clientElasticSearc.index({
                                index: 'elastic_index_login',
                                type: 'type_elastic_login',
                                body: {
                                    username: username,
                                    message: "access denied"
                                }
                            })];
                    case 4:
                        result_1 = _b.sent();
                        countFailed = user.failed + 1;
                        if (!(countFailed === 3)) return [3 /*break*/, 7];
                        return [4 /*yield*/, prisma_1.prisma.users.update({
                                where: {
                                    username: username
                                },
                                data: {
                                    blocked: true
                                }
                            })
                            //Criar um registro no elasticsearch
                        ];
                    case 5:
                        updateUser_1 = _b.sent();
                        return [4 /*yield*/, clientElasticSearc.index({
                                index: 'elastic_index_login',
                                type: 'type_elastic_login',
                                body: {
                                    username: username,
                                    message: 'user blocked'
                                }
                            })];
                    case 6:
                        result_2 = _b.sent();
                        _b.label = 7;
                    case 7: return [4 /*yield*/, prisma_1.prisma.users.update({
                            where: {
                                username: username
                            },
                            data: {
                                failed: countFailed
                            }
                        })];
                    case 8:
                        updateUser_2 = _b.sent();
                        throw new Error('Username or password invalid!');
                    case 9:
                        token = (0, jsonwebtoken_1.sign)({ username: username }, '739f8ebd49733117a132c34fe866bc09', {
                            subject: user.id,
                            //Requisito: A autenticação deve expirar
                            expiresIn: '1d'
                        });
                        return [4 /*yield*/, prisma_1.prisma.users.update({
                                where: {
                                    username: username
                                },
                                data: {
                                    failed: 0
                                }
                            })];
                    case 10:
                        updateUser = _b.sent();
                        return [4 /*yield*/, this.messagingAdapter.sendMessage('authentications.new-authorization', {
                                user: {
                                    username: username,
                                    message: "authenticated"
                                }
                            })
                            // Criar um registro no elasticsearch
                        ];
                    case 11:
                        _b.sent();
                        return [4 /*yield*/, clientElasticSearc.index({
                                index: 'elastic_index_login',
                                type: 'type_elastic_login',
                                body: {
                                    username: username,
                                    message: "authenticated"
                                }
                            })];
                    case 12:
                        result = _b.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    return AuthenticateUserModel;
}());
exports.AuthenticateUserModel = AuthenticateUserModel;
//# sourceMappingURL=loginUserModel.js.map