import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { LeConsolComponent } from './components/le-consol/le-consol.component';
import { ListCommanderComponent } from './components/list-commander/list-commander.component';
import { ListProduitComponent } from './components/list-produit/list-produit.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { MesCommandesComponent } from './components/mes-commandes/mes-commandes.component';
import { ProduitDetailComponent } from './components/produit-detail/produit-detail.component';
import { ProduitInsertComponent } from './components/produit-insert/produit-insert.component';
import { UserInsertComponent } from './components/user-insert/user-insert.component';
import { AdminGuard } from './guard/admin.guard';
import { UserGuard } from './guard/user.guard';

const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: 'accueil', component: AccueilComponent },
  { path: 'list-produit', canActivate: [AdminGuard],component: ListProduitComponent},
  { path: 'detail/:id', component: ProduitDetailComponent},
  { path: 'produit/add', canActivate:[AdminGuard],component: ProduitInsertComponent },
  { path: 'list-commander', component:ListCommanderComponent},
  { path: 'login', component:LoginFormComponent},
  { path: 'user-insert', component:UserInsertComponent},
  { path: 'mes-commandes', canActivate:[UserGuard],component:MesCommandesComponent},
  { path: 'le-consol', canActivate:[AdminGuard], component: LeConsolComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
