import type { CSSProperties, ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { Footer } from './footer';
import { Header } from './header';
import styles from './styles.module.css';

const HEADER_HEIGHT = 64;

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <AppShell header={{ height: HEADER_HEIGHT }} padding="md">
      <AppShell.Header className={styles.header}>
        <Header />
      </AppShell.Header>

      <AppShell.Main
        className={styles.main}
        style={{ '--app-shell-header-height': `${HEADER_HEIGHT}px` } as CSSProperties}
      >
        <div className={styles.content}>{children}</div>
        <Footer />
      </AppShell.Main>
    </AppShell>
  );
}
