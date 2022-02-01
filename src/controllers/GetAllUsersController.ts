import { GetAllUsersService } from './../services/GetAllUsersService';
import { Request, Response } from 'express';

export class GetAllUsersController {
    async handle(request: Request, response: Response) {
        const service = new GetAllUsersService();

        const result = await service.execute();

        return response.json(result);
    }
}