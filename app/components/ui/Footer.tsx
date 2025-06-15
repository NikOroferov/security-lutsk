import { useTranslations } from 'next-intl';
import styles from './Footer.module.css';

export default function Footer() {
  const t = useTranslations('contact');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.section}>
          <h3>{t('title')}</h3>
          <p>{t('address')}: ул. Примерная, 123, Луцк</p>
          <p>{t('phone')}: +38 (050) 123-45-67</p>
          <p>{t('email')}: info@security-shop-lutsk.com</p>
          <p>{t('workingHours')}: Пн-Пт 9:00 - 18:00</p>
        </div>

        <div className={styles.section}>
          <h3>Социальные сети</h3>
          <div className={styles.social}>
            <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>

        <div className={styles.section}>
          <h3>Карта сайта</h3>
          <nav className={styles.sitemap}>
            <a href="/">Главная</a>
            <a href="/catalog">Каталог</a>
            <a href="/contacts">Контакты</a>
            <a href="/admin">Админ</a>
          </nav>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; 2024 Security Shop Lutsk. Все права защищены.</p>
      </div>
    </footer>
  );
} 