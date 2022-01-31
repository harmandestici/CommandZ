import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Produit } from 'src/app/models/produit.model';
import { ProduitService } from 'src/app/services/produit.service';

@Component({
  selector: 'app-list-produit',
  templateUrl: './list-produit.component.html',
  styleUrls: ['./list-produit.component.scss']
})
export class ListProduitComponent implements OnInit {

  //listProduit$!: Observable<Produit[]>;
  listProduit: Produit[];
  listProduit_filtered : Produit[];
  unProduit : Produit;
  confirmDeleteId : number | undefined;
  currentfilter : string;
  

  constructor(private _service: ProduitService) { }

  ngOnInit(): void {

    let sub = this._service.getAll().subscribe({
          next : (produit) =>{ this.listProduit = produit},
          error : (err) => {console.error(err)},
          complete: ()=> {this.listProduit_filtered = this.listProduit,
                          sub.unsubscribe}             
    });
    ;                                
  }

  onDelete(id: number){
    this.confirmDeleteId = id;
  }

  onConfirmDelete(){
    if (this.confirmDeleteId){
      let sub = this._service.deleteOne(this.confirmDeleteId).subscribe({
        next: (produit) => {
          alert( "Le produit no "+produit+ " a été supprimé" );
          // this.listProduit = this._service.getAll();
          let sub2 = this._service.getAll().subscribe({
                                next : (produit) =>{ this.listProduit = produit},
                                error : (err) => {console.error(err)},
                                complete: ()=> {this.listProduit_filtered = this.listProduit;
                                                  switch(this.currentfilter) { 
                                                    case 'pla': { 
                                                      this.setTriall(); 
                                                      break; 
                                                    } 
                                                    case 'ent': { 
                                                     this.setTrientree();
                                                      break; 
                                                    } 
                                                    case 'boi': { 
                                                      this.setTriboisson(); 
                                                      break; 
                                                    } 
                                                    case 'des': { 
                                                      this.setTridessert
                                                      break; 
                                                    } 
                                                    default: { 
                                                      this.setTriall(); 
                                                      break; 
                                                    } 
                                                    } ;
                                                sub2.unsubscribe}             
                          });
        },
        error: (err) => {
          alert("L'id du produit à supprimer n'existe pas")
        },
        complete: () => {
          sub.unsubscribe()
        }
      })
      this.confirmDeleteId = undefined;
    }
  }
  
  onCancelDelete(){
    this.confirmDeleteId = undefined;
  }

  setTriall():void{
     this.listProduit_filtered = this.listProduit;   
     this.currentfilter = 'all';
  }

  setTriplat():void{
     this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===1);
     this.currentfilter = 'pla';

  }
  setTrientree():void{
    this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===2);
    this.currentfilter = 'ent';
  }

  setTriboisson():void{
    this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===4);
    this.currentfilter = 'boi';
  }
  setTridessert():void{
    this.listProduit_filtered = this.listProduit.filter((p:Produit)=> p.typeproduit.id===3);
    this.currentfilter = 'des';
  }

}
