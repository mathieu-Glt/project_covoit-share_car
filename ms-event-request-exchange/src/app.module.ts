import { NatsMessengerModule } from '@app/nats-messenger';
import { RequestModule } from './Request/request.module';
import { DatabaseModule } from './Config/config.module';
import { EventModule } from './Event/event.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

//Main module from the application ms-event
@Module({
  imports: [
    // Configure global application settings using ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      //TODO set to true for PRODUCTION
      //cache: true,
    }),
    // Configure MongooseModule to connect to the database
    MongooseModule.forRoot(`${process.env.URI_BDD}?retryWrites=true&w=majority`),
    NatsMessengerModule, 
    DatabaseModule,
    RequestModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
