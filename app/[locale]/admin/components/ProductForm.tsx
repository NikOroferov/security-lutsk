'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './ProductForm.module.css';

interface ProductFormData {
  name: {
    ru: string;
    uk: string;
  };
  description: {
    ru: string;
    uk: string;
  };
  price: number;
  category: string;
  specifications: {
    ru: Array<{ name: string; value: string }>;
    uk: Array<{ name: string; value: string }>;
  };
  images: string[];
  mainImage: string;
  featured: boolean;
}

export default function ProductForm() {
  const t = useTranslations('admin.productForm');
  const [formData, setFormData] = useState<ProductFormData>({
    name: { ru: '', uk: '' },
    description: { ru: '', uk: '' },
    price: 0,
    category: '',
    specifications: { ru: [], uk: [] },
    images: [],
    mainImage: '',
    featured: false
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: string[] = [];
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Проверяем, что файл является изображением
      if (!file.type.startsWith('image/')) {
        console.error('File is not an image:', file.name);
        continue;
      }

      try {
        const base64 = await convertToBase64(file);
        newImages.push(base64);
      } catch (error) {
        console.error('Error converting image to base64:', error);
      }
    }

    // Обновляем состояние формы с новыми изображениями
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages],
      // Если это первое изображение, устанавливаем его как главное
      mainImage: prev.mainImage || newImages[0] || ''
    }));
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to create product');
      }

      // Reset form
      setFormData({
        name: { ru: '', uk: '' },
        description: { ru: '', uk: '' },
        price: 0,
        category: '',
        specifications: { ru: [], uk: [] },
        images: [],
        mainImage: '',
        featured: false
      });

      // TODO: Show success message
    } catch (error) {
      // TODO: Show error message
      console.error('Error creating product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{t('title')}</h2>

      <div className={styles.section}>
        <h3>{t('basicInfo')}</h3>
        
        <div className={styles.languageFields}>
          <div className={styles.field}>
            <label htmlFor="nameRu">{t('nameRu')}</label>
            <input
              type="text"
              id="nameRu"
              value={formData.name.ru}
              onChange={(e) => setFormData({
                ...formData,
                name: { ...formData.name, ru: e.target.value }
              })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="nameUk">{t('nameUk')}</label>
            <input
              type="text"
              id="nameUk"
              value={formData.name.uk}
              onChange={(e) => setFormData({
                ...formData,
                name: { ...formData.name, uk: e.target.value }
              })}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="price">{t('price')}</label>
          <input
            type="number"
            id="price"
            value={formData.price}
            onChange={(e) => setFormData({
              ...formData,
              price: Number(e.target.value)
            })}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="category">{t('category')}</label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({
              ...formData,
              category: e.target.value
            })}
            required
          />
        </div>
      </div>

      <div className={styles.section}>
        <h3>{t('description')}</h3>
        
        <div className={styles.languageFields}>
          <div className={styles.field}>
            <label htmlFor="descriptionRu">{t('descriptionRu')}</label>
            <textarea
              id="descriptionRu"
              value={formData.description.ru}
              onChange={(e) => setFormData({
                ...formData,
                description: { ...formData.description, ru: e.target.value }
              })}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="descriptionUk">{t('descriptionUk')}</label>
            <textarea
              id="descriptionUk"
              value={formData.description.uk}
              onChange={(e) => setFormData({
                ...formData,
                description: { ...formData.description, uk: e.target.value }
              })}
              required
            />
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3>{t('images')}</h3>
        <div className={styles.field}>
          <label htmlFor="images">{t('uploadImages')}</label>
          <input
            type="file"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
          />
          {formData.images.length > 0 && (
            <div className={styles.imagePreview}>
              {formData.images.map((image, index) => (
                <div key={index} className={styles.previewItem}>
                  <img src={image} alt={`Preview ${index + 1}`} />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index),
                        mainImage: prev.mainImage === image ? '' : prev.mainImage
                      }));
                    }}
                    className={styles.removeImage}
                  >
                    ×
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({
                        ...prev,
                        mainImage: image
                      }));
                    }}
                    className={`${styles.setMainImage} ${formData.mainImage === image ? styles.active : ''}`}
                  >
                    {formData.mainImage === image ? t('mainImage') : t('setAsMain')}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({
              ...formData,
              featured: e.target.checked
            })}
          />
          {t('featured')}
        </label>
      </div>

      <button type="submit" className={styles.submitButton}>
        {t('save')}
      </button>
    </form>
  );
} 