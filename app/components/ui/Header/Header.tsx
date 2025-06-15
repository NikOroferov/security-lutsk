import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Security Shop Lutsk
        </Link>
        
        <nav className={styles.nav}>
          <Link href="/">Главная</Link>
          <Link href="/catalog">Каталог</Link>
          <Link href="/contacts">Контакты</Link>
          <Link href="/admin">Админ</Link>
        </nav>
      </div>
    </header>
  );
} 