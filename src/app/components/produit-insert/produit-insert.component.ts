import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/produit.model';
import { Typeproduit } from 'src/app/models/typeproduit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { TypeproduitService } from 'src/app/services/typeproduit.service';

@Component({
  selector: 'app-produit-insert',
  templateUrl: './produit-insert.component.html',
  styleUrls: ['./produit-insert.component.scss']
})
export class ProduitInsertComponent implements OnInit {
  produit$: Produit;
  produitform: FormGroup;
  listTypeproduit$!: Observable<Typeproduit[]>;

  constructor(private _service : ProduitService,
              private _activate : ActivatedRoute,
              private _router : Router,
              private builder: FormBuilder,
              private _tpservice : TypeproduitService) {
              
                this.produitform = builder.group({
                  libelle: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
                  prix: new FormControl(0, [Validators.required, Validators.min(1)]),      
                  description: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(140)]),
                  typeproduit_id : new FormControl(undefined, [Validators.required, Validators.min(1)] )
                });

     }

  ngOnInit(): void {
    this.listTypeproduit$ = this._tpservice.getAll(); 
  }
  submit(): void{

    //if(this.produitform.valid){

      let sub = this._service.insertOne(this.produitform.value ).subscribe({
                  next :(produit) =>{ alert("le produit a bien été ajouté")
                                      this._router.navigateByUrl("/list-produit"); 
                                    },
                  error :(err)=>{console.error(err)},
                  complete : () =>{ sub.unsubscribe} 
      });
    //}

  }
}
