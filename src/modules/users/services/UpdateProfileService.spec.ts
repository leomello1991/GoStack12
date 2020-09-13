import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;


describe('UpdateProfile', () => {
  beforeEach(() =>{
     fakeUsersRepository = new FakeUsersRepository();
     fakeHashProvider = new FakeHashProvider(),

     updateProfile = new UpdateProfileService(
       fakeUsersRepository,
       fakeHashProvider
     )

  })

  it('should be able to update profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    const updateUser = await updateProfile.execute({
        user_id: user.id,
        name: 'John trê',
        email: 'johntre@example.com',
    })

    expect(updateUser.name).toBe('John trê');
    expect(updateUser.email).toBe('johntre@example.com')
  });

  it('should not be able to change to another user email ', async () => {

     await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: '123456',
    });

    await expect(updateProfile.execute({
        user_id: user.id,
        name: 'John trê',
        email: 'John@gmail.com',
    }),).rejects.toBeInstanceOf(AppError)

    });

  it('should be able to update the password', async () => {

      const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'John@gmail.com',
        password: '123456',
      });

      const updateUser = await updateProfile.execute({
          user_id: user.id,
          name: 'John trê',
          email: 'johntre@example.com',
          old_password: '123456',
          password: '1234567'
      })

      expect(updateUser.name).toBe('John trê');
      expect(updateUser.email).toBe('johntre@example.com')
      expect(updateUser.password).toBe('1234567')
    });

  it('should not be able to update the new password without the old password', async () => {

    const user = await fakeUsersRepository.create({
        name: 'John Doe',
        email: 'John@gmail.com',
        password: '123456',
      });

    await expect(updateProfile.execute({
          user_id: user.id,
          name: 'John trê',
          email: 'johntre@example.com',
          password: '1234567'
      }),).rejects.toBeInstanceOf(AppError)
    });

  it('should not be able to update the new password wrong the old password', async () => {

    const user = await fakeUsersRepository.create({
          name: 'John Doe',
          email: 'John@gmail.com',
          password: '123456',
        });

    await expect(updateProfile.execute({
            user_id: user.id,
            name: 'John trê',
            email: 'johntre@example.com',
            old_password:'123123',
            password: '1234567'
        }),).rejects.toBeInstanceOf(AppError)
      });

  it('should not be able to update profile from non-existing user', async () => {


    await expect(updateProfile.execute({
      user_id: 'user.id',
      name: 'John trê',
      email: 'johntre@example.com',
      old_password:'123123',
      password: '1234567'

     }),).rejects.toBeInstanceOf(AppError)



    });
});
