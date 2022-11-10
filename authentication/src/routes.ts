import { Router } from 'express';

import { EnsureAuthenticateUser } from './middlewares/EnsureAuthenticateUser';
import { AuthenticateUserController } from './modules/account/loginUser/LoginUserController';
import { UnlockUserController } from './modules/account/unlockUser/UnlockUserController';

import { CreateUserController } from './modules/users/createUser/CreateUserController';

const routes = Router();

const authenticateClientController = new AuthenticateUserController();
const unlockUserController = new UnlockUserController();
const createClientController = new CreateUserController();

routes.post('/user/login', authenticateClientController.handle);
routes.post('/user/', createClientController.handle);
routes.post('/user/unlock', unlockUserController.handle);

routes.get('/customers', EnsureAuthenticateUser, (req, res, next) => { 
    console.log("Lista todos os clientes!");
    res.json([,{id:1,nome:'João'}, {id:2,nome:'Maria'}]);
})

export { routes };
