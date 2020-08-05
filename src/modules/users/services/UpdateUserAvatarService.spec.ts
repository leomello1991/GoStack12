import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';

describe('CreateUser', () => {
  it('should be able to update user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar.jpg'

    })

    expect(user.avatar).toBe('avatar.jpg');
    // expect(user.email).toBe('John@gmail.com');
  });

  it('should not be able to update a avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

     expect(updateUserAvatar.execute({
      user_id: 'não existe caralho',
      avatarFilename: 'avatar.jpg'
  }),).rejects.toBeInstanceOf(AppError)

  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

  const deleteFile =  jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
        user_id: user.id,
        avatarFilename: 'avatar.jpg'

    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg'

  });

    expect(deleteFile).toBeCalledWith('avatar.jpg')

    expect(user.avatar).toBe('avatar2.jpg');
   });

});
