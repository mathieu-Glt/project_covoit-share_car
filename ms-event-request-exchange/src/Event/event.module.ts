import { RequestModule } from 'src/Request/request.module'
import { NatsMessengerModule } from '@app/nats-messenger'
import { EventController } from './event.controller';
import { Module, forwardRef } from '@nestjs/common';
import { EventSchema } from './Schema/event.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EventService } from './event.service';

//Module in charge of handling EVENTS
@Module({
  imports: [
    // import the database schema for EVENTS in Mongoose
    MongooseModule.forFeature([
      { name: 'Event', schema: EventSchema }
    ]),
    // import the RequestModule module as dependency 
    forwardRef(() => RequestModule),
    // import NatsMessengerModule module for NATS messenging
    NatsMessengerModule, 
  ],

  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule{}
