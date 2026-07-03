import { IconBell } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Button, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';

export default function Notifications() {
  const { t } = useTranslation();

  return (
    <Menu position="bottom-end" withArrow shadow="md">
      <Menu.Target>
        <UnstyledButton c="gray.6">
          <Group gap={6} wrap="nowrap" c="gray.6">
            <IconBell size={24} stroke={1.8} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown maw={320}>
        <Stack align="center" gap="xs" py="lg" px="md" miw={240}>
          <IconBell size={40} stroke={1.5} color="var(--mantine-color-blue-4)" />

          <Text size="sm" c="dimmed" ta="center">
            {t('header.notifications.empty')}
          </Text>

          <Button mt={8}>{t('header.notifications.settings')}</Button>
        </Stack>
      </Menu.Dropdown>
    </Menu>
  );
}
