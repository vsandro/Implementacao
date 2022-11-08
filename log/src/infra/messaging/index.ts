import 'dotenv/config';
import { kafka } from "./kafka/kafka"

interface PurchasesNewPurchaseMessage {
  user: {
    username: string;
    message: string;
  }
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



      console.log(`User ${purchase.user.username} to ${purchase.user.message}`)
    },
  })
}

main().then(() => {
  console.log('[Log!!!] Listening to Kafka messages')
})