import type { ReactNode } from 'react';
import { render as testingLibraryRender } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MantineProvider } from '@mantine/core';
import i18n from '@/i18n';
import { theme } from '@/styles/theme';

export function render(ui: ReactNode) {
  return testingLibraryRender(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <I18nextProvider i18n={i18n}>
        <MantineProvider theme={theme}>{children}</MantineProvider>
      </I18nextProvider>
    ),
  });
}
