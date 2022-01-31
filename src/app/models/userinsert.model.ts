import { Role } from "./role.model";

export interface Userinsert{
    id:number;
    nom:string;
    prenom:string;
    regnational:string;
    username:string;
    password:string;
    email:string;
    rue:string;
    numero:number;
    cdpostal:number;
    localite:string;
    dtinscription:Date;
    roles: Role;
}