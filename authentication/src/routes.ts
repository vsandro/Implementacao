import { Router } from 'express';

import { EnsureAuthenticateUser } from './middlewares/EnsureAuthenticateUser';
import { AuthenticateUserController } from './modules/account/authenticateUser/AuthenticateUserController';

import { CreateUserController } from './modules/users/createUser/CreateUserController';

const routes = Router();

const authenticateClientController = new AuthenticateUserController();
const createClientController = new CreateUserController();


routes.post('/user/login', authenticateClientController.handle);
routes.post('/user/', createClientController.handle);

routes.get('/customers', EnsureAuthenticateUser, (req, res, next) => { 
    console.log("Lista todos os clientes!");
    res.json([,{id:1,nome:'João'}, {id:2,nome:'Maria'}]);
})

export { routes };
