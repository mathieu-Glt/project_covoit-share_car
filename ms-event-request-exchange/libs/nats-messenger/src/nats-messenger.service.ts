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
            this.nats.emit(cmd, payload)
        } catch (error) {
            console.log("error", error)
        }
    }
        
    //Emits an event for sending an email when there is a response to a request
    async emitEmailResponseToRequest(email: string, requestId: string) {
        this.emit(
            'SEND_EMAIL_RESPONSE_REQUEST',
            {
                email: email,
                params: { "RESPONSE_REQUEST_LINK": `${process.env.PREFIX_URI}/request/${requestId}` }
            },
        )
    }

    //TODO CREER UN TEMPLATE POUR ENVOYER UN EMAIL LORSQUE L ON RECOIT UNE REPONSE A LA REQUEST 
    async emitEmailReplyToExchangeReceived(email: string, requestId: string):Promise<void> {
        this.emit(
            'SEND_EMAIL_RESPONSE_EXCHANGE',
            {
                email: email,
                //ON INCLUT UN LIEN VERS LA PAGE DE LA REQUEST EN QUESTION
                params: { "REQUEST_READ_LINK": `${process.env.PREFIX_URI}/request/${requestId}` }
            },
        )
    }
}
