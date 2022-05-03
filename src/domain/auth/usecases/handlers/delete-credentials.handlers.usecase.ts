import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { IAuthRepository } from '../../intefaces/auth.repository.interface';
import { Inject } from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { ConfigService } from "@nestjs/config";
import { DeleteCredentialsCommandUsecase } from "../commands/delete-credentials.command.usecase";

@CommandHandler(DeleteCredentialsCommandUsecase)
export class DeleteCredentialsHandlersUsecase
  implements ICommandHandler<DeleteCredentialsCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('AUTH_REPOSITORY') private readonly authRepository: IAuthRepository,
    private readonly configService: ConfigService,
  ) {}

  async execute(command: DeleteCredentialsCommandUsecase): Promise<void> {
    await this.authRepository.deleteCredential(command.credentialID);
    this.client.emit('delete.credential', {
      actionID: command.actionID,
      credentialID: command.credentialID,
    });
  }
}
