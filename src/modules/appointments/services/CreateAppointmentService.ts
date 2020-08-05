import { startOfHour } from 'date-fns';
import { injectable, inject} from 'tsyringe'

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository'

import AppError from '@shared/errors/AppError';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';


interface IRequest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  //inversao de dependencia
  //faz com que o arquivo que precisa usar o service que é as (rotas)informe para ele(service) qual é o repositorio
  //cria um metodo constructor e passa como parametro o repositorio

  constructor(
    //injetando a dependencia
    @inject('AppointmentsRepository')

   private appointmentsRepository: IAppointmentsRepository) {

   }

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {

    const appointmentDate = startOfHour(date);
    //appointmentDate é regra de negocio esta colocando sempre na hora exata

    const findAppointmentsInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentsInSameDate) {
      throw new AppError('This appointments is already booked');
    }

    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      provider_id,
    });



    return appointment;
  }
}

export default CreateAppointmentService;
