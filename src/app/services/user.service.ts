import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Userinsert } from '../models/userinsert.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _client : HttpClient) { }

  public insert(form : Userinsert) : Observable<User>{
    return this._client.post<User>("http://localhost:8080/user", form)
  }
}
