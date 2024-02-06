/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString, IsStrongPassword, Matches } from "class-validator"

export class NewPasswordDto {

    @IsString()
    @IsStrongPassword()
    @Matches(RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), { message: 'password too weak' })
    password: string

    @IsString()
    @IsStrongPassword()
    @Matches(RegExp(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/), { message: 'password too weak' })
    confirmPassword: string
}
