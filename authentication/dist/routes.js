"use strict";
exports.__esModule = true;
exports.routes = void 0;
var express_1 = require("express");
//import { EnsureAuthenticateUser } from './middlewares/ensureAuthenticateUser';
var LoginUserController_1 = require("./modules/account/loginUser/LoginUserController");
var UnlockUserController_1 = require("./modules/account/unlockUser/UnlockUserController");
var CreateUserController_1 = require("./modules/users/createUser/CreateUserController");
var routes = (0, express_1.Router)();
exports.routes = routes;
var authenticateClientController = new LoginUserController_1.LoginUserController();
var unlockUserController = new UnlockUserController_1.UnlockUserController();
var createUserController = new CreateUserController_1.CreateUserController();
routes.post('/login', authenticateClientController.handle);
routes.post('/user', createUserController.handle);
routes.post('/unlock', unlockUserController.handle);
//# sourceMappingURL=routes.js.map