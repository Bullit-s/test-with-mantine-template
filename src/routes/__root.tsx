import '@mantine/core/styles.css';

import { AppLayout } from '@shared/components';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { MantineProvider } from '@mantine/core';
import { theme } from '../theme';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <MantineProvider theme={theme}>
      <AppLayout>
        <Outlet />
      </AppLayout>

      {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
    </MantineProvider>
  );
}
