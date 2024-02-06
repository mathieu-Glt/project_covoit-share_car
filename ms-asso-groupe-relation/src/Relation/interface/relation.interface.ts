import { LinkRelationEnum } from "../Enum/relation.enum";

export interface RelationInterface {
    fromRef_id: string;
    toRef_id: string;
    link: LinkRelationEnum;
    asso_id: string;
}