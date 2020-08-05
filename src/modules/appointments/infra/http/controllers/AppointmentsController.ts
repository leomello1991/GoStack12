import { Request, Response} from 'express'
import { parseISO } from 'date-fns';
import { container } from 'tsyringe'


import CreateAppointmentServices from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentsController{
  public async create(request:Request, response:Response):Promise<Response>{
   const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);
  //parsedDate é apenas uma transformação



  const createAppointment = container.resolve(CreateAppointmentServices);
  // toda vez que for criar um services(instaciar) no lugar do new service usa o exemplo acima


  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
  });
  return response.json({ appointment });
  }
}
