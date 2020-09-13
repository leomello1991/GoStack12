import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import AppError from '@shared/errors/AppError';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;


describe('UpdateProfile', () => {
  beforeEach(() =>{
     fakeUsersRepository = new FakeUsersRepository();

     showProfile = new ShowProfileService(
       fakeUsersRepository,

     )

  })

  it('should be able to show profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'John@gmail.com',
      password: '123456',
    });

    const showUser = await showProfile.execute({
        user_id: user.id

    })

    expect(showUser.name).toBe('John Doe');

  });

  it('should not be able to show profile from non-existing user', async () => {


    await expect(showProfile.execute({
        user_id: 'non-existing user_id'

    }),).rejects.toBeInstanceOf(AppError)



  });


});
