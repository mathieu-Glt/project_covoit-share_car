import { IsEnum, IsMongoId, IsString } from "class-validator"
import { StatusRequestEnum } from "../Enum/request.enum"


export class ExchangeDto {

    @IsString()
    @IsMongoId()
    readonly user_id: string;

    @IsEnum({
        StatusRequestEnum, 
        default: StatusRequestEnum.pending
    })
    status: StatusRequestEnum
}