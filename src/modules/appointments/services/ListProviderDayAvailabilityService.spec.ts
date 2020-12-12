// yarn test src/modules/appointments/services/ListProviderDayAvailabilityService.spec
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability ', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();

    listProvidersDayAvailability = new ListProviderDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });

  it('should be able to list the day availability from provider ', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2020, 9, 13, 8, 0, 0),
    });
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: '123',
      date: new Date(2020, 9, 13, 10, 0, 0),
    });
    const available = await listProvidersDayAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 10,
      day: 13,
    });

    expect(available).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: false },
        { hour: 14, available: false },
        { hour: 15, available: false },
        { hour: 16, available: false },
        { hour: 17, available: false },

      ]),
    );
  });
});
