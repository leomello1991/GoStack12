import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';
import { be } from 'date-fns/locale';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() =>{
       fakeUsersRepository = new FakeUsersRepository();
       fakeHashProvider = new FakeHashProvider();

       createUser = new CreateUserService(
        fakeUsersRepository,
        fakeHashProvider,
      );
    })
  it('should be able to create a new user', async () => {


    const user = await createUser.execute({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
    // expect(user.email).toBe('John@gmail.com');
  });
  it('should not be able to create a new user same email from another', async () => {


    await createUser.execute({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

   await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'John@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
