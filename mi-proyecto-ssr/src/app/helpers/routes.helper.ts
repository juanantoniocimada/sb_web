export const ROUTE_CONFIG = {
  HOME: '',
  LINES: ':lang/bus/:origin/:destination',
  LINKS: ':lang/links'
} as const;

export const ROUTE_PATHS = {
  home: (lang: string = 'en') => `/${lang}`,
  
  lines: (origin: string, destination: string, date?: string, time?: string, lang: string = 'en') => {
    const base = `/${lang}/bus/${origin}/${destination}`;
    const params = new URLSearchParams();
    if (date) params.set('date', date);
    if (time) params.set('time', time);
    return params.toString() ? `${base}?${params}` : base;
  },
  
  links: (lang: string = 'en') => `/${lang}/links`
};
