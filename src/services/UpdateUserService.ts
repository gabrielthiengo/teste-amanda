import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from 'bcryptjs';
import { InternalError } from "../entities/InternalError";
import logger from '../utils/logger';

type UserUpdateRequest = {
    id: string;
    email: string;
    oldPassword?: string;
    password?: string;
    name: string;
}

export class UpdateUserService {
  async execute({id, email, oldPassword, password, name }: UserUpdateRequest): Promise<User | Error> {
    try {
      const repo = getRepository(User);

      const user = await repo.findOne({ id });

      if (!user) {
        throw new InternalError('User does not exists', 404);
      }

      if (oldPassword !== '' && password !== '') {
        const checkPassword = await bcrypt.compare(oldPassword, user.password);

        if (checkPassword) {
          user.password = await bcrypt.hash(password, 8);
        }
      }

      user.name = name ? name : user.name;
      user.email = email ? email : user.email;

      await repo.save(user);

      logger.info('User updated successfully');

      return user;
    } catch (e) {
      logger.error(e.message);
      throw new InternalError(e.message, e.statusCode || 404);
    }
  }
}