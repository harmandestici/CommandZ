import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from '../models/produit.model';
import { Produitupdate } from '../models/produitupdate.model';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private _client: HttpClient, private _sessionService: SessionService) { }

  public getAll() : Observable<Produit[]>{

    return this._client.get<Produit[]>("http://localhost:8080/produit");
    
  }

  public getOne(id : number) : Observable<Produit>{
    return this._client.get<Produit>( "http://localhost:8080/produit/" + id );
  }

  public updateOne(form : Produitupdate, id:number) : Observable<Produitupdate>{
    return this._client.put<Produitupdate>("http://localhost:8080/produit/" + id, form);
  }

  public insertOne(form : Produitupdate) : Observable<Produitupdate>{
    return this._client.post<Produitupdate>("http://localhost:8080/produit/", form)
  }

  public deleteOne(id : number) : Observable<number>{
    return this._client.delete<number>("http://localhost:8080/produit/" + id);
  }
}
