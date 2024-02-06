/* eslint-disable @typescript-eslint/no-unused-vars */
// create dto association //
import { IsString, MaxLength, MinLength } from "class-validator";

export class AssociationDTO {

    @MaxLength(50)
    @MinLength(3)
    @IsString()
    readonly name: string;
    
    @MaxLength(500)
    @IsString()
    readonly description?: string;

    @IsString()
    readonly image?: string;

    }
    
    export class AssoNameDTO {

    @MaxLength(50)
    @MinLength(3)
    @IsString()
    readonly name: string;
    
}