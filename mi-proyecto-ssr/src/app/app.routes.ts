import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: ':origin/:destination',
    loadComponent: () => import('./pages/lines/lines.page').then((m) => m.LinesPage),
  },
  {
    path: 'links',
    loadComponent: () => import('./pages/links/links.page').then((m) => m.LinksPage),
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];
