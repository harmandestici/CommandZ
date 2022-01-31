import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Lignecommandeinsert } from 'src/app/models/lignecommandeinsert.model';
import { Commandeinsert} from 'src/app/models/commandeinsert.model'
import { CommandeService } from 'src/app/services/commande.service';
import { Router } from '@angular/router';
import { Commande } from 'src/app/models/commande.model';
import { commandeupdatepanier } from 'src/app/models/commandeupdatepanier.model';
import { FormBuilder } from '@angular/forms';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-commander-insert',
  templateUrl: './commander-insert.component.html',
  styleUrls: ['./commander-insert.component.scss']
})
export class CommanderInsertComponent implements OnInit {

  @Input()
  lignecommandeinsertchild:Lignecommandeinsert[] | null = null; 
  @Input()
  total:number;
  @Output()
  change: EventEmitter<number> = new EventEmitter<number>();
  commandeinsert: Commandeinsert | null = null;
  commande$: Commande;
  commandeupdatepanier : commandeupdatepanier;
  IsLogged : boolean = false;

  
  constructor(private _service:CommandeService,
              private _router : Router,
              private _sessionService : SessionService) { 
 

}

  ngOnInit(): void {;

  }

  onAdd(id:number):void{
    let qte : number = this.lignecommandeinsertchild[id].quantite;
    let prx : number = this.lignecommandeinsertchild[id].prix;
    if (qte < 20){
      this.lignecommandeinsertchild[id].quantite = qte + 1;
      this.total = this.total + prx;
    }

    this.change.emit(this.total);
  }
  
  onDelete(id:number):void{
    let qte : number = this.lignecommandeinsertchild[id].quantite;
    let prx : number = this.lignecommandeinsertchild[id].prix;
    if(qte === 1){
      //on supprime l'occurance
      this.lignecommandeinsertchild.splice(id,1);
    }else{
      this.lignecommandeinsertchild[id].quantite = qte - 1;
    }
    this.total = this.total - prx;
   
    this.change.emit(this.total);
  }

  commander():void{
    const token = this.getToken();
    if(token != null){
      
      //On initialise les valeur pour une commande
      //On va appeler le service qui va crée un commande et des ligne-commande...
      this.commandeinsert = {
        dtcommande: new Date(),
        pret: false,
        total:this.total,//modif du 17/01
        user_id:this._sessionService.get_current_user_id()//passer le user_id connecté...
      }

      this.commandeupdatepanier = {
        panier: this.lignecommandeinsertchild
      }

        //this.commandeupdatepanier.panier = this.lignecommandeinsertchild;

      let sub = this._service.insertOne(this.commandeinsert).subscribe({
          next :(com) =>{  this.commande$ = com;
                            let sub2 = this._service.updatePanier(this.commandeupdatepanier, this.commande$.id)
                                                    .subscribe({
                                                        next :(lignecom)=>{
                                                          alert("la commande sera bientot traiter.");       
                                                          this._router.navigateByUrl("/accueil");  
                                                        },

                                                        error :(err2)=>{console.error(err2)},

                                                        complete: () =>{ sub2.unsubscribe}

                                                    });              
                        },
          error :(err)=>{console.error(err)},
          complete : () =>{ sub.unsubscribe} 
    });
  } else{
    //alert("Veuillez-vous connecter");//à changer...metrre dans la page
    this.IsLogged = true;
  }

  }

  getToken(): string | null{
    return sessionStorage.getItem("jwt");
  }
}
