'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import AdminProductCard from './AdminProductCard';
import styles from './ProductList.module.css';

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

export default function ProductList() {
  const t = useTranslations('admin.productList');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t('confirmDelete'))) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  const handleEdit = (id: string) => {
    // TODO: Implement edit functionality
    console.log('Edit product:', id);
  };

  if (loading) return <div className={styles.loading}>{t('loading')}</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2>{t('title')}</h2>

      <div className={styles.header}>
        <div className={styles.headerCell}>{t('image')}</div>
        <div className={styles.headerCell}>{t('name')}</div>
        <div className={styles.headerCell}>{t('price')}</div>
        <div className={styles.headerCell}>{t('featured')}</div>
        <div className={styles.headerCell}>{t('actions')}</div>
      </div>

      <ul className={styles.list}>
        {products.map((product) => (
          <AdminProductCard
            key={product._id}
            product={product}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
} 