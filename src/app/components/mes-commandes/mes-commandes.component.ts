import { Component, OnInit } from '@angular/core';
import { Commande } from 'src/app/models/commande.model';
import { CommandeService } from 'src/app/services/commande.service';

@Component({
  selector: 'app-mes-commandes',
  templateUrl: './mes-commandes.component.html',
  styleUrls: ['./mes-commandes.component.scss']
})
export class MesCommandesComponent implements OnInit {
  listCommande: Commande[];

  constructor(private _service: CommandeService) { }

  ngOnInit(): void {
    let sub = this._service.getUserCommand().subscribe({
      next : (commande) =>{ this.listCommande = commande;
                            console.log(this.listCommande);
                          },
      error : (err) => {console.error(err)},
      complete: ()=> {sub.unsubscribe}             
    });

  }

}
