import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterFormDto } from "../dto/form/register.form.dto";
import { RegisterCommandUsecase } from "../usecases/commands/register.command.usecase";
import { LoginFormDto } from "../dto/form/login.form.dto";
import { LoginCommandUsecase } from "../usecases/commands/login.command.usecase";
import { IToken } from "../intefaces/token.interface";
import { RegisterDoctorFormDto } from "../dto/form/register-doctor.form.dto";
import { RegisterDoctorCommandUsecase } from "../usecases/commands/register-doctor.command.usecase";

@Injectable()
export class AuthService {
  constructor(private commandBus: CommandBus) {
  }

  register(form: RegisterFormDto): Promise<void>{
    return this.commandBus.execute(new RegisterCommandUsecase(form));
  }

  async login(form: LoginFormDto): Promise<IToken> {
    return await this.commandBus.execute(new LoginCommandUsecase(form));
  }

  registerDoctor(form: RegisterDoctorFormDto): Promise<void>{
    return this.commandBus.execute(new RegisterDoctorCommandUsecase(form));
  }
}
