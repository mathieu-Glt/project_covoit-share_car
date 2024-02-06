import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common';

//start the application 
async function bootstrap() {
  // Create an instance of the Nest application
  const app = await NestFactory.create(AppModule);
  // Output the NATS_DNS and NATS_PORT from environment variables
  console.log('NATS_DNS:', process.env.NATS_DNS);
  console.log('NATS_PORT:', process.env.NATS_PORT);

  // Create a connection to microservices using NATS and environment variables 
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
      queue: "ms-event"
    },
  })
  // Apply global data validation using ValidationPipe 
  app.useGlobalPipes(new ValidationPipe());
  // Start all microservices of the application
  app.startAllMicroservices()

  app.use((req, res, next) => {
    console.log('Middleware log:', req.headers);
    next();
  });
  
}
// Call the bootstrap function to start the application
bootstrap();
