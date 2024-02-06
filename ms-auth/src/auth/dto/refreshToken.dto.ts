/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString } from "class-validator";

export class RefreshTokenDto {

    @IsString()
    refreshToken: string
}