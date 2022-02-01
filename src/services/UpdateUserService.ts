import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from 'bcryptjs';

type UserUpdateRequest = {
    id: string;
    email: string;
    oldPassword?: string;
    password?: string;
    name: string;
}

export class UpdateUserService {
    async execute({id, email, oldPassword, password, name }: UserUpdateRequest): Promise<User | Error> {
        const repo = getRepository(User);

        const user = await repo.findOne({ id });

        if (!user) {
            return new Error('User does not exists');
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

        return user;
    }
}