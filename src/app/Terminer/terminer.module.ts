import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TerminerPage } from './terminer.page';

import { TerminerPageRoutingModule } from './terminer-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TerminerPageRoutingModule
  ],
  declarations: [TerminerPage]
})
export class TerminerPageModule {}
