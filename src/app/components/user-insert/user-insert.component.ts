import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { Role } from 'src/app/models/role.model';
import { UserService } from 'src/app/services/user.service';
//import {ErrorStateMatcher} from '@angular/material/core';

// /** Error when invalid control is dirty, touched, or submitted. */
// export class MyErrorStateMatcher implements ErrorStateMatcher {
//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null  ): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-user-insert',
  templateUrl: './user-insert.component.html',
  styleUrls: ['./user-insert.component.scss']
})
export class UserInsertComponent implements OnInit {
  userForm : FormGroup;
  role$ : Role;
  //hide : true;
  showPassword: boolean = false;
 
  // matcher : MyErrorStateMatcher;
  constructor(private _session: SessionService,
              private _router: Router,
              private _builder: FormBuilder,
              private _service: UserService) { 
    
    this.userForm = _builder.group({
            nom : new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
            prenom : new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
            regnational : new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
            username : new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(255)]),
            password : new FormControl(null,[Validators.required, Validators.minLength(6), Validators.maxLength(64),
                                             Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$'),
                                            this.checkPasswordNotUsername()]),
            email : new FormControl('', [Validators.required, Validators.email]),
            rue : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
            numero : new FormControl(null, [Validators.required, Validators.min(1)]),
            cdpostal : new FormControl(null,[Validators.required, Validators.min(1000)]),
            localite : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
            dtinscription : new FormControl(new Date()),
            role_id : new FormControl(2)//2 = "USER" on dure à modifier
    });
    // this.matcher = new MyErrorStateMatcher();
  }

  ngOnInit(): void { 

  }

  onSubmit(){
    let sub  = this._service.insert(this.userForm.value).subscribe({
      next :(u) =>{ alert("l'utilisateur à bien été crée.")
                          this._router.navigateByUrl("/login"); 
                        },
      error :(err)=>{console.error(err)},
      complete : () =>{ sub.unsubscribe} 
    });

  }

  //Fonction pour le validators
  public checkPasswordNotUsername(): ValidatorFn 
  {
    return (control: AbstractControl): ValidationErrors | null =>
    {
      const password = control.value;
      const username = this.userForm?.get('username')?.value;

      let error = { pwdEqUsername: { value: "password and username are equals" } };

      if(password != null && password == username)
      {
        //error.pwdEqUsername = true;
        return error;
      }

      return null;
    }
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
