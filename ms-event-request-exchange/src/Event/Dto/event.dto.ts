import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, IsString, Max, MaxLength, MinLength } from 'class-validator';
import moment from 'moment';

export class EventDto {
    @ApiProperty()
    @Type(() => Date)
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    @IsDateString()
    @IsNotEmpty()
    readonly startDate: string

    @ApiProperty()
    @Type(() => Date)
    @Transform(({ value }) => moment(value).format('HH:mm:ss'))
    @IsDateString()
    @IsNotEmpty()
    readonly startTime: string

    @ApiProperty()
    @Type(() => Date)
    @Transform(({ value }) => moment(value).format('YYYY-MM-DD'))
    @IsDateString()
    @IsNotEmpty()
    readonly endDate: string;

    @ApiProperty()
    @Type(() => Date)
    @Transform(({ value }) => moment(value).format('HH:mm:ss'))
    @IsDateString()
    @IsNotEmpty()
    readonly endTime: string;

    @ApiProperty()
    @MaxLength(50)
    @MinLength(3)
    @IsString()
    readonly name: string;

    @ApiProperty()
    @MaxLength(100)
    @IsString()
    readonly event_address: string;

    @ApiProperty()
    @MaxLength(150)
    @IsString()
    readonly description?: string;

    @MaxLength(255)
    @IsString()
    readonly image?: string;

    @Max(50)
    @IsNotEmpty()
    @IsNumber()
    readonly participant?: number;

    @IsMongoId()
    association_id: string;

    @IsMongoId({each: true})
    groups?: [string];

    get formattedStartDate(): string {
        return moment(this.startDate).format('YYYY-MM-DD')
    }
    get formattedStartTime(): string {
        return moment(this.startTime).format('HH:mm:ss')
    }

    get formattedEndDate(): string {
        return moment(this.endDate).format('YYYY-MM-DD')
    }

    get formattedEndTime(): string {
        return moment(this.endTime).format('HH:mm:ss')
    }
}
