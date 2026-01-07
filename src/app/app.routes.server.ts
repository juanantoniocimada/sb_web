import { RenderMode, ServerRoute } from '@angular/ssr';

// Configure server routes: prerender only static routes and ensure dynamic
// parameterized routes provide getPrerenderParams (returning empty array)
// so the prerenderer won't attempt to generate pages for every combination.
export const serverRoutes: ServerRoute[] = [
	{
		path: '',
		renderMode: RenderMode.Server,
	},
	{
		path: 'links',
		renderMode: RenderMode.Server,
	},
	{
		path: 'bus/:origin/:destination',
		renderMode: RenderMode.Server,
	},
];
