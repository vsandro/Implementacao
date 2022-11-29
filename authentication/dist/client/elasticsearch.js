"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const elasticsearch_1 = __importDefault(require("elasticsearch"));
function getClient() {
    const client = new elasticsearch_1.default.Client({
        host: 'localhost:9200',
        // log: 'trace'
    });
    return client;
}
exports.default = getClient;
