import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { EmailController } from "./emailBuilder.controller";
import { EmailService } from "./emailBuilder.service"
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'NATS_SERVICE', 
                transport: Transport.NATS,
                options: {
                    servers: [`nats://${process.env.NATS_DNS}:${process.env.NATS_PORT}`],
                }
            },
        ]),
    ],
    controllers: [EmailController],
    providers: [
        ConfigService,
        EmailService
    ],
    exports: [EmailService]

})
export class EmailBuilderModule{}
