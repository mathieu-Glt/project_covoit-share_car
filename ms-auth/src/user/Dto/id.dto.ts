/* eslint-disable @typescript-eslint/no-unused-vars */
import {IsString } from "class-validator";

export class IdDto {

    @IsString()
    readonly id: string;
  userId: string;

}