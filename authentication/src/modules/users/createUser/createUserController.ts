import { Request, Response } from 'express';
import { CreateUserModel } from './createUserModel';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body;

    const createUserModel = new CreateUserModel();
    
    const result = await createUserModel.execute({
      username,
      password,
    });

    return response.json(result);
  }
}
