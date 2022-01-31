import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commande } from '../models/commande.model';
import { Commandeinsert } from '../models/commandeinsert.model';
import { Lignecommande } from '../models/lignecommande.model';
import { Lignecommandeinsert } from '../models/lignecommandeinsert.model';
import { commandeupdatepanier } from '../models/commandeupdatepanier.model';
import { SessionService } from './session.service';
import { Commandepret } from '../models/commandepret.model';
import { Commandecloturer } from '../models/commandecloturer.model';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  constructor(private _client: HttpClient, private _sessionService: SessionService) { 
  }

  // public getCloturer(cloturer: boolean) : Observable<Commande[]>{
  //   return this._client.get<Commande[]>("http://localhost:8080/commande/"+ cloturer);
  // }

  public getAll() : Observable<Commande[]>{
    return this._client.get<Commande[]>("http://localhost:8080/commande");
  }

  //Ajout du 18/01
  public getUserCommand(): Observable<Commande[]>{
    return this._client.get<Commande[]>("http://localhost:8080/commande/user")
  }


  public getPanier(id: number):Observable<Lignecommande[]>{
    return this._client.get<Lignecommande[]>("http://localhost:8080/commande/"+id+"/panier");
  }

  public insertOne(form: Commandeinsert) : Observable<Commande>{
    return this._client.post<Commande>("http://localhost:8080/commande/", form);
  }

  public updatePret(form: Commandepret, id: number):Observable<Commande>{
    return this._client.put<Commande>("http://localhost:8080/commande/"+id+"/pret", form)
  }

  public updateCloturer(form: Commandecloturer, id: number):Observable<Commande>{
    return this._client.put<Commande>("http://localhost:8080/commande/"+id+"/cloturer", form)
  }

  public updatePanier(form: commandeupdatepanier , id: number):Observable<Lignecommande[]>{
    return this._client.put<Lignecommande[]>("http://localhost:8080/commande/"+id+"/panier", form);
  }
  
}
