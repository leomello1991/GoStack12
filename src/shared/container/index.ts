import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

//controla a injeção de depencia de um repositorio

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
//recebe 2 parametros o primeiro é o id(nome)que vou dar para falar que to querendo um repositorio tal...
//usa-se o mesmo nome do repositorio
//e o segundo parametro é o que estou retornando

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
