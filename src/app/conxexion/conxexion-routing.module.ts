import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConxexionPage } from './conxexion.page';

const routes: Routes = [
  {
    path: '',
    component: ConxexionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConxexionPageRoutingModule {}
