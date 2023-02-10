import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvenirPage } from './avenir.page';

const routes: Routes = [
  {
    path: '',
    component: AvenirPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AvenirPageRoutingModule {}
