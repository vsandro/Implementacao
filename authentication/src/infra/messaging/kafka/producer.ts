import { kafka } from "./kafka"

export const producer = kafka.producer({
  allowAutoTopicCreation: true,
})

producer.connect().then(() => {
  console.log('[Authentications] Kafka producer connected');
})
