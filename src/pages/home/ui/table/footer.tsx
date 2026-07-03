import { useTranslation } from 'react-i18next';
import { Group, Text } from '@mantine/core';
import type { RequestStageKey } from '@shared/helpers';
import { formatMoney } from '@shared/lib/format';

type RequestsFooterProps = {
  count: number;
  stage: RequestStageKey | 'all';
  sumRub: number;
};

export default function RequestsFooter({ count, stage, sumRub }: RequestsFooterProps) {
  const { t } = useTranslation();

  return (
    <Group justify="space-between" px="md" py="sm">
      <Text size="sm" c="dimmed">
        {t('home.footer.summary', {
          count,
          stage: t(`home.stages.${stage}`),
          sum: formatMoney(sumRub, 'RUB'),
        })}
      </Text>
    </Group>
  );
}
