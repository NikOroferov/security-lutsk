import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale,
  
  // Отключаем префикс локали для URL
  localePrefix: 'always'
});

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/', '/(ru|uk)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)']
}; 