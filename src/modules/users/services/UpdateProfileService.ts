import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';

import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import { isThrowStatement } from 'typescript';

interface IRequest {
  user_id: string;
  name: string;
  password?: string;
  email: string;
  old_password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ user_id, name, email, old_password, password}: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id)

    if(!user){
      throw new AppError('User not found')
    }

    const userWithUpdateEmail = await this.userRepository.findByEmail(email)

    if(userWithUpdateEmail && userWithUpdateEmail.id !== user_id){
      throw new AppError('E-mail already in use')
    }

    user.name = name,
    user.email = email

    if(password && !old_password){
      throw new AppError('You need to inform the old password to set a new password')
    }



    if(password && old_password) {

      const checkOldPassword = await this.hashProvider.compareHash(old_password, user.password)

      if(!checkOldPassword){
        throw new AppError('Old password incorrect')
      }

      user.password = await this.hashProvider.generateHash(password)
    }



    return this.userRepository.save(user)


  }
}

export default UpdateProfileService;
