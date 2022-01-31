import { Lignecommande } from "./lignecommande.model";
import { User } from "./user.model";

export interface Commande{
    id:number;
    dtcommande:Date;
    pret:boolean;
    cloturer:boolean;//modif 14/01 soir
    total:number; //modif du 17/01 
    user:User;
    panier: Lignecommande[];    
}