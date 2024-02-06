
export type Action = string;
export type Subject = string;
export type PermissionsType = [string, string];
export type PermissionType = [string, string];
export type AbilityMiddlewareType = [Action, Subject]

export interface ConditionsInterface {
  id?: string;
  filter?: any
}

export enum ConditionsOperationsEnum {
  IS_EQUAL = 'isEqual'
}


export enum enumRole {
    VISITORS = "visitor"
}