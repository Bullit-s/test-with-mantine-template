import type { CSSProperties, ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { AppShell, Avatar, Container, Group, Text } from '@mantine/core';
import styles from './styles.module.css';

const HEADER_HEIGHT = 56;

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation();

  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md">
      <AppShell.Header className={styles.header}>
        <Group h="100%" px="md" justify="space-between">
          <Group gap="lg">
            <Text component={Link} to="/" size="lg" className={styles.logo}>
              {t('app.brand')}
            </Text>

            <Text component={Link} to="/" size="sm" c="dimmed" style={{ textDecoration: 'none' }}>
              {t('nav.requests')}
            </Text>
          </Group>

          <Avatar radius="xl" color="blue">
            {t('layout.avatarFallback')}
          </Avatar>
        </Group>
      </AppShell.Header>

      <AppShell.Main
        className={styles.main}
        style={{ '--app-shell-header-height': `${HEADER_HEIGHT}px` } as CSSProperties}
      >
        <Container size="lg" p={0}>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
