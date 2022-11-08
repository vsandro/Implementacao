import 'dotenv/config';
import { kafka } from "./kafka/kafka"

import { prisma } from '../../../src/database/prismaClient';

interface PurchasesNewPurchaseMessage {
  user: {
    username: string;
    message: string;
  }
}

interface IAuthenticateUser {
  username: string;
  password: string;
}

async function main() {
   
  const consumer = kafka.consumer({ groupId: 'logs-group', allowAutoTopicCreation: true })

  await consumer.connect()
  await consumer.subscribe({ topic: 'authentications.new-authorization' })

  await consumer.run({
    eachMessage: async ({ message }) => {
      const purchaseJSON = message.value?.toString();

      if (!purchaseJSON) {
        return;
      }

      const purchase: PurchasesNewPurchaseMessage = JSON.parse(purchaseJSON);

      console.log(`[Record] User ${purchase.user.username} - ${purchase.user.message}`)

      const record = await prisma.records.create({
        data: {
          username: purchase.user.username,
          message: purchase.user.message,
        },
      })     
       
    },
  })
}

main().then(() => {
  console.log('[Log] Listening to Kafka messages')
})