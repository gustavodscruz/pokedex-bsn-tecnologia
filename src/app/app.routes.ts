import { Routes } from '@angular/router';
import { PokemonPageComponent } from './components/pokemon-page/pokemon-page.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'pokemon/:name',
    component: PokemonPageComponent
  }
];
