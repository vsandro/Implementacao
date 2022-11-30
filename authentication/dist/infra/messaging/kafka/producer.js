"use strict";
exports.__esModule = true;
exports.producer = void 0;
var kafka_1 = require("./kafka");
exports.producer = kafka_1.kafka.producer({
    allowAutoTopicCreation: true
});
exports.producer.connect().then(function () {
    console.log('[Authentications] Kafka producer connected');
});
//# sourceMappingURL=producer.js.map