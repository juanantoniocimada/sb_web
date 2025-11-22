import { Routes } from '@angular/router';
import { ROUTE_CONFIG } from './helpers/routes.helper';

export const routes: Routes = [
  {
    path: ROUTE_CONFIG.HOME,
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: ROUTE_CONFIG.LINES,
    loadComponent: () => import('./pages/lines/lines.page').then((m) => m.LinesPage),
  },
  {
    path: ROUTE_CONFIG.LINKS,
    loadComponent: () => import('./pages/links/links.page').then((m) => m.LinksPage),
  },
  {
    path: '',
    redirectTo: ROUTE_CONFIG.HOME,
    pathMatch: 'full',
  },
];
