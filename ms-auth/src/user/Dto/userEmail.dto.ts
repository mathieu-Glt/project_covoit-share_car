import { IsEmail } from "class-validator";


export class userEmailDto {
    
    @IsEmail()
    email: string
}