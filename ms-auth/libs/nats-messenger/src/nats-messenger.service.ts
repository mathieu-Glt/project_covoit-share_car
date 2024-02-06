/* eslint-disable @typescript-eslint/no-unused-vars */
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
        console.log(this.nats)
        try {
            console.log('send', cmd, payload)
            return await firstValueFrom(this.nats.send(cmd, payload))
        } catch (error) {
            console.log("error from send", error)
        }
    }

    //sends without any response in return
    async emit(cmd: string, payload: any): Promise<any> {
        console.log(this.nats)
        try {
            console.log('emit', cmd, payload)
            this.nats.emit(cmd, payload)
        } catch (error) {
            console.log("error from emit", error)
        }
    }

    // @review => ok
    //Emits an event for sending an email in case of a forgotten password
    async emitEmailForgotPassword(email: string, newLinkToken: string) {
        await this.emit(
            'SEND_EMAIL_FORGOT_PASSWORD',
            {
                email: email,
                params: { "FORGOT_PASSWORD_LINK": newLinkToken }
            },
        )
    }

    //Emits an event for sending an email in case of a profile creation 
    async emitEmailProfileCreated(email: string) {
        await this.emit(
            'SEND_EMAIL_PROFILE_CREATED',
            {
                email : email
            }
        )
    }

    // Emits an event for sending an email with a link with token upon creation profile
    async emitEmailCreationAccount(email: string, newLinkToken: string){
        console.log("🚀 ~ file: nats-messenger.service.ts:62 ~ NatsMessengerService ~ emitEmailCreationAccount ~ newLinkToken:", newLinkToken)
        console.log("🚀 ~ file: nats-messenger.service.ts:62 ~ NatsMessengerService ~ emitEmailCreationAccount ~ email:", email)
        this.emit(
            'SEND_EMAIL_CREATION_ACCOUNT',
            {
                email: email,
                params: { "LINK_TOKEN_CREATION_ACCOUNT": newLinkToken }
            },
        )
    }

    // Emits an event for sending an email with a link with token upon association creation 
    async emitEmailCreationAsso(email: string, newLinkToken: string) {
        this.emit(
            'SEND_EMAIL_CREATION_ASSO',
            {
                email: email,
                params: { "LINK_TOKEN_CREATION_ASSO": newLinkToken }
            },
        )
    }

    // Emits an event for sending an email upon kid added to group
    async emitEmailAddedToGroup(email: string) {
        this.emit(
            'SEND_EMAIL_GROUP_HAS_BEEN_ADDED',
            {
                email: email,
                params: { "ADD_USER_TO_EVENT_LINK": `${process.env.PREFIX_URI}/events` }
            },
        )
    }

    // Emits an event for sending an email upon event modification 
    async emitEmailEventEdited(email: string){
        this.emit(
            'SEND_EMAIL_EVENT_EDITED',
            {
                email: email,
                "EVENT_HAS_EDITED": `${process.env.PREFIX_URI}/events`            
            },
        )
    }
}
