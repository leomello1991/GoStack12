// yarn test src/modules/appointments/services/CreateAppointmentService.spec.ts


import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() =>{
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(fakeAppointmentsRepository)
  })

  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })
    const appointment = await createAppointment.execute({
      date: new Date(2020, 9, 10, 13),
      provider_id: '123123123',
      user_id: '123123'
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });

  it('should not be able to create two appointment on the same time', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })
    const appointmentDate = new Date(2020, 9, 10, 14);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123123',
      user_id: '123123'
    });
   await expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123123',
        user_id: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a past date', async() =>{
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })
    await expect(
      createAppointment.execute({
        date: new Date(2020, 9, 10, 10),
        provider_id: '123123123',
        user_id: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create an appointment with same user as provider', async() =>{
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })
    await expect(
      createAppointment.execute({
        date: new Date(2020, 9, 10, 13),
        provider_id: '123123',
        user_id: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create an appointment on after 18 hours', async() =>{
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime()
    })
    await expect(
      createAppointment.execute({
        date: new Date(2020, 9, 11, 19),
        provider_id: '123123',
        user_id: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError);

  })

  it('should not be able to create an appointment on before 8 hours', async() =>{
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 10).getTime()
    })
    await expect(
      createAppointment.execute({
        date: new Date(2020, 9, 11, 7),
        provider_id: '123123',
        user_id: '123123'
      }),
    ).rejects.toBeInstanceOf(AppError);

  })

});
