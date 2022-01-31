import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { Loginconnexion } from '../models/loginconnexion.model';
import { smalluser } from '../models/smalluser.model';
import { Authorization } from './authorization.enum';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private user$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private user :smalluser;
  get User$(): Observable<any> { return this.user$.asObservable(); }

  get IsLog(): boolean { return this.user$.value != null; }
  
  private readonly JWT_TOKEN_KEY = "jwt";

  constructor(private _client: HttpClient) { }


  public login(form: Loginconnexion, observer?: Partial<Observer<any>> | undefined) {
    const obs = this._client.post<any>("http://localhost:8080/login", form);
    obs.subscribe({
      next: value => {
        //user.token.replace('Bearer ', '')
        sessionStorage.setItem( this.JWT_TOKEN_KEY, value.token.replace('Bearer ', '') )
        if(observer && observer.next)
          observer.next(value);
          this.user$.next(value);
          ///////////////////
          //Ajout du 14/01
          this.user = value;
          localStorage.setItem('user', JSON.stringify(this.user));
          ///////////////////
      },
      error: error => {
        if(observer && observer.error)
          observer.error(console.error())
      },
      complete: () => {
        if(observer && observer.complete)
          observer.complete()
      }
    })
  }

  getToken(): string | null{
    return sessionStorage.getItem(this.JWT_TOKEN_KEY);
  }
 
  isLoggedRequest(): Observable<boolean> {
    return this._client.get<boolean>("http://localhost:8080/is-logged", {
      headers: this.getAuthHeader()
    })
  }

  logOut(){
    //sessionStorage.removeItem(this.JWT_TOKEN_KEY);
    this.user$.next(null);
    //Ajout de 14/01
    sessionStorage.removeItem(this.JWT_TOKEN_KEY);
    localStorage.removeItem('user');
    //
  }

  getAuthHeader(): { [key:string]:string } {
    const token = this.getToken();
    //alert(token);
    return token ? { "Authorization": token } : {}
  }


  /////////////////////////////////////////////////
  //Rajout de 14/01 pour le Guard
  /////////////////////////////////////////////////
  public isUser()
  {
    return this.checkAuthorization(Authorization.USER);
  }

  public isAdmin()
  {
    return this.checkAuthorization(Authorization.ADMIN);
  }


  private checkAuthorization(type: string)
  {
     const user = JSON.parse(localStorage.getItem('user')) as smalluser;
  
    if(user)
    {
      return user.roles.includes(type);
    }
    return false;
  }
  /////////////////////////////////////////////////
  
  //Rajout modif du 17/01
  public get_current_user_id(): number | null{
    return this.user.user_id;
  }
  //
}
