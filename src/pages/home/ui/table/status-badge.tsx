import { DISPLAY_STATUS_BADGE_COLORS, type DisplayStatusKey } from '@shared/helpers';
import { useTranslation } from 'react-i18next';
import { Badge, Stack, Text } from '@mantine/core';

type StatusBadgeProps = {
  status: DisplayStatusKey;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { t } = useTranslation();

  return (
    <Stack gap={2}>
      <Badge color={DISPLAY_STATUS_BADGE_COLORS[status]} variant="light">
        {t(`home.status.${status}`)}
      </Badge>

      <Text size="xs" c="dimmed">
        {t(`home.statusNote.${status}`)}
      </Text>
    </Stack>
  );
}
