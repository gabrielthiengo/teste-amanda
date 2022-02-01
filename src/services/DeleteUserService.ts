import { getRepository } from 'typeorm';
import { User } from '../entities/User';

export class DeleteUserService {
    async execute(id: string) {
        const repo = getRepository(User);

        const userAlreadyExists = await repo.findOne({ id });

        if(!userAlreadyExists) {
            return new Error('User does not exists');
        }

        await repo.delete(id);
    }
}