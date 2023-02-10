import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import Swiper from 'swiper';


import { DetailsChallengePageRoutingModule } from './details-challenge-routing.module';

import { DetailsChallengePage } from './details-challenge.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsChallengePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [DetailsChallengePage]
})
export class DetailsChallengePageModule {}
