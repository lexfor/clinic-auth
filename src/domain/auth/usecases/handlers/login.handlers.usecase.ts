import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { IAuthRepository } from '../../intefaces/auth.repository.interface';
import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Client, ClientKafka } from '@nestjs/microservices';
import { kafkaClientOptions } from '../../../../config/kafka-client.options';
import { LoginCommandUsecase } from "../commands/login.command.usecase";
import { JwtService } from "@nestjs/jwt";
import { IToken } from "../../intefaces/token.interface";

@CommandHandler(LoginCommandUsecase)
export class LoginHandlersUsecase
  implements ICommandHandler<LoginCommandUsecase>
{
  @Client(kafkaClientOptions)
  client: ClientKafka;
  constructor(
    @Inject('AUTH_REPOSITORY') private readonly authRepository: IAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: LoginCommandUsecase): Promise<IToken> {
    const credential = await this.authRepository.getCredential(command.login);
    if(!bcrypt.compareSync(command.password, credential.getPassword)){
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }

    const payload = { id: credential.getID, role: credential.getRole };

    const token: IToken = {
      access_token: await this.jwtService.signAsync(payload)
    };

    this.client.emit('login', {
      actionID: uuidv4(),
      login: command.login,
    });

    return token;
  }
}
