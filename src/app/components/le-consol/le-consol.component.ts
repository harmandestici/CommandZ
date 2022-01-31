import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/commande.model';
import { Commandecloturer } from 'src/app/models/commandecloturer.model';
import { Commandepret } from 'src/app/models/commandepret.model';
import { CommandeService } from 'src/app/services/commande.service';
import { Lignecommande} from 'src/app/models/lignecommande.model';

@Component({
  selector: 'app-le-consol',
  templateUrl: './le-consol.component.html',
  styleUrls: ['./le-consol.component.scss']
})
export class LeConsolComponent implements OnInit {
  listCommande: Commande[];
  lsitLigneCommande : Lignecommande[]; 
  com :Commandepret = { pret : false,
                        };
  comclo: Commandecloturer = { cloturer :false};

  constructor(private _service: CommandeService) { }

  ngOnInit(): void {
    let sub = this._service.getAll().subscribe({
      next : (commande) =>{ this.listCommande = commande;
                            this.setFiltrerCommande();
                            console.log(this.listCommande);
                          },
      error : (err) => {console.error(err)},
      complete: ()=> {sub.unsubscribe}             
    });
    
    }

    setFiltrerCommande():void{
      this.listCommande=this.listCommande.filter((p:Commande)=> p.cloturer===false);

    }

    setPret(idx: number):void{
      this.listCommande[idx].pret = true;
      
      //service update à pret...
      this.com.pret = true;

      let sub = this._service.updatePret(this.com, this.listCommande[idx].id).subscribe({
              next:(c)=>{
                //Appeler service envoie email....
              },
              error:(err)=>{console.error(err)},
              complete:()=>{sub.unsubscribe}

      });
    }

    setCloturer(idx : number){
      this.listCommande[idx].cloturer = true;
      this.comclo.cloturer = true;
      this.setFiltrerCommande();
      console.log(this.listCommande);
     //service update cloturer
      let sub = this._service.updateCloturer(this.comclo, this.listCommande[idx].id).subscribe({
                next:(c)=>{},
                error:(err)=>{console.error(err)},
                complete:()=>{sub.unsubscribe}
      });

    }

}
