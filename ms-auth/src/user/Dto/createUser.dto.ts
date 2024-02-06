/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsDate, IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsString, IsStrongPassword, Matches, MaxLength, MinLength } from 'class-validator';
import {  TypeUserEnum } from '../Enum/user.enum';

export class CreateUserDto {
    @IsString()
    @MaxLength(50)
    @MinLength(3)
    readonly firstname?: string;

    @IsString()
    @MaxLength(50)
    @MinLength(3)
    readonly lastname?: string;

    @IsString()
    @MaxLength(70)
    @IsEmail()
    readonly email?: string

    @IsString()
    @IsStrongPassword()
    @Matches(RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), { message: 'password too weak' })
    password?: string

    @IsString()
    @MinLength(10)
    @MaxLength(14)
    readonly phone?: string

    @IsString()
    @MinLength(10)
    @MaxLength(14)
    readonly city?: string

    @IsString()
    @MaxLength(100)
    address?: string

    @IsNotEmpty()
    @IsMongoId()   
    readonly asso_id?: string

    @IsNotEmpty()
    @IsEnum(TypeUserEnum)
    readonly type?: TypeUserEnum;

    @IsDate()
    readonly birthday?: Date

    @IsString()
    @MaxLength(200)
    readonly comment?: string

    @IsBoolean()
    readonly IsActive?: boolean

    @IsMongoId()
    readonly group_id?: string
}
