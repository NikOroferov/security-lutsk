import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

export default function ProductCard({ id, name, price, image, slug }: ProductCardProps) {
  const t = useTranslations('product');

  return (
    <div className={styles.card}>
      <Link href={`/products/${slug}`} className={styles.imageContainer}>
        <Image
          src={image}
          alt={name}
          width={300}
          height={200}
          className={styles.image}
        />
      </Link>
      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{price} ₴</p>
        <button className={styles.contactButton}>
          {t('contactSeller')}
        </button>
      </div>
    </div>
  );
} 