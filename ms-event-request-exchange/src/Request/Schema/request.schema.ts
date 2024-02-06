import { IsArray, IsDate, IsMongoId, IsNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { DirectionRequestEnum, TypeRequestEnum } from '../Enum/request.enum'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventDocument } from 'src/Event/Schema/event.schema';
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger';

export type RequestDocument = Request & Document;
@Schema({ collection: 'request', timestamps: true, versionKey: false })
    
export class Request {
  
  @ApiProperty()
  @Prop({ required: true })
  @IsMongoId({ each: true })
  eventId: string;

  @ApiProperty()
  @Prop({required: true})
  @IsMongoId({ each: true })
  userId: string;

  @Prop({ required: true })
  @MaxLength(50)
  @MinLength(4)
  @IsString()
  @ApiProperty()
  firstname: string;
  
  @Prop({ required: true })
  @MaxLength(20)
  @IsNumber()
  @ApiProperty()
  nbSeat: number;
  
  @Prop({ required: true, type: String,enum: DirectionRequestEnum})
  @ApiProperty()
  direction: DirectionRequestEnum;
  
  @Prop({ required: true })
  @ApiProperty()
  departureTime: string;
  
  @Prop({ required: true })
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  pickupAddress: string;
  
  @Prop({ required: true,type: String,enum: TypeRequestEnum})
  @ApiProperty()
  type: TypeRequestEnum;

  @Prop()
  @ApiProperty()
  @IsMongoId({each: true})
  @IsArray()
  exchanges: string[]; 
}
export const RequestSchema = SchemaFactory.createForClass(Request);
