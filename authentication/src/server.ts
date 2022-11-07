import 'dotenv/config';
import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { routes } from './routes';

import { KafkaMessagingAdapter } from '../src/infra/messaging/kafka/adapters/kafka-messaging-adapter';

const kafkaMessagingAdapter = new KafkaMessagingAdapter()

const app = express();
app.use(cors());

app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333, () => {
  console.log('[Authentications] Server running');
});

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message,
    });
  }

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});


const PORT = 3000

app.listen(PORT, () => console.log('Server is running in PORT ' + PORT));
