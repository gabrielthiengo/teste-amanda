import { getRepository } from 'typeorm';
import { InternalError } from '../entities/InternalError';
import { User } from '../entities/User';
import logger from '../utils/logger';

export class DeleteUserService {
  async execute(id: string) {
    try {
      const repo = getRepository(User);

      const userAlreadyExists = await repo.findOne({ id });

      if(!userAlreadyExists) {
        throw new InternalError('User does not exists', 404);
      }

      await repo.delete(id);

      logger.info('User deleted successfully');
    } catch (e) {
      logger.error(e.message);
      throw new InternalError(e.message, e.statusCode || 404);
    }
  }
}