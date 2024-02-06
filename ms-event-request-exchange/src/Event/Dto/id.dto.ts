import { IsMongoId, IsString } from "class-validator"
export class IdDto {

    @IsString()
    @IsMongoId()
    readonly id: string

}

