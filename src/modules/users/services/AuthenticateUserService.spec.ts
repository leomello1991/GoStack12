import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvier = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );

    const authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );

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
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvier = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );

    const authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );

    await createUser.execute({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    expect(
      authUser.execute({
        email: 'John@gmail.com',
        password: 'caguei',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate whith non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvier = new FakeHashProvider();

    const authUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvier,
    );

    expect(
      authUser.execute({
        email: 'John@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
