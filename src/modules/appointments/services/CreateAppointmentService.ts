import { startOfHour, isBefore, getHours } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import { isJsxFragment } from 'typescript';
import { th } from 'date-fns/locale';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

interface IRequest {
  provider_id: string;
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  // inversao de dependencia
  // faz com que o arquivo que precisa usar o service que é as (rotas)informe para ele(service) qual é o repositorio
  // cria um metodo constructor e passa como parametro o repositorio

  constructor(
    // injetando a dependencia
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    // appointmentDate é regra de negocio esta colocando sempre na hora exata

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date.");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself.");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 18) {
      throw new AppError("You can't create an appointment before 8pm or 18pm");
    }

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointments is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      user_id,
      provider_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
