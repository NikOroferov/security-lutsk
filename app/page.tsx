import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Верхний баннер */}
      <section className={styles.topBanner}>
        <div className={styles.bannerContent}>
          <h1 className={styles.bannerTitle}>Системы безопасности для вашего дома и бизнеса</h1>
          <p className={styles.bannerDescription}>
            Профессиональные решения для защиты вашей собственности
          </p>
          <a href="#contact" className={styles.bannerButton}>
            Получить консультацию
          </a>
        </div>
      </section>

      {/* Категории */}
      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>Наши категории</h2>
        <div className={styles.categoriesGrid}>
          <div className={styles.categoryCard}>
            <h3>Видеонаблюдение</h3>
            <ul className={styles.categoryList}>
              <li>IP-камеры</li>
              <li>Аналоговые камеры</li>
              <li>Видеорегистраторы</li>
              <li>Комплекты видеонаблюдения</li>
            </ul>
          </div>
          <div className={styles.categoryCard}>
            <h3>Сигнализация</h3>
            <ul className={styles.categoryList}>
              <li>Охранные системы</li>
              <li>Пожарная сигнализация</li>
              <li>Контроль доступа</li>
              <li>Датчики движения</li>
            </ul>
          </div>
          <div className={styles.categoryCard}>
            <h3>Сетевое оборудование</h3>
            <ul className={styles.categoryList}>
              <li>Коммутаторы</li>
              <li>Маршрутизаторы</li>
              <li>Кабели и разъемы</li>
              <li>Источники питания</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Почему выбирают нас</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>Профессиональный монтаж</h3>
            <p>Опытные специалисты выполнят установку любой сложности</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Гарантия качества</h3>
            <p>Все оборудование имеет официальную гарантию</p>
          </div>
          <div className={styles.featureCard}>
            <h3>Техническая поддержка</h3>
            <p>Круглосуточная помощь в решении любых вопросов</p>
          </div>
        </div>
      </section>

      {/* Услуги */}
      <section className={styles.services}>
        <h2 className={styles.sectionTitle}>Наши услуги</h2>
        <div className={styles.servicesList}>
          <div className={styles.serviceItem}>
            <h3>Проектирование</h3>
            <p>Разработка индивидуальных решений под ваши задачи</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>Монтаж</h3>
            <p>Установка и настройка оборудования любой сложности</p>
          </div>
          <div className={styles.serviceItem}>
            <h3>Обслуживание</h3>
            <p>Регулярное техническое обслуживание и ремонт</p>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className={styles.cta}>
        <div className={styles.ctaContent}>
          <h2>Готовы начать?</h2>
          <p>Свяжитесь с нами для бесплатной консультации</p>
          <a href="#contact" className={styles.ctaButton}>
            Связаться с нами
          </a>
        </div>
      </section>
    </div>
  );
} 