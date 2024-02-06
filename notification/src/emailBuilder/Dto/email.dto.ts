export class EmailDto {
    subject?: string;

    sender: {
        email: string,
        name: string
    };
    to: [{
        email: string,
        name: string
    }]
    params: {
      key: string
    }
    templateId : number
}


