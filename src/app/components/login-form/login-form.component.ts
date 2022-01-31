import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({
                              'username' : new FormControl(''),
                              'password' : new FormControl('')

  })

  constructor(private _session: SessionService,
              private _router: Router) { } 

  ngOnInit(): void {
  }

  onSubmit(){
    this._session.login(this.loginForm.value, {
              next: pop => {console.log(pop);
                            this._router.navigateByUrl("/accueil")},
              error: error => alert("username ou password est invalide")
    })

  }

 

  // onSubmit(){
  //   this._service.login( this.loginForm.value, {
  //       next: popol => console.log(popol),
  //       error: error => alert( "username/password invalide" )
  //     })
  // }
}
