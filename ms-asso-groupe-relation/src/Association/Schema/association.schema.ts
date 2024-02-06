import { Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';


export type AssociationDocument = Association & Document;
@Schema({ collection: 'associations', timestamps: true, versionKey: false })
export class Association {
    
    @Prop({ required: true, })
    @MaxLength(50)
    @MinLength(3)
    @IsString()
    @ApiProperty()
    name: string;

    @Prop()
    @MaxLength(500)
    @IsString()
    @ApiProperty()
    description: string;

    @Prop()
    @MaxLength(250)
    @IsString()
    @ApiProperty()
    @MaxLength(255)
    image?: string;
}

export const AssociationSchema = SchemaFactory.createForClass(Association);