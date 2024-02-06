import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types, Document } from 'mongoose'
import { LinkRelationEnum } from '../Enum/relation.enum'
import { IsEnum, IsMongoId } from 'class-validator'
import { AssociationDocument } from 'src/Association/Schema/association.schema'

export type RelationDocument = Relation & Document
@Schema({ collection: 'relation', timestamps: true, versionKey: false })
export class Relation {

  @Prop({ required: true })
  @ApiProperty()
  @IsMongoId()
  fromRef_id: string //ID utilisateur de départ

  @Prop({ required: true })
  @ApiProperty()
  @IsMongoId()
  toRef_id: string //ID utilisateur de comparaison

  @Prop({ type: String, enum: LinkRelationEnum, required: true })
  @IsEnum(LinkRelationEnum)
  @ApiProperty()
  link: LinkRelationEnum  //Lien entre deux utilisateurs

  @ApiProperty()
  @Prop({ type: SchemaTypes.ObjectId, ref: 'Association' })
  asso_id: string | Types.ObjectId | AssociationDocument

}

export const RelationSchema = SchemaFactory.createForClass(Relation)
