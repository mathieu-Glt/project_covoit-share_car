import { firstValueFrom } from 'rxjs/internal/firstValueFrom'
import { Inject, Injectable } from '@nestjs/common'
import { ClientProxy } from '@nestjs/microservices'

//Service in charge of handling NATS related operations 
@Injectable()
export class NatsMessengerService {

    constructor(
        //injects the NATS_SERVICE dependency using ClientProxy from the module
        @Inject('NATS_SERVICE')
        private readonly nats: ClientProxy
        ) { }

    //sends with a response in return 
    async send(cmd: string, payload: any): Promise<any> {
        try {
            console.log('send', cmd, payload)
            return await firstValueFrom(this.nats.send(cmd, payload))
        } catch (error) {
            console.log("error", error)
        }
    }

    //sends without any response in return
    async emit(cmd: string, payload: any): Promise<any> {
        try {
            console.log('emit', cmd, payload)
            this.nats.emit(cmd, payload)
        } catch (error) {
            console.log("error", error)
        }
    }
}
