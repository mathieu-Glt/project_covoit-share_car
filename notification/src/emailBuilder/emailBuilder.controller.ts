import { Controller, UseInterceptors } from '@nestjs/common'
import { EmailService } from './emailBuilder.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { EmailDto } from './Dto/email.dto'
import { RpcSuccessInterceptor } from 'src/Interceptor/RpcSuccessInterceptor'

// Controller responsible for handling email-related operations
@Controller()
// Applying RpcSuccessInterceptor to the controller
@UseInterceptors(RpcSuccessInterceptor)
export class EmailController {
    constructor(private readonly emailService: EmailService) { }
    // Handler for sending general transactional emails
    @MessagePattern('SEND_EMAIL')
    async sendEmail(@Payload('body') data: EmailDto) {
        try {
            return await this.emailService.sendTransacEmail(data)
        } catch (error) {
            throw new Error('Failed to send email')
        }
    }

    // Handler for sending forgot password emails
    @MessagePattern('SEND_EMAIL_FORGOT_PASSWORD')
    async sendEmailForgotPassword(@Payload() data: EmailDto) {
        try {
            return await this.emailService.forgotPasswordEmail(data)
        } catch (error) {
            throw new Error('Failed to send email')
        }
    }

    // Handler for sending creation account emails
    @MessagePattern('SEND_EMAIL_CREATION_ACCOUNT')
    async sendCreationAccountUser(@Payload() body: EmailDto) {
        console.log("🚀 ~ file: emailBuilder.controller.ts:36 ~ EmailController ~ sendCreationAccountUser ~ body:", body)
        try {
            await this.emailService.creationAccountEmail(body)
        } catch (error) {
            throw new Error('Failed to send email')
        }
    }

    // Handler for sending creation association emails
    @MessagePattern('SEND_EMAIL_CREATION_ASSO')
    async sendCreationAssoAdmin(@Payload() data: EmailDto) {
        try {
            await this.emailService.creationAssoEmail(data)
        } catch (error) {
            throw new Error('Failed to send email')
        }
    }

    // Handler for sending email once added to a new group   
    @MessagePattern('SEND_EMAIL_GROUP_HAS_BEEN_ADDED')
    async sendEmailGroupHasBeenAddedEvent(@Payload() data: EmailDto) {
        try {
            return await this.emailService.eventEditedGroupHasBeenAdded(data)
        } catch (error) {
            throw new Error('Failed to send email')
        }
    }

    // Handler for sending email once event is edited 
    @MessagePattern('SEND_EMAIL_EVENT_EDITED')
    async sendEmailUpdateEvent(@Payload() data: EmailDto){
        try {
            return await this.emailService.eventEdited(data)
        } catch (error) {
            throw new Error('Failed to send email')
        }
    }

    // Handler for sending cemail once the profile is created 
    @MessagePattern('SEND_EMAIL_PROFILE_CREATED')
    async sendProfileCreated(@Payload() data: EmailDto) {
        try {
            return await this.emailService.profileCreated(data)
        } catch (error) {
            throw new Error('data email builder')
        }
    }

    // Handler for sending an email once a response was made to a request 
    @MessagePattern('SEND_EMAIL_RESPONSE_REQUEST')
    async sendEmailResponseRequest(@Payload() data: EmailDto) {
        try {
            return await this.emailService.sendEmailResponseRequest(data)
        } catch (error) {
            throw new Error('data email builder')
        }
    }

    // Handler for sending an email once a response is made to the exchange 
    @MessagePattern('SEND_EMAIL_RESPONSE_EXCHANGE')
    async sendEmailResponseExchange(@Payload() data: EmailDto) {
        try {
            return await this.emailService.sendEmailResponseExchange(data)
        } catch (error) {
            throw new Error('data email builder')
        }
    }
}
