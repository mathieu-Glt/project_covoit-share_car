import { exchangeSchema } from './Schema/exchangeRequest.schema';
import { NatsMessengerModule } from '@app/nats-messenger';
import { RequestController } from './request.controller';
import { RequestSchema } from './Schema/request.schema';
import { EventModule } from 'src/Event/event.module';
import { Module, forwardRef } from '@nestjs/common';
import { RequestService } from './request.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from 'src/Event/event.service';
//Module in charge of handling REQUESTS and EXCHANGES 
@Module({
  imports: [
    // import the database schemas in Mongoose
    MongooseModule.forFeature([
      { name: 'Request', schema: RequestSchema },
      { name: 'ExchangeRequest', schema: exchangeSchema },
    ]),
    // import NatsMessengerModule module for NATS messenging
    NatsMessengerModule,
    // import the EventModule module as dependency 
    forwardRef(() => EventModule),
  ],
  
  controllers: [RequestController],
  providers: [RequestService],
  exports:[RequestService]
})
export class RequestModule{}
