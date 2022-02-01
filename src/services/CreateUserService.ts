import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { User } from '../entities/User';

type UserRequest = {
    email: string;
    password: string;
    name: string;
}

export class CreateUserService {
  async execute({ email, password, name }: UserRequest): Promise<User | Error> {
    const repo = getRepository(User);

    const userAlreadyExists = await repo.findOne({ email });

    if (userAlreadyExists) {
      return new Error('User already exists');
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = repo.create({
      email,
      password: passwordHash,
      name,
    });

    await repo.save(user);

    return user;
  }
}
