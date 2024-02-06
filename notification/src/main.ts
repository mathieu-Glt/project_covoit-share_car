import * as dotenv from 'dotenv';
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

dotenv.config();

//start the application
async function bootstrap() {
    // Create an instance of the Nest application
    const app = await NestFactory.create(AppModule)
    // Output the NATS_DNS and NATS_PORT from environment variables
    console.log('NATS_DNS:', process.env.NATS_DNS);
    console.log('NATS_PORT:', process.env.NATS_PORT);
    // Create a connection to microservices using NATS and environment variables 
    app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
      queue: "ms-notification"
    },
  });
  // Start all microservices of the application
  app.startAllMicroservices()
}
// Call the bootstrap function to start the application
bootstrap();
