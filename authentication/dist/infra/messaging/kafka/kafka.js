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
var _a, _b;
exports.__esModule = true;
exports.kafka = void 0;
var kafkajs_1 = require("kafkajs");
if (!process.env.KAFKA_BROKER) {
    throw new Error('Kafka broker address not set!');
}
exports.kafka = new kafkajs_1.Kafka(__assign({ clientId: 'Authentications', brokers: [process.env.KAFKA_BROKER] }, (process.env.KAFKA_USER ? {
    sasl: {
        mechanism: 'scram-sha-256',
        username: (_a = process.env.KAFKA_USER) !== null && _a !== void 0 ? _a : '',
        password: (_b = process.env.KAFKA_PASS) !== null && _b !== void 0 ? _b : ''
    },
    ssl: true
} : {})));
//# sourceMappingURL=kafka.js.map