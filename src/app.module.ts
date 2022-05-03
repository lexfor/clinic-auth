import { Module } from '@nestjs/common';
import { AuthModule } from "./domain/auth/auth.module";
import { DeleteCredentialSaga } from "./sagas/delete/user";
import { KafkaController } from "./kafka.controller";
import { CqrsModule } from "@nestjs/cqrs";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { getJwtConfig } from "./config/jwt.config";
import { JwtStrategy } from "./auth/strategies/jwt.strategy";

const sagas = [DeleteCredentialSaga];

@Module({
  imports: [AuthModule, CqrsModule,
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),],
  providers: [...sagas, JwtStrategy],
  controllers: [KafkaController],
})
export class AppModule {}
