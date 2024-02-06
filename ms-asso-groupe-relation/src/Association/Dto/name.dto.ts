import {IsString } from "class-validator";

export class NameDto {

    @IsString()
    readonly name: string;
    
}