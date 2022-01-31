import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  //isLogged$!: Observable<boolean>;

  get IsLogged(): boolean { return this._sessionService.IsLog;}


  constructor(private _sessionService: SessionService,
              private _router: Router,) { }

  ngOnInit(): void {
    //this.isLogged$ = this._sessionService.isLoggedRequest();
  }

  logout(){
    this._sessionService.logOut();
    this._router.navigateByUrl("/accueil")
  }

}
