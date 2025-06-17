import { Routes } from '@angular/router';
import { PokemonPageComponent } from './components/pokemon-page/pokemon-page.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { TabsComponent } from './components/tabs/tabs.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tabs/home',
    pathMatch: 'full',
  },
  {
    path: 'tabs',
    component: TabsComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./home/home.page').then(m => m.HomePage),
      },
      {
        path: 'favorites',
        component: FavoritesComponent,
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'pokemon/:name',
    component: PokemonPageComponent,
  },
  // {
  //   path: '',
  //   component: TabsComponent
  // }
];
