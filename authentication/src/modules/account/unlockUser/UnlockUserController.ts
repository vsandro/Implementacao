import { Request, Response } from 'express';
import { UnlockUserModel } from './UnlockUserModel';

import { KafkaMessagingAdapter } from '../../../infra/messaging/kafka/adapters/kafka-messaging-adapter';

export class UnlockUserController {
  async handle(request: Request, response: Response) {
    const { username } = request.body;

    const kafkaMessagingAdapter = new KafkaMessagingAdapter()
    const unlockUserModel = new UnlockUserModel(kafkaMessagingAdapter);
    
    const result = await unlockUserModel.execute({
      username,
    });

    return response.json(result);
  }
}
