import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';
import { InternalError } from '../entities/InternalError';
import logger from '../utils/logger';

type UserRequest = {
    email: string;
    password: string;
    name: string;
}

export class CreateUserService {
  async execute({ email, password, name }: UserRequest): Promise<User | Error> {
    try {
      const repo = getRepository(User);

      const userAlreadyExists = await repo.findOne({ email });

      if (userAlreadyExists) {
        throw new InternalError('User already exists', 401);
      }

      const passwordHash = await bcrypt.hash(password, 8);

      const user = repo.create({
        email,
        password: passwordHash,
        name,
      });

      await repo.save(user);
      
      logger.info('User created successfully');

      return user;
    } catch (e) {
      logger.error(e.message);
      throw new InternalError(e.message, e.statusCode);
    }
  }
}
