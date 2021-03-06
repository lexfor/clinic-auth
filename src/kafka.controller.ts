import { Controller, OnModuleInit } from '@nestjs/common';
import { ClientKafka, Client, EventPattern } from '@nestjs/microservices';
import { EventBus } from '@nestjs/cqrs';
import { kafkaClientOptions } from './config/kafka-client.options';
import { DeleteCredentialEvent } from './sagas/delete/user';

@Controller()
export class KafkaController implements OnModuleInit {
  @Client(kafkaClientOptions)
  kafkaClient: ClientKafka;
  constructor(private readonly eventBus: EventBus) {}

  async onModuleInit() {
    const requestPatterns = ['delete.patient.user'];

    requestPatterns.forEach((pattern) => {
      this.kafkaClient.subscribeToResponseOf(pattern);
    });
    await this.kafkaClient.connect();
  }

  @EventPattern('delete.patient.user')
  async DeletePatientUserListener({ value }) {
    const event = new DeleteCredentialEvent(value.actionID, value.userID, value.credentialID);
    this.eventBus.publish(event);
  }

  @EventPattern('delete.doctor.user')
  async DeleteDoctorUserListener({ value }) {
    const event = new DeleteCredentialEvent(value.actionID, value.userID, value.credentialID);
    this.eventBus.publish(event);
  }
}
