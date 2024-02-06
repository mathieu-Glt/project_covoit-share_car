import * as SibApiV3Sdk from 'sib-api-v3-typescript'; // Importing SendinBlue API SDK
import { SendSmtpEmail } from 'sib-api-v3-typescript'; // Importing SendSmtpEmail type
import { Injectable } from '@nestjs/common'; // Importing Injectable decorator from NestJS
import { EmailDto } from './Dto/email.dto'; // Importing the EmailDto class
import * as dotenv from 'dotenv'; // Importing dotenv for environment variables

// Load environment variables from .env file
dotenv.config();

@Injectable()
export class EmailService{
  // Creating an instance of SendinBlue API
  private readonly sendinblue: SibApiV3Sdk.TransactionalEmailsApi;
  
  constructor() {
    // Initializing the SendinBlue API instance
    this.sendinblue = new SibApiV3Sdk.TransactionalEmailsApi();
    // Setting the API key
    this.sendinblue.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.API_KEY);
  }

    // Method to send transactional email
    async sendTransacEmail(data: EmailDto): Promise<any> {
      try {
        // Creating an instance of SendSmtpEmail
        const email = new SendSmtpEmail();
        email.subject = data.subject;
        email.sender = {
          email: "covoit@DMJ.com",
          name: "Application Covoiturage Association"
        };
        email.to = data.to
        email.params = data.params
        email.templateId = data.templateId; 
        // Sending the transactional email
        return await this.sendinblue.sendTransacEmail(data);
      
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
      }
  }

    //ENVOI EMAIL FORGOT PASSWORD AVEC TEMPLATE ADEQUAT 
    async forgotPasswordEmail(data: EmailDto): Promise<any> {
   
      type EmailKey = keyof typeof EmailDto;
      const email = 'email' as EmailKey;

      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Réinitialisez votre mot de passe"
        newEmail.to = [{
          email:  data[email]
        }]
        newEmail.params = data.params
        newEmail.templateId = 11 
        return await this.sendinblue.sendTransacEmail(newEmail)
      } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send email')
      }
    }

    //EMAIL ENVOYE AU USER(parent) pour compléter le profil 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async creationAccountEmail(data: EmailDto) {
      type EmailKey = keyof typeof EmailDto;
      console.log("data has", data)
      const email = 'email' as EmailKey;
      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Créez votre compte sur l'appli de Covoiturage"
        newEmail.to = [{
          email:  data[email]
        }]
        newEmail.params = data.params
        newEmail.templateId = 12 
        return await this.sendinblue.sendTransacEmail(newEmail)
  
      } catch (error) {
        console.error
        throw new Error('Failed to send email')
      }
  }

    //EMAIL ENVOYE AU USER(parent) pour compléter le profil 
    async creationAssoEmail(data: EmailDto) {
      type EmailKey = keyof typeof EmailDto;
      const email = 'email' as EmailKey;
      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Vous pouvez créer une nouvelle asso"
        newEmail.to = [{
          email:  data[email]
        }]
        newEmail.params = data.params
        newEmail.templateId = 13 
        await this.sendinblue.sendTransacEmail(newEmail)
  
      } catch (error) {
        throw new Error('Failed to send email')
      }
    }

    async profileCreated(data: EmailDto) {
      type EmailKey = keyof typeof EmailDto;
      const email = 'email' as EmailKey;
      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Confirmation de creation de compte"
        newEmail.to = [{
          email:  data[email]
        }]
        newEmail.templateId = 15 

        return await this.sendinblue.sendTransacEmail(newEmail)
  
      } catch (error) {
        throw new Error('Failed to send email')
      }
    }
  
  //ENVOI D'EMAIL QUAND UN GROUP EST AJOUTE A UN EVENEMENT
    async eventEditedGroupHasBeenAdded(data: EmailDto): Promise<any> {

      type EmailKey = keyof typeof EmailDto;
      const email = 'email' as EmailKey;

      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Des changements pour votre évènement"
        newEmail.to =[{
          email: data[email]
        }]
        newEmail.params = data.params
        newEmail.templateId = 18
        return await this.sendinblue.sendTransacEmail(newEmail)

      } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send email')
      }
    }

  //ENVOI D'EMAIL QUAND EDITION D'EVENEMENT
    async eventEdited(data: EmailDto): Promise<any> {

      type EmailKey = keyof typeof EmailDto;
      const email = 'email' as EmailKey;

      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Des changements pour votre évènement"
        newEmail.to =[{
          email:  data[email]
        }]
        newEmail.params = data.params
        newEmail.templateId = 16
        return await this.sendinblue.sendTransacEmail(newEmail)

      } catch (error) {
        console.error('Error sending email:', error)
        throw new Error('Failed to send email')
      }
    }



  async sendEmailResponseRequest(data: EmailDto) {
      type EmailKey = keyof typeof EmailDto;
      const email = 'email' as EmailKey;
      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Une reponse à été émise à votre requête"
        newEmail.to = [{
          email: data[email]
        }]
        newEmail.params = data.params
        newEmail.templateId = 15
        return await this.sendinblue.sendTransacEmail(newEmail)
  
      } catch (error) {
        throw new Error('Failed to send email')
      }
    }

  async sendEmailResponseExchange(data: EmailDto) {
      type EmailKey = keyof typeof EmailDto;
      const email = 'email' as EmailKey;
      try {
        const newEmail = new SendSmtpEmail()
        newEmail.subject = "Vous avez reçu une réponse"
        newEmail.to = [{
          email: data[email]
        }]
        newEmail.params = data.params
        //TODO : CREER UN TEMPLATE POUR LA REPONSE A L EXCHANGE
        newEmail.templateId = 15
        return await this.sendinblue.sendTransacEmail(newEmail)
  
      } catch (error) {
        throw new Error('Failed to send email')
      }
  }

  }




   