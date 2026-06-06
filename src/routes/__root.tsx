import '@mantine/core/styles.css';

import { AppLayout } from '@shared/components';
import { queryClient } from '@shared/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { MantineProvider } from '@mantine/core';
import { theme } from '../styles/theme';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <AppLayout>
          <Outlet />

          {import.meta.env.DEV ? <TanStackRouterDevtools position="bottom-right" /> : null}
        </AppLayout>
      </MantineProvider>
    </QueryClientProvider>
  );
}
