"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
require("@modules/users/providers");
require("./providers");
var AppointmentsRepository_1 = __importDefault(require("@modules/appointments/infra/typeorm/repositories/AppointmentsRepository"));
var UsersRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UsersRepository"));
var UserTokensRepository_1 = __importDefault(require("@modules/users/infra/typeorm/repositories/UserTokensRepository"));
//  import IMailTemplateProvider from '@modules/users/repositories/IMailTemplateProvider';
//  import HandlebarsMailTemplateProvider from '@modules/users/infra/typeorm/repositories/HandlebarsMailTemplateProvider';
//controla a injeção de depencia de um repositorio
tsyringe_1.container.registerSingleton('AppointmentsRepository', AppointmentsRepository_1.default);
//recebe 2 parametros o primeiro é o id(nome)que vou dar para falar que to querendo um repositorio tal...
//usa-se o mesmo nome do repositorio
//e o segundo parametro é o que estou retornando
tsyringe_1.container.registerSingleton('UsersRepository', UsersRepository_1.default);
tsyringe_1.container.registerSingleton('UserTokensRepository', UserTokensRepository_1.default);
