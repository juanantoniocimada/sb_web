import { Routes } from '@angular/router';

export const routes: Routes = [
  /*
  {
    path: ':lang',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: ':lang/:origin/:destination',
    loadComponent: () => import('./pages/lines/lines.page').then((m) => m.LinesPage),
  },
  {
    path: ':lang/links',
    loadComponent: () => import('./pages/links/links.page').then((m) => m.LinksPage),
  },
  {
    path: '',
    redirectTo: 'es',
    pathMatch: 'full',
  },
  */

  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'links',
    loadComponent: () => import('./pages/links/links.page').then((m) => m.LinksPage),
  },
  
];
