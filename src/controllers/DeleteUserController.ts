import { DeleteUserService } from './../services/DeleteUserService';
import { Request, Response } from 'express';

export class DeleteUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const service = new DeleteUserService();

    const result = await service.execute(id);

    return response.status(200).end();
  }
}