"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var elasticsearch_1 = __importDefault(require("elasticsearch"));
function getClient() {
    var client = new elasticsearch_1["default"].Client({
        host: 'localhost:9200'
    });
    return client;
}
exports["default"] = getClient;
//# sourceMappingURL=elasticsearch.js.map