import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminerPage } from './terminer.page';

const routes: Routes = [
  {
    path: '',
    component: TerminerPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminerPageRoutingModule {}
