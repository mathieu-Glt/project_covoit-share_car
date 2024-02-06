import { Module } from '@nestjs/common';
import { NatsMessengerService } from './nats-messenger.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      //cache: true,
    }),
    ClientsModule.register([
      {
        name: 'NATS_SERVICE', transport: Transport.NATS,
        options: {
          servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`]
        }
      }
    ])
  ],
  providers: [NatsMessengerService],
  exports: [NatsMessengerService],
})
export class NatsMessengerModule {
  constructor() {
    console.log('NATS_DNS notif module:', process.env.NATS_DNS);
    console.log('NATS_PORT notif module:', process.env.NATS_PORT);
  }
}
