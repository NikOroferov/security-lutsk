import { useTranslations } from 'next-intl';
import styles from './ContactModal.module.css';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const t = useTranslations('contact');

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        
        <h2>{t('title')}</h2>
        
        <div className={styles.content}>
          <div className={styles.info}>
            <p><strong>{t('address')}:</strong> ул. Примерная, 123, Луцк</p>
            <p><strong>{t('phone')}:</strong> +38 (050) 123-45-67</p>
            <p><strong>{t('email')}:</strong> info@security-shop-lutsk.com</p>
            <p><strong>{t('workingHours')}:</strong> Пн-Пт 9:00 - 18:00</p>
          </div>

          <div className={styles.map}>
            {/* Здесь будет карта */}
            <div className={styles.mapPlaceholder}>
              {t('location')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 