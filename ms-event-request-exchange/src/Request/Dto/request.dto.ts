import { IsArray, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { DirectionRequestEnum, StatusRequestEnum, TypeRequestEnum } from '../Enum/request.enum';
import { EventDocument } from 'src/Event/Schema/event.schema';
import { Transform, Type } from 'class-transformer'
import { Types } from 'mongoose'
import moment from 'moment'

export class RequestDto {

    @IsMongoId()
    @IsNotEmpty()
    readonly eventId: string;
    
    @IsMongoId()
    @IsNotEmpty()
    readonly userId: string;
    
    @MaxLength(50)
    @MinLength(4)
    @IsString()
    readonly firstname: string;

    @MaxLength(20)
    @IsNumber()
    readonly nbSeat: number;

    @IsNotEmpty()
    @IsEnum(DirectionRequestEnum)
    readonly direction: DirectionRequestEnum; 
      
    @Transform(({ value }) => moment(value).format('HH:mm:'))
    @IsDateString()
    readonly departure_time: string;
      
    @IsString()
    @MaxLength(200)
    readonly pickup_address: string;

    @IsNotEmpty()
    @IsEnum(TypeRequestEnum)
    readonly type: TypeRequestEnum;
      
    @IsNotEmpty()
    @IsEnum(StatusRequestEnum)
    readonly status: StatusRequestEnum;
      
    @IsMongoId({each: true})
    @IsArray()
    readonly exchanges?: string[];

}
