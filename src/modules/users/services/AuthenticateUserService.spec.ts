import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvier: FakeHashProvider;
let createUser: CreateUserService;
let authUser: AuthenticateUserService;


describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvier = new FakeHashProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );

     authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );
  })

  it('should be able to authenticate', async () => {




    await createUser.execute({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    const response = await authUser.execute({
      email: 'John@gmail.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be able to authenticate whith wrong password', async () => {

    await createUser.execute({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

   await expect(
      authUser.execute({
        email: 'John@gmail.com',
        password: 'caguei',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate whith non existing user', async () => {

  await  expect(
      authUser.execute({
        email: 'John@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
