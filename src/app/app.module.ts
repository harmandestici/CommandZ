import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AccueilComponent } from './components/accueil/accueil.component';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { SharedModule } from './shared/shared.module';
import { ProduitInsertComponent } from './components/produit-insert/produit-insert.component';
import { ListCommanderComponent } from './components/list-commander/list-commander.component';
import { CommanderInsertComponent } from './components/list-commander/commander-insert/commander-insert.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { UserInsertComponent } from './components/user-insert/user-insert.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MesCommandesComponent } from './components/mes-commandes/mes-commandes.component';
import { LeConsolComponent } from './components/le-consol/le-consol.component';


export function tokenGetter()
{
  //console.log("coucou");
  return sessionStorage.getItem('jwt');
}
@NgModule({
  declarations: [
    AppComponent,
    ListProduitComponent,
    AccueilComponent,
    NavComponent,
    ProduitDetailComponent,
    ProduitInsertComponent,
    ListCommanderComponent,
    CommanderInsertComponent,
    LoginFormComponent,
    UserInsertComponent,
    MesCommandesComponent,
    LeConsolComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["localhost:8080"]
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
