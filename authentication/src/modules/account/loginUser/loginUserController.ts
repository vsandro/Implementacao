import { Request, Response } from 'express';
import { AuthenticateUserModel } from './loginUser';

import { KafkaMessagingAdapter } from '../../../infra/messaging/kafka/adapters/kafka-messaging-adapter';

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const kafkaMessagingAdapter = new KafkaMessagingAdapter()
    const authenticateUserModel = new AuthenticateUserModel(kafkaMessagingAdapter);
    
    const result = await authenticateUserModel.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
