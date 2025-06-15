'use client';

import { useTranslations } from 'next-intl';
import styles from './page.module.css';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

export default function AdminPage() {
  const t = useTranslations('admin');

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('title')}</h1>
      
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ProductForm />
        </div>
        
        <div className={styles.main}>
          <ProductList />
        </div>
      </div>
    </div>
  );
} 