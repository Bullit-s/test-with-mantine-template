import { useTranslation } from 'react-i18next';
import { Badge, Group, Text } from '@mantine/core';
import { TRACKER_STEP_KEYS } from '../model/constants';
import type { RequestCardSummary } from '../model/types';

type RequestCardHeaderProps = {
  request: RequestCardSummary;
};

export default function RequestCardHeader({ request }: RequestCardHeaderProps) {
  const { t } = useTranslation();

  return (
    <Group justify="space-between" align="flex-start" wrap="nowrap">
      <Group gap="sm" align="baseline">
        <Text fw={700} size="xl">
          {t('orders.requestNumber', { id: request.id })}
        </Text>

        <Text size="sm" c="dimmed">
          {request.createdLabel}
        </Text>
      </Group>

      <Group gap="sm" align="center">
        <Badge color="green" variant="light">
          {t(`orders.status.${TRACKER_STEP_KEYS[request.trackerStep]}`)}
        </Badge>

        <Text size="sm" c="dimmed">
          {request.managerName}
        </Text>
      </Group>
    </Group>
  );
}
