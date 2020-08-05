// toda vez que um arquivo começar com I (i) quer dizer que é uma interface

import Appointment from '../infra/typeorm/entities/Appointment'

import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO'

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>

}

export default IAppointmentsRepository
