import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav'; 
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
 

const MATERIALS = [  MatFormFieldModule,
                     MatInputModule, 
                     MatButtonModule,
                     MatSelectModule,
                     MatOptionModule,
                     MatCheckboxModule,
                     MatExpansionModule,
                     MatSidenavModule,
                     MatIconModule,
                     MatCardModule
                     
                    ]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,MATERIALS
  
  ],
  exports: [MATERIALS]
})

export class SharedModule { }
