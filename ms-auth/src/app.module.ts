import { NatsMessengerModule } from '@app/nats-messenger';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// The main module of the ms-auth application
@Module({
  imports: [
    // Configures the ConfigModule to load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
      //TODO set to true for PRODUCTION
      //cache: true,
    }),
    // Configures the MongooseModule to connect to the database
    MongooseModule.forRoot(`${process.env.URI_BDD}?retryWrites=true&w=majority`),
    // Imports the AuthModule and UserModule 
    AuthModule, 
    UserModule,
    // Imports the NatsMessengerModule for NATS messaging
    NatsMessengerModule   
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
