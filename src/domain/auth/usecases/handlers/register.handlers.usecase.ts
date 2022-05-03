import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RegisterCommandUsecase } from '../commands/register.command.usecase';
import { ICredential } from '../../intefaces/credential.interface';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../../intefaces/auth.repository.interface';
import { Inject } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { ROLES, SALT } from "../../../../config/global.env";
import { ConfigService } from "@nestjs/config";

@CommandHandler(RegisterCommandUsecase)
export class RegisterHandlersUsecase
  implements ICommandHandler<RegisterCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('AUTH_REPOSITORY') private readonly authRepository: IAuthRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: RegisterCommandUsecase): Promise<void> {
    const salt = bcrypt.genSaltSync();
    const credential: ICredential = {
      id: uuidv4(),
      login: command.login,
      password: bcrypt.hashSync(command.password, salt),
      role: ROLES.PATIENT
    };
    await this.authRepository.createCredential(credential);
    this.client.emit('create.patient.credential', {
      actionID: uuidv4(),
      firstName: command.firstName,
      lastName: command.lastName,
      birthday: command.birthday,
      address: command.address,
      gender: command.gender,
      credentialID: credential.id,
    });
  }
}
