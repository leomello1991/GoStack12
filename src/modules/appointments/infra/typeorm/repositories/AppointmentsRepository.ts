import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';




class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>
  //Cria um variavel que é do tipo Repository do ORM com todas as informações de appointments


  constructor(){
    //crio um metodo constructor, para criar um repositorio com o getRepository para conseguir acessar todas as informaçoes do repositorio do TypeOrm
    this.
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment ;
  }
}

export default AppointmentsRepository;
