import { Component, OnInit } from '@angular/core';
import { Lignecommandeinsert } from 'src/app/models/lignecommandeinsert.model';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-list-commander',
  templateUrl: './list-commander.component.html',
  styleUrls: ['./list-commander.component.scss']
})
export class ListCommanderComponent implements OnInit {
  listProduit: Produit[];
  lignecommandeinsert : Lignecommandeinsert[] = []; 
  panelOpenState = false;
  libTotal : string ="Total";
  totalCommande : number = 0;
  totalCommandelib : string = this.libTotal + " "+String(this.totalCommande)+"€";
  currentfilter : string;

  constructor(private _service: ProduitService) { }
  
  ngOnInit(): void {
    let sub = this._service.getAll().subscribe({
                      next : (produit) =>{ this.listProduit = produit},
                      error : (err) => {console.error(err)},
                      complete: ()=> {sub.unsubscribe}             
                      });
  }

  onDelete(id:number, prix: number):void{
    const val: string = (<HTMLInputElement>document.getElementById("nbreprod"+id)).value;
    var valnum = parseInt(val); 
    if(valnum > 1){
      valnum--;
      this.changelibbuttoncom(valnum * prix, id, valnum);
    }
  }

  onAdd(id:number, prix: number):void{
    const val: string = (<HTMLInputElement>document.getElementById("nbreprod"+id)).value;
    var valnum = parseInt(val); 
    if(valnum < 20){
     valnum++;
      this.changelibbuttoncom(valnum * prix, id, valnum);
    }
  }

  commander(id:number):void{
    //Récup des données
    let qte : string =  (<HTMLInputElement>document.getElementById("nbreprod"+id)).value;
    let commande : string = (<HTMLInputElement>document.getElementById("addcom"+id)).value;
    let p_id: number = this.listProduit[id].id;
    let lib : string = this.listProduit[id].libelle;
    let prx : number = this.listProduit[id].prix;
    //

    //Pour Afficher les total dans le boutton
    this.totalCommande = this.totalCommande + (prx * parseInt(qte));
    this.totalCommandelib = this.libTotal + " "+ String(this.totalCommande) + "€";
    //


    //Création d'un model à transmettre au child pour appeller les services d'insertion3
    //de commande et lignecommande
    let unlignecommande : Lignecommandeinsert = {
                                                id:null,
                                                quantite:parseInt(qte),
                                                produit_id:p_id,
                                                commande_id:null,
                                                libelle:lib,
                                                prix:prx
    };
    this.lignecommandeinsert.push(unlignecommande);
    //
  }

  changelibbuttoncom(newprix : number, id : number, valnum: number):void{
    (<HTMLInputElement>document.getElementById("nbreprod"+id)).value = String(valnum);
    (<HTMLInputElement>document.getElementById("addcom"+id)).value = String(newprix) +"€";
  }

  totalChange(event){
    this.totalCommande = event;
    this.totalCommandelib = this.libTotal + " "+ String(this.totalCommande) + "€";
  }

  setFilteriall():void{
    // this.listProduit_filtered = this.listProduit;   
    // this.currentfilter = 'all';
 }

 setFilterplat():void{
    // this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===1);
    // this.currentfilter = 'pla';

 }
 setFilterentree():void{
  //  this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===2);
  //  this.currentfilter = 'ent';
 }

 setFilterboisson():void{
  //  this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===4);
  //  this.currentfilter = 'boi';
 }
 setFilterdessert():void{
  //  this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===3);
  //  this.currentfilter = 'des';
 }
}
