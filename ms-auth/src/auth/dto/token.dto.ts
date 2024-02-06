/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsString } from "class-validator";

export class TokenDto {

    @IsString()
    token: string
}
