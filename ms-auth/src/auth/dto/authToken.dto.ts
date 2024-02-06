/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsMongoId, IsString } from "class-validator";

export class AuthTokenDto {

    @IsString()
    email?: string

    @IsString()
    token?: string

    @IsMongoId()
    user_id?: string

}