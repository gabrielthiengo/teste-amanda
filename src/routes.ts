import { Router } from "express";

import { DeleteUserController } from './controllers/DeleteUserController';
import { GetAllUsersController } from './controllers/GetAllUsersController';
import { CreateUserController } from './controllers/CreateUserController';
import { UpdateUserController } from './controllers/UpdateUserController';
import resolver from "./utils/resolver";

const routes = Router();

routes.get('/users', resolver(new GetAllUsersController().handle));
routes.post('/users', resolver(new CreateUserController().handle));
routes.put('/users', resolver(new UpdateUserController().handle));
routes.delete('/users/:id', resolver(new DeleteUserController().handle));

export { routes }