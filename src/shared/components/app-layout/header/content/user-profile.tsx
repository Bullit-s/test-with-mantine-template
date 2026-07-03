import {
  IconChevronDownFilled,
  IconFileText,
  IconHeadset,
  IconLogout,
  IconUserCircle,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Avatar, Box, Group, Menu, Stack, Text, UnstyledButton } from '@mantine/core';
import { useHeaderCounts } from '../use-header-counts';

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

export default function UserProfile() {
  const { t } = useTranslation();
  const { customer } = useHeaderCounts();

  if (!customer) {
    return null;
  }

  return (
    <Menu position="bottom-end" withArrow shadow="md">
      <Menu.Target>
        <UnstyledButton aria-label={customer.name}>
          <Group gap="sm" wrap="nowrap">
            <Stack gap={0} maw={160} visibleFrom="md">
              <Text size="sm" fw={500} truncate="end">
                {customer.name}
              </Text>

              <Text size="xs" c="dimmed" truncate="end">
                {customer.company}
              </Text>
            </Stack>

            <Group gap={0} wrap="nowrap" align="center">
              <Avatar radius="xl" color="blue" size="md">
                {getInitials(customer.name)}
              </Avatar>

              <Box visibleFrom="md" h={18}>
                <IconChevronDownFilled size={18} />
              </Box>
            </Group>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown miw={220}>
        <Stack gap={0} px="sm" py={6} maw={220} hiddenFrom="md">
          <Text size="sm" fw={500} truncate="end">
            {customer.name}
          </Text>
          <Text size="xs" c="dimmed" truncate="end">
            {customer.company}
          </Text>
        </Stack>

        <Menu.Divider hiddenFrom="md" />

        <Menu.Item leftSection={<IconUserCircle size={16} stroke={1.8} />} disabled>
          {t('header.profile.profile')}
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={16} stroke={1.8} />} disabled>
          {t('header.profile.documents')}
        </Menu.Item>
        <Menu.Item leftSection={<IconHeadset size={16} stroke={1.8} />} disabled>
          {t('header.profile.support')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item color="red" leftSection={<IconLogout size={16} stroke={1.8} />} disabled>
          {t('header.profile.logout')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
