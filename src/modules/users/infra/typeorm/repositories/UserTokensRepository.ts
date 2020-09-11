import { getRepository, Repository } from 'typeorm';


import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';


class UserTokensRepository implements IUserTokensRepository {
  private ormRepository: Repository<UserToken>
  //Cria um variavel que é do tipo Repository do ORM com todas as informações de appointments


  constructor(){
    //crio um metodo constructor, para criar um repositorio com o getRepository para conseguir acessar todas as informaçoes do repositorio do TypeOrm
    this.ormRepository = getRepository(UserToken)
  }

  public async findByToken(token: string):Promise<UserToken |undefined>{
    const userToken = await this.ormRepository.findOne({
      where: { token }
    })

    return userToken

  }
  public async generate(user_id: string): Promise<UserToken>{
    const userToken = this.ormRepository.create({
      user_id
    })
    await this.ormRepository.save(userToken)

    return userToken
  }


}

export default UserTokensRepository;
