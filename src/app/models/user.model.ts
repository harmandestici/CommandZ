import { Role } from "./role.model";

export interface User{
    id:number;
    nom:string;
    prenom:string;
    regnational:string;
    username:string;
   // password:string;
    email:string;
    rue:string;
    numero:number;
    cdpostal:number;
    localite:string;
    dtinscription:Date;
    banni:boolean;
    roles: Role;
    ccountNonExpired : boolean;
    accountNonLocked : boolean;
    credentialsNonExpired : boolean;
    enabled : boolean;
}