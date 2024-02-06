import { ClientsModule, Transport } from '@nestjs/microservices'
import { NatsMessengerService } from './nats-messenger.service'
import { ConfigModule } from '@nestjs/config'
import { Module } from '@nestjs/common'

//Module to manage NATS
@Module({
  imports: [
    // Configures the ConfigModule to load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      //TODO set to true for PRODUCTION
      //cache: true,
    }),
    //register the client module 
    ClientsModule.register([
      {
        // defines an unique name for the client 
        name: 'NATS_SERVICE', 
        // uses NATS transport for the communication
        transport: Transport.NATS,
        options: {
          // specifies the NATS servers addresses
          servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`]
        }
      }
    ])
  ],
  // provides the NatsMessengerService service in the module 
  providers: [NatsMessengerService],
  // makes the NatsMessengerService service accessible to other modules
  exports: [NatsMessengerService],
})
export class NatsMessengerModule { }
