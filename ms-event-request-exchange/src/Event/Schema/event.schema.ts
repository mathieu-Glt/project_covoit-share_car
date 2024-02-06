import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsMongoId, Max, MaxLength, MinLength } from 'class-validator';

export type EventDocument = Event & Document;
@Schema({ collection: 'event', timestamps: true, versionKey: false })
export class Event {

  @Prop({ required: true })
  @ApiProperty()
  @IsDate()
  startDate: string;

  @Prop({ required: true })
  @ApiProperty()
  @IsDate()
  startTime: string;
  
  @Prop({ required: true })
  @ApiProperty()
  @IsDate()
  endDate: string;

  @Prop({ required: true })
  @ApiProperty()
  @IsDate()
  endTime: string;

  @Prop()
  @ApiProperty()
  @MaxLength(50)
  @MinLength(3)
  name: string;
  
  @Prop()
  @ApiProperty()
  @MaxLength(100)
  event_address: string;
  
  @Prop()
  @ApiProperty()
  @MaxLength(150)
  description?: string;
  
  @Prop()
  @ApiProperty()
  @MaxLength(255)
  image?: string;
  
  @Prop()
  @ApiProperty()
  @Max(20)
  participant?: number;
 
  @Prop({required: false })
  @IsMongoId({each: true})
  @ApiProperty()
  association_id?: string;
  
  @Prop({required: false })
  @IsMongoId({each: true})
  @ApiProperty()
  groups?: [string];
}
export const EventSchema = SchemaFactory.createForClass(Event);