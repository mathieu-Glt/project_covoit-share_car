import { Date } from 'mongoose';
import { DirectionRequestEnum, StatusRequestEnum, TypeRequestEnum } from '../Enum/request.enum';
import { RequestDocument } from '../Schema/request.schema';
export interface ExchangeInterface{
    user_id: string, // ID DE L USER QUI A REPONDU A LA REQUEST
    status?: StatusRequestEnum // DEFAUT PENDING 
}

export interface RequestInterface {
    eventId: string;
    userId: string;
    firstname: string;
    nbSeat: number;
    direction: DirectionRequestEnum; 
    departure_time: string;
    pickup_address: string;
    type: TypeRequestEnum;
    status: StatusRequestEnum;
    exchanges?: string[]; 
}

export interface ResponseInterfaceSuccess {
    success: boolean,
    code: number,
    message: string,
    request: RequestDocument,
    date: Date
}



export interface ResponseInterfaceError {
    success: boolean,
    code: number,
    message: string
}


