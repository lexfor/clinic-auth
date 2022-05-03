import { KafkaOptions, Transport } from '@nestjs/microservices';

export const kafkaClientOptions: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'AuthService',
      brokers: ['localhost:9092'],
    },
    consumer: {
      groupId: 'AuthGroups',
      allowAutoTopicCreation: true,
    },
  },
};
