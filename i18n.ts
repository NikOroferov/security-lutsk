import {notFound} from 'next/navigation';

export const locales = ['ru', 'uk'] as const;
export const defaultLocale = 'ru' as const;

export type Locale = (typeof locales)[number];

export function getMessages(locale: string) {
  try {
    return require(`./messages/${locale}.json`);
  } catch (error) {
    notFound();
  }
} 