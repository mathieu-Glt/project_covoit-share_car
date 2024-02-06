/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IsArray, IsDate,  IsEmail, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from 'class-validator';
import { TypeUserEnum } from '../Enum/user.enum';
import { Column } from 'typeorm';

export type UserDocument = User & Document

@Schema({ collection: 'users', timestamps: true, versionKey: false })
export class User {

  @Prop()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @ApiProperty()
  firstname: string

  @Prop()
  @IsString()
  @MaxLength(50)
  @MinLength(3)
  @ApiProperty()
  lastname: string

  @Prop()
  @MaxLength(70)
  @Column()
  @IsEmail()
  @ApiProperty()
  email: string

  @Prop({ required: false })
  @IsStrongPassword()
  @Matches(RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), { message: 'password too weak' })
  @ApiProperty()
  password?: string

  @Prop({ required: false })
  @MinLength(10)
  @MaxLength(14)
  @ApiProperty()
  phone: string

  @Prop({ required: false })
  @MaxLength(14)
  @ApiProperty()
  city: string

  @Prop({ required: false })
  @MaxLength(70)
  @ApiProperty()
  address: string

  @Prop({ type: String, enum: TypeUserEnum, })
  @ApiProperty()
  type: TypeUserEnum

  @Prop({ required: false })
  @IsDate()
  @ApiProperty()
  birthday: string

  @Prop({ required: false })
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  comment: string

  @Prop({default: false})   
  @ApiProperty()
  isActive: boolean

  @Prop()
  @IsString()
  @MaxLength(200)
  @ApiProperty()
  group_id: string

  @Prop()
  @ApiProperty()
  @IsArray()
  associations: [{
    id: string,
    role: string
  }]

}

export const UserSchema = SchemaFactory.createForClass(User)
