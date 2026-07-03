import { useTranslation } from 'react-i18next';
import { Badge, Group, Paper, Stack, Text, Title } from '@mantine/core';
import type { DeliveryEstimate } from '@shared/helpers';

type UpcomingDeliveriesProps = {
  items: DeliveryEstimate[];
};

export default function UpcomingDeliveries({ items }: UpcomingDeliveriesProps) {
  const { t } = useTranslation();

  return (
    <Paper withBorder radius="md" p="md" h="100%">
      <Stack gap="sm">
        <Title order={5}>{t('home.overview.deliveries.title')}</Title>

        {items.length === 0 ? (
          <Text size="sm" c="dimmed">
            {t('home.overview.deliveries.empty')}
          </Text>
        ) : (
          <Stack gap={6}>
            {items.map((item) => {
              const color = item.daysLeft < 0 ? 'red' : item.daysLeft <= 7 ? 'orange' : 'gray';
              const label =
                item.daysLeft < 0
                  ? t('home.overview.deliveries.overdue', { count: Math.abs(item.daysLeft) })
                  : item.daysLeft === 0
                    ? t('home.overview.deliveries.today')
                    : t('home.overview.deliveries.daysLeft', { count: item.daysLeft });

              return (
                <Group key={item.id} justify="space-between" wrap="nowrap" gap="sm">
                  <Group gap={6} wrap="nowrap" miw={0}>
                    <Text size="sm" fw={500} truncate="end">
                      {item.contractNumber || item.id}
                    </Text>

                    <Text size="sm" c="dimmed" truncate="end">
                      {item.brand} {item.product}
                    </Text>
                  </Group>

                  <Badge color={color} variant="light" size="sm">
                    {label}
                  </Badge>
                </Group>
              );
            })}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
}
