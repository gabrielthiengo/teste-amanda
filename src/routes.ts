import { Router } from "express";

import { DeleteUserController } from './controllers/DeleteUserController';
import { GetAllUsersController } from './controllers/GetAllUsersController';
import { CreateUserController } from './controllers/CreateUserController';
import { UpdateUserController } from './controllers/UpdateUserController';

const routes = Router();

routes.get('/users', new GetAllUsersController().handle);
routes.post('/users', new CreateUserController().handle);
routes.put('/users', new UpdateUserController().handle);
routes.delete('/users/:id', new DeleteUserController().handle);

export { routes }