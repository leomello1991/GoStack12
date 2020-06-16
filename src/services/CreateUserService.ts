import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    //verifica se nao existe outro usuario com o mesmo email

    const checkExistsUser = await userRepository.findOne({ where: { email } });

    if (checkExistsUser) {
      throw new AppError('Email adress already userd');
    }

    const hashedPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
