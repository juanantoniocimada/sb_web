import { RenderMode, ServerRoute } from '@angular/ssr';

// Configure server routes: prerender only static routes and ensure dynamic
// parameterized routes provide getPrerenderParams (returning empty array)
// so the prerenderer won't attempt to generate pages for every combination.
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
		// Mark as prerender mode but return no params so prerenderer skips generating pages
		renderMode: RenderMode.Prerender,
		getPrerenderParams: async () => {
			return [];
		},
	},
];
