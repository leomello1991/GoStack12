import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import ListProvidersService from './ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;


describe('UpdateProfile', () => {
  beforeEach(() =>{
     fakeUsersRepository = new FakeUsersRepository();

     listProviders = new ListProvidersService(
       fakeUsersRepository,

     )

  })

  it('should be able to list the providers ', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.create({
      name: 'John tre',
      email: 'Johntre@gmail.com',
      password: '123456',
    });

    const loggedUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: 'JohnQua@gmail.com',
      password: '123456',
    });

    const listProvider = await listProviders.execute({
        user_id: loggedUser.id

    })

    expect(listProvider).toEqual([
      user,
      user2
    ]);

  });



});
