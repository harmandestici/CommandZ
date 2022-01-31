import { Commande } from "./commande.model";
import { Produit } from "./produit.model";

export interface Lignecommande{
   id:number;
   quantite:number;
   commande: Commande;
   produit: Produit; 
}