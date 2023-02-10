import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccueilPage } from './accueil.page';

import { AccueilPageRoutingModule } from './accueil-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    
    AccueilPageRoutingModule
  ],
  declarations: [AccueilPage]
})
export class AccueilPageModule {}
