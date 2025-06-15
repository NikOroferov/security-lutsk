import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './Header.module.css';

export default function Header() {
  const t = useTranslations('navigation');

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Security Shop Lutsk
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/">{t('home')}</Link>
          <Link href="/catalog">{t('catalog')}</Link>
          <Link href="/contacts">{t('contacts')}</Link>
          <Link href="/admin">{t('admin')}</Link>
        </nav>

        <div className={styles.languageSwitcher}>
          <Link href="/ru" locale="ru">RU</Link>
          <span className={styles.separator}>|</span>
          <Link href="/uk" locale="uk">UK</Link>
        </div>
      </div>
    </header>
  );
} 