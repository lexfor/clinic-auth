import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { CqrsModule } from "@nestjs/cqrs";
import { RegisterHandlersUsecase } from "./usecases/handlers/register.handlers.usecase";
import { poolFactory } from "../../factories/database.factory";
import { AuthRepository } from "./entity/auth.repository";
import { CredentialMapper } from "./mappers/credential.mapper";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LoginHandlersUsecase } from "./usecases/handlers/login.handlers.usecase";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { getJwtConfig } from "../../config/jwt.config";
import { DeleteCredentialsHandlersUsecase } from "./usecases/handlers/delete-credentials.handlers.usecase";
import { RegisterDoctorHandlersUsecase } from "./usecases/handlers/register-doctor.handlers.usecase";
import { JwtStrategy } from "../../auth/strategies/jwt.strategy";

export const CommandHandlers = [
  RegisterHandlersUsecase,
  LoginHandlersUsecase,
  RegisterDoctorHandlersUsecase,
  DeleteCredentialsHandlersUsecase,
];

@Module({
  imports: [
    CqrsModule,
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule.forRoot(),
      ],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...CommandHandlers,
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'AUTH_REPOSITORY',
      useClass: AuthRepository,
    },
    CredentialMapper,
    JwtStrategy,
  ],
})
export class AuthModule {}
