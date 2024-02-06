
export interface AssoInterface {
    name: string;
    description?: string;
    image?:string
}

export interface assoUserEditInterface{
  id: string; 
  role: string 
}

export enum RoleUserEnum {
    User = 'User', //default 
    Admin = 'Admin'
}


