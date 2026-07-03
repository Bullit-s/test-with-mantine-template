import type { ActivityItem } from '@shared/helpers';
import { useTranslation } from 'react-i18next';
import { Box, Group, Paper, Stack, Text, Title } from '@mantine/core';

type RecentActivityProps = {
  items: ActivityItem[];
};

export default function RecentActivity({ items }: RecentActivityProps) {
  const { t } = useTranslation();

  return (
    <Paper withBorder radius="md" p="md" h="100%">
      <Stack gap="sm">
        <Title order={5}>{t('home.overview.activity.title')}</Title>

        {items.length === 0 ? (
          <Text size="sm" c="dimmed">
            {t('home.overview.activity.empty')}
          </Text>
        ) : (
          <Stack gap={6}>
            {items.map((item) => (
              <Group key={item.id} justify="space-between" wrap="nowrap" gap="sm">
                <Group gap={6} wrap="nowrap" miw={0}>
                  {item.unread ? <Box w={6} h={6} bg="red.5" bdrs="50%" flex="0 0 auto" /> : null}

                  <Text size="sm" fw={item.unread ? 600 : 400} truncate="end">
                    {item.contractNumber || item.id}
                  </Text>

                  <Text size="sm" c="dimmed" truncate="end">
                    {t(`home.statusNote.${item.displayStatus}`)}
                  </Text>
                </Group>

                <Text size="xs" c="dimmed" flex="0 0 auto">
                  {item.updatedLabel}
                </Text>
              </Group>
            ))}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
