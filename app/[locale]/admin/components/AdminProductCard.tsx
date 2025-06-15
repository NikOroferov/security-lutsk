'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import styles from './AdminProductCard.module.css';

interface Product {
  _id: string;
  name: {
    ru: string;
    uk: string;
  };
  price: number;
  mainImage: string;
  featured: boolean;
}

interface AdminProductCardProps {
  product: Product;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function AdminProductCard({ product, onEdit, onDelete }: AdminProductCardProps) {
  const t = useTranslations('admin.productList');

  return (
    <li className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={product.mainImage}
          alt={product.name.ru}
          width={50}
          height={50}
          className={styles.image}
        />
      </div>
      <div className={styles.name}>
        <div>{product.name.ru}</div>
        <div className={styles.nameUk}>{product.name.uk}</div>
      </div>
      <div className={styles.price}>{product.price} ₴</div>
      <div className={styles.featured}>
        {product.featured ? t('yes') : t('no')}
      </div>
      <div className={styles.actions}>
        <button
          className={styles.editButton}
          onClick={() => onEdit(product._id)}
        >
          {t('edit')}
        </button>
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(product._id)}
        >
          {t('delete')}
        </button>
      </div>
    </li>
  );
} 