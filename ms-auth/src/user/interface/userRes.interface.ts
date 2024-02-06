import { RoleUserEnum, TypeUserEnum } from "../Enum/user.enum";
import { UserDocument } from "../Schema/user.schema";

export interface getUsersCreatedInterface {
  newKid: UserDocument,
  newParent: UserDocument
}

export interface assoUserEditInterface{
  
  id: string ; 
  role: RoleUserEnum.Admin 
}

export interface ParentInterface {

    firstname?: string,
    lastname?: string,
    email?: string,
    password?: string,
    city?: string
    address?: string,
    phone?: string,
    type?: TypeUserEnum,
    birthday?: string,
    comment?: string,
    isActive?: boolean,
    group_id?: string,
    associations?: [{
      id: string,
      role: string
  }]
}

interface GlobalEditInterface {
  firstname: string,
  lastname: string,
  email: string,
  city: string
  address: string,
  password: string,
  phone: string,
  group_id: string,
  asso_id: string,
  comment: string,
  birthday: Date,
  isActive: boolean
}

export type parentEditInterface = Omit<GlobalEditInterface, "birthday" | "comment" | "group_id" | "asso_id">

export type kidEditInterface = Pick<GlobalEditInterface, "firstname" | "lastname" | "comment" | "birthday" | "group_id">

export type adminEditInterface = Pick<ParentInterface, "password" | "isActive" |"associations">

//CREATION PARENT ADMIN INTERFACE 
export type parentAdminCreateInterface = Omit<ParentInterface, "birthday" | "comment" | "group_id" | "associations" | "isActive"| "type">

//EDITION PARENT ADMIN INTERFACE 
export type parentAdminEditInterface = Pick<GlobalEditInterface, "password" | "asso_id" >  
