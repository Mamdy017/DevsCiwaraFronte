import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EncoursPageRoutingModule } from './encours-routing.module';

import { EncoursPage } from './encours.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EncoursPageRoutingModule
  ],
  declarations: [EncoursPage]
})
export class EncoursPageModule {}
