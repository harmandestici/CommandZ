import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Typeproduit } from '../models/typeproduit.model';

@Injectable({
  providedIn: 'root'
})
export class TypeproduitService {

  constructor(private _client : HttpClient) {
   }

  public getAll(): Observable<Typeproduit[]>{
    return this._client.get<Typeproduit[]>("http://localhost:8080/typeproduit");
  }  
}
