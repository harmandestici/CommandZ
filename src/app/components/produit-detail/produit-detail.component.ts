import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/produit.model';
import { Typeproduit } from 'src/app/models/typeproduit.model';
import { ProduitService } from 'src/app/services/produit.service';
import { TypeproduitService } from 'src/app/services/typeproduit.service';

@Component({
  selector: 'app-produit-detail',
  templateUrl: './produit-detail.component.html',
  styleUrls: ['./produit-detail.component.scss']
})
export class ProduitDetailComponent implements OnInit {
  id : number ;
  produit$: Produit;
  produitform: FormGroup;
  listTypeproduit$!: Observable<Typeproduit[]>;

   // produitform = new FormGroup({
      //             libelle : new FormControl(''),
      //             description : new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
      //             prix : new FormControl(0, [Validators.required, Validators.min(0)])
      //       });
  

  constructor(private _service : ProduitService,
              private _activate : ActivatedRoute,
              private _router : Router,
              private builder: FormBuilder,
              private _tpservice : TypeproduitService  ) { 

      this.produitform = builder.group({
        libelle: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]),
        prix: new FormControl(0, [Validators.required, Validators.min(0)]),      
        description: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(140)]),
        typeproduit_id : new FormControl(undefined, [Validators.required, Validators.min(1)] )
      });
          
   }

  ngOnInit(): void {
    this.id = this._activate.snapshot.params["id"];
    let sub = this._service.getOne(this.id).subscribe({
         next :(produit)=> {this.produit$ = produit;
                            this.listTypeproduit$ = this._tpservice.getAll(); 
                            this.produitform.patchValue({"libelle":this.produit$.libelle,
                                                         "prix":this.produit$.prix,
                                                         "description":this.produit$.description,
                                                        "typeproduit_id":this.produit$.typeproduit.id});
                                                      
                                                        },
         error :(err)=>{console.error(err)},
         complete :() =>{ sub.unsubscribe} 
    });

  }

  submit(): void{

    //if(this.produitform.valid){

      let sub = this._service.updateOne(this.produitform.value, this.id ).subscribe({
                  next :(produit) =>{ alert("le produit a bien été modifié {" + this.id + "}")
                                      this._router.navigateByUrl("/list-produit"); 
                                    },
                  error :(err)=>{console.error(err)},
                  complete : () =>{ sub.unsubscribe} 
      });
    //}

  }

}
