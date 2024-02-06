import { Document } from 'mongoose';
import { UserDocument } from 'src/user/Schema/user.schema';


export interface userPayload {
    sub: string;
    email: string;
}

export interface IAuthUp extends Document
{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

export interface TokenInterface {
    token: string
}

export interface getTokenInterface {
    accessToken: string,
    refreshToken: string 
}

export interface signInResponseInterface {
    success: boolean,
    code: number,
    user: UserDocument,
    tokens: getTokenInterface,
    error?: object | string
}

export interface sendEmailForgotPasswordResponseInterface {
    message: string
}

export interface acknowledgeResponseinterface {
    acknowledge : boolean
}

export class signInInterface {
    email: string;
    password: string
}