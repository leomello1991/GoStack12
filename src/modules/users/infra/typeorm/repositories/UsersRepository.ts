import { getRepository, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '@modules/users/infra/typeorm/entities/User';




class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>
  //Cria um variavel que é do tipo Repository do ORM com todas as informações de appointments


  constructor(){
    //crio um metodo constructor, para criar um repositorio com o getRepository para conseguir acessar todas as informaçoes do repositorio do TypeOrm
    this.ormRepository = getRepository(User)
  }

  public async findById(id: string):Promise<User |undefined>{
    const user = await this.ormRepository.findOne(id)

    return user

  }

  public async findByEmail(email: string):Promise<User |undefined>{
    const user = await this.ormRepository.findOne({where:{email}})

    return user
  }

  public async create( userData : ICreateUserDTO):Promise<User>{
    // chama todas as funçoes do serviço de uma vez neste caso create e save
    const user = this.ormRepository.create( userData)

    await this.ormRepository.save(user)

    return user
  }

  public async save(user: User): Promise<User>{
    return this.ormRepository.save(user)
  }

}

export default UsersRepository;
