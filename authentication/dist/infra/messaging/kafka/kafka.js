"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.kafka = void 0;
const kafkajs_1 = require("kafkajs");
if (!process.env.KAFKA_BROKER) {
    throw new Error('Kafka broker address not set!');
}
exports.kafka = new kafkajs_1.Kafka(Object.assign({ clientId: 'Authentications', brokers: [process.env.KAFKA_BROKER] }, (process.env.KAFKA_USER ? {
    sasl: {
        mechanism: 'scram-sha-256',
        username: (_a = process.env.KAFKA_USER) !== null && _a !== void 0 ? _a : '',
        password: (_b = process.env.KAFKA_PASS) !== null && _b !== void 0 ? _b : '',
    },
    ssl: true,
} : {})));
