import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EncoursPage } from './encours.page';

const routes: Routes = [
  {
    path: '',
    component: EncoursPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EncoursPageRoutingModule {}
