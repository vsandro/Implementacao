import 'dotenv/config';
import { kafka } from "./kafka/kafka"

import { prisma } from '../../database/prismaClient';

interface NewMessage {
  user: {
    username: string;
    message: string;
  }
}

async function main() {
  const consumer = kafka.consumer({ groupId: 'record-logs-group', allowAutoTopicCreation: true })

  await consumer.connect()
  await consumer.subscribe({ topic: 'authentications.new-authorization' })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const recordAuthenticationJSON = message.value?.toString();

      if (!recordAuthenticationJSON) {
        return;
      }

      const recordAuthentication: NewMessage = JSON.parse(recordAuthenticationJSON);

      console.log(`[Record] User ${recordAuthentication.user.username} - ${recordAuthentication.user.message}`)

       const record = await prisma.records.create({
        data: {
          username: recordAuthentication.user.username,
          message: recordAuthentication.user.message,
        },
      })
       
    },
  })
}

main().then(() => {
  console.log('[Log] Listening to Kafka messages')
})

