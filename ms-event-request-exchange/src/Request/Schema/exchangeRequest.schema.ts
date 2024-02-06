import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { StatusRequestEnum } from '../Enum/request.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type ExchangeRequestDocument = ExchangeRequest & Document;
@Schema({ collection: 'exchangeRequest', timestamps: true, versionKey: false })
export class ExchangeRequest {

    @Prop()
    @ApiProperty()
    user_id: string;

    @Prop({
        type: [String],
        enum: StatusRequestEnum,
        required: true
    })
    @ApiProperty()
    status: StatusRequestEnum[];

}

export const exchangeSchema = SchemaFactory.createForClass(ExchangeRequest);