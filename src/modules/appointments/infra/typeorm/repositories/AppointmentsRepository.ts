import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';




class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>
  //Cria um variavel que é do tipo Repository do ORM com todas as informações de appointments


  constructor(){
    //crio um metodo constructor, para criar um repositorio com o getRepository para conseguir acessar todas as informaçoes do repositorio do TypeOrm
    this.ormRepository = getRepository(Appointment)
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment ;
  }

  public async create({ date, provider_id }: ICreateAppointmentDTO):Promise<Appointment>{
    // chama todas as funçoes do serviço de uma vez neste caso create e save
    const appointment = this.ormRepository.create({ provider_id, date})

    await this.ormRepository.save(appointment)
  }

}

export default AppointmentsRepository;
