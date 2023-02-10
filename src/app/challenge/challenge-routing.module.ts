import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChallengePage } from './challenge.page';

const routes: Routes = [
  {
    path: '',
    component: ChallengePage
  },
  {
    path: 'terminer',
    loadChildren: () => import('../Terminer/terminer.module').then(m => m.TerminerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChallengePageRoutingModule {}
