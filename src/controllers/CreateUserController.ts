import { CreateUserService } from './../services/CreateUserService';
import { Request, Response } from 'express';
export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { email, password, name } = request.body;

    const service = new CreateUserService();

    const result = await service.execute({email, password, name});

    if(result instanceof Error) {
      return response.status(400).json({ message: result.message });
    }

    return response.json(result);

  }
}