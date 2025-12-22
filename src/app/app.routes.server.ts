import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'links',
    renderMode: RenderMode.Prerender,
  },
  {
    path: ':lang/:origin/:destination',
    // Al no especificar 'renderMode', se usará SSR dinámico por defecto.
    // Esto evita el error de pre-renderizado en rutas dinámicas.
  },
];
