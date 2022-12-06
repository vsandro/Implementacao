"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("dotenv/config");
var elasticsearch_1 = __importDefault(require("elasticsearch"));
function getClient() {
    var client = new elasticsearch_1["default"].Client({
        host: process.env.ELASTIC
    });
    return client;
}
exports["default"] = getClient;
//# sourceMappingURL=elasticsearch.js.map