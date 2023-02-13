import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      {
        path: 'accueil',
        loadChildren: () => import('../Accueil/accueil.module').then(m => m.AccueilPageModule)
      },
      {
        path: 'terminer',
        loadChildren: () => import('../Terminer/terminer.module').then(m => m.TerminerPageModule)
      },
      {
        path: 'avenir/:id',
        loadChildren: () => import('../avenir/avenir.module').then(m => m.AvenirPageModule)
      },
      {
        path: 'challenge',
        loadChildren: () => import('../challenge/challenge.module').then( m => m.ChallengePageModule)
      },
      {
        path: 'details/:idChallenge1',
        loadChildren: () => import('../details-challenge/details-challenge.module').then( m => m.DetailsChallengePageModule)
      },

      {
        path: 'encours/:id',
        loadChildren: () => import('../encours/encours.module').then( m => m.EncoursPageModule)
      },
      {
        path: 'connexion',
        loadChildren: () => import('../conxexion/conxexion.module').then( m => m.ConxexionPageModule)
      },
      {
        path: '',
        redirectTo: '/menu/accueil',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/menu/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class MenuPageRoutingModule {}
