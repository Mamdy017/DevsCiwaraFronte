import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AwaitComponent } from './await/await.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:"await",
    pathMatch:'full'
  },
  {
    path: '',
    loadChildren: () => import('./Menu/menu.module').then(m => m.MenuPageModule)
  },
  {
    path: 'conxexion',
    loadChildren: () => import('./conxexion/conxexion.module').then( m => m.ConxexionPageModule)
  },
  {
    path: 'inscription',
    loadChildren: () => import('./inscription/inscription.module').then( m => m.InscriptionPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'new-password',
    loadChildren: () => import('./new-password/new-password.module').then( m => m.NewPasswordPageModule)
  }
  ,
  {
    path: 'await',
   component:AwaitComponent
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
