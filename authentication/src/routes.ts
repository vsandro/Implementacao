
import { Router } from 'express';

import { EnsureAuthenticateUser } from './middlewares/ensureAuthenticateUser';

import { AuthenticateUserController } from './modules/account/loginUser/loginUserController';
import { UnlockUserController } from './modules/account/unlockUser/unlockUserController';

import { CreateUserController } from './modules/users/createUser/createUserController';

const routes = Router();

const authenticateClientController = new AuthenticateUserController();
const unlockUserController = new UnlockUserController();
const createClientController = new CreateUserController();

routes.post('/user/login', authenticateClientController.handle);
routes.post('/user/', createClientController.handle);

routes.post('/user/unlock', EnsureAuthenticateUser, unlockUserController.handle);

export { routes };
