import { TRACKER_STEP_BADGE_COLORS, TRACKER_STEP_KEYS, type RequestSummary } from '@shared/helpers';
import { useTranslation } from 'react-i18next';
import { Badge, Group, Text } from '@mantine/core';

type RequestHeaderProps = {
  summary: RequestSummary;
};

export default function RequestHeader({ summary }: RequestHeaderProps) {
  const { t } = useTranslation();

  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap">
      <Group gap="sm" align="baseline">
        <Text fw={700} size="xl">
          {t('orders.requestNumber', { id: summary.id })}
        </Text>

        <Text size="sm" c="dimmed">
          {summary.createdLabel}
        </Text>
      </Group>

      <Group gap="sm" align="center">
        <Badge color={TRACKER_STEP_BADGE_COLORS[TRACKER_STEP_KEYS[summary.trackerStep]]} variant="light">
          {t(`orders.status.${TRACKER_STEP_KEYS[summary.trackerStep]}`)}
        </Badge>

        <Text size="sm" c="dimmed">
          {summary.managerName}
        </Text>
      </Group>
    </Group>
  );
}
