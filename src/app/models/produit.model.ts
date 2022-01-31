import { Typeproduit } from "./typeproduit.model";

export interface Produit{
    id: number;
    libelle: string;
    description :string;
    prix: number;
    typeproduit: Typeproduit;
}