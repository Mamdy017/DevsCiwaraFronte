import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailsChallengePage } from './details-challenge.page';

const routes: Routes = [
  {
    path: '',
    component: DetailsChallengePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailsChallengePageRoutingModule {}
