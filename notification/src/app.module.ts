import { Module } from '@nestjs/common';
import { EmailBuilderModule } from './emailBuilder/emailBuilder.module';
import { NatsMessengerModule } from '@app/nats-messenger'
import { ConfigModule } from '@nestjs/config';

//Main module from the application notification
@Module({
  imports: [
    // Configure global application settings using ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      //TODO set to true for PRODUCTION
      //cache: true,
    }),
    EmailBuilderModule,
    NatsMessengerModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
