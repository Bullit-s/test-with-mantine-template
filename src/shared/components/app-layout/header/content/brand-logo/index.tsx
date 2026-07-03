import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Text, ThemeIcon } from '@mantine/core';
import styles from './styles.module.css';

export default function BrandLogo() {
  const { t } = useTranslation();

  return (
    <Link to="/" className={styles.plainLink}>
      <ThemeIcon
        size={34}
        radius={10}
        variant="gradient"
        gradient={{ from: '#3f92e6', to: '#1667c4', deg: 150 }}
      >
        <svg width={20} height={20} viewBox="0 0 24 24" fill="none">
          <path
            d="M15.5 7.5c-.6-1.3-1.9-2-3.6-2-2.2 0-3.7 1.1-3.7 2.8 0 1.6 1.2 2.3 3.3 2.8 2.4.5 3 .9 3 1.8 0 1-.9 1.6-2.3 1.6-1.5 0-2.5-.7-2.9-1.9"
            stroke="#fff"
            strokeWidth={1.8}
            strokeLinecap="round"
          />
        </svg>
      </ThemeIcon>

      <Text size="md" fw={600} c="dark" visibleFrom="lg" textWrap="nowrap">
        {t('app.brand')}
      </Text>
    </Link>
  );
}
