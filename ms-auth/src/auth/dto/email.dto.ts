//CALQUE SUR L EMAIL DE BREVO 
export class EmailDto {
    subject?: string
    sender?: {
      email?: string
      name?: string
    }
    to: {
      email: string
      name?: string
    }[]
    templateId?: number
    params?: {
      [key: string]: string
    }
  }

