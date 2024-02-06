import { IsEnum, IsMongoId, IsNotEmpty } from "class-validator";
import { LinkRelationEnum } from "../Enum/relation.enum";

export class RelationDTO {

    @IsMongoId()
    readonly fromRef_id: string;

    @IsMongoId()
    readonly toRef_id: string;

    @IsNotEmpty()
    @IsEnum(LinkRelationEnum)
    readonly link: LinkRelationEnum;

    @IsMongoId()
    readonly asso_id: string;
}