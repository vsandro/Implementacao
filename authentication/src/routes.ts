import { Router } from 'express';

//import { EnsureAuthenticateUser } from './middlewares/ensureAuthenticateUser';

import { LoginUserController } from './modules/account/loginUser/LoginUserController';
import { UnlockUserController } from './modules/account/unlockUser/UnlockUserController';

import { CreateUserController } from './modules/users/createUser/CreateUserController';

const routes = Router();

const authenticateClientController = new LoginUserController();
const unlockUserController = new UnlockUserController();
const createUserController = new CreateUserController();

routes.post('/login', authenticateClientController.handle);
routes.post('/user', createUserController.handle);
routes.post('/unlock', unlockUserController.handle);

export { routes };
