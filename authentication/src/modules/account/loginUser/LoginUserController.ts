import { Request, Response } from 'express';
import { LoginUserModel } from './LoginUserModel';

import { KafkaMessagingAdapter } from '../../../infra/messaging/kafka/adapters/kafka-messaging-adapter';

export class LoginUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const kafkaMessagingAdapter = new KafkaMessagingAdapter()
    const authenticateUserModel = new LoginUserModel(kafkaMessagingAdapter);
    
    const result = await authenticateUserModel.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
