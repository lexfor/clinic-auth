import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from './app.module';
import { MicroserviceOptions } from "@nestjs/microservices";
import { kafkaClientOptions } from "./config/kafka-client.options";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>(kafkaClientOptions);
  await app.startAllMicroservices();
  app.enableCors();
  await app.listen(3001);
}
bootstrap();
