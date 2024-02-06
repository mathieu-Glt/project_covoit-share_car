import { IsMongoId, IsNumber, IsString, Max, MaxLength, MinLength,} from 'class-validator';

export class GroupDto {

    @MaxLength(50)
    @MinLength(3)
    @IsString()
    readonly name: string

    @MaxLength(500)
    @IsString()
    readonly description?: string

    @Max(50)
    @IsNumber()
    readonly headcount?: number

    @IsMongoId({ each: true })
    readonly users?: string[]

    @IsMongoId()
    readonly association_id: string

}
