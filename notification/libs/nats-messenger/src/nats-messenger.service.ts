import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NatsMessengerService {
    constructor(
        @Inject('NATS_SERVICE')
        private readonly nats: ClientProxy
        
    ) { }
    // import nats service

    // send : envoi avec une réponse en retour
    async send(cmd: string, payload: any): Promise<any> {
        console.log(this.nats)
        try {
            console.log('send', cmd, payload)
            const t = await firstValueFrom(this.nats.send(cmd, payload))
            return t

        } catch (error) {
            console.log("error from send", error)
        }
    }

    // emit : envoi sans réponse en retour 
    async emit(cmd: string, payload: any) {
        try {
            this.nats.emit(cmd, payload)

        } catch (error) {
            console.log("error", error)
        }
    }

}