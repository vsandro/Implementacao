"use strict";
exports.__esModule = true;
exports.routes = void 0;
var express_1 = require("express");
var ensureAuthenticateUser_1 = require("./middlewares/ensureAuthenticateUser");
var loginUserController_1 = require("./modules/account/loginUser/loginUserController");
var unlockUserController_1 = require("./modules/account/unlockUser/unlockUserController");
var createUserController_1 = require("./modules/users/createUser/createUserController");
var routes = (0, express_1.Router)();
exports.routes = routes;
var authenticateClientController = new loginUserController_1.AuthenticateUserController();
var unlockUserController = new unlockUserController_1.UnlockUserController();
var createClientController = new createUserController_1.CreateUserController();
routes.post('/login', authenticateClientController.handle);
routes.post('/user', createClientController.handle);
routes.post('/unlock', ensureAuthenticateUser_1.EnsureAuthenticateUser, unlockUserController.handle);
//# sourceMappingURL=routes.js.map