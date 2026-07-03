import { useTranslation } from 'react-i18next';
import { Avatar, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';
import type { ManagerSummary } from '@shared/helpers';

type ManagerCardsProps = {
  managers: ManagerSummary[];
};

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

export default function ManagerCards({ managers }: ManagerCardsProps) {
  const { t } = useTranslation();

  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        <Title order={5}>{t('home.overview.managers.title')}</Title>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          {managers.map((manager) => (
            <Group key={manager.email} gap="sm" wrap="nowrap">
              <Avatar radius="xl" color="blue">
                {getInitials(manager.name)}
              </Avatar>

              <div>
                <Text size="sm" fw={600}>
                  {manager.name}
                </Text>
                <Text size="xs" c="dimmed">
                  {manager.role}
                </Text>
                <Text size="xs" c="dimmed">
                  {t('home.overview.managers.activeRequests', { count: manager.activeRequests })}
                </Text>
              </div>
            </Group>
          ))}
        </SimpleGrid>
      </Stack>
    </Paper>
  );
}
