import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AvenirPage } from './avenir.page';

import { AvenirPageRoutingModule } from './avenir-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AvenirPageRoutingModule
  ],
  declarations: [AvenirPage]
})
export class AvenirPageModule {}
