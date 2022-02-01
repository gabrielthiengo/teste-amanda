import { UpdateUserService } from './../services/UpdateUserService';
import { Request, Response } from 'express';


export class UpdateUserController {
    async handle(request: Request, response: Response) {
        const { id, email, oldPassword, password, name } = request.body;

        const service = new UpdateUserService();

        const result = await service.execute({ id, email, oldPassword, password, name });

        if(result instanceof Error) {
            return response.status(400).json({ message: result.message });
        }

        response.json(result);
    }
}
