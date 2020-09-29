import { getRepository, Not, Repository } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO'

import User from '@modules/users/infra/typeorm/entities/User';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';




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

  public async findAllProviders({except_user_id}: IFindAllProvidersDTO): Promise<User[]>{
    let users: User[]

    if(except_user_id){
       users = await this.ormRepository.find({
        where:{
          id: Not(except_user_id)
        }
      })
    }else{
       users = await this.ormRepository.find();
    }
    return users;
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
