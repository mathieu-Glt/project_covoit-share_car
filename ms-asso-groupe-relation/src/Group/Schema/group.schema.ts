import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsMongoId, IsNumber, IsString, Max, MaxLength, MinLength } from 'class-validator'
import { SchemaTypes, Types, Document } from 'mongoose'
import { AssociationDocument } from 'src/Association/Schema/association.schema'

export type GroupDocument = Group & Document
@Schema({ collection: 'group', timestamps: true, versionKey: false })
export class Group {
    @Prop({ required: true, })
    @MaxLength(50)
    @MinLength(3)
    @IsString()
    @ApiProperty()
    name: string

    @Prop()
    @MaxLength(500)
    @IsString()
    @ApiProperty()
    description: string

    @Prop()
    @Max(50)
    @IsNumber()
    @ApiProperty()
    headcount: number;
  
    //string car ref à un autre ms
    @Prop()
    @IsArray()
    @IsMongoId({each: true})
    @ApiProperty()
    users: string[]

    //ref asso car ds meme ms
    @Prop({ type: SchemaTypes.ObjectId, ref: 'Association' })
    @IsMongoId()
    @ApiProperty()
    association_id: string | Types.ObjectId | AssociationDocument;

}
export const GroupSchema = SchemaFactory.createForClass(Group)
