import { formatMoney } from '@shared/lib/format';
import { useTranslation } from 'react-i18next';
import { Group, Text } from '@mantine/core';
import type { RequestMoneySummary } from '../model/types';

type RequestCardMoneyProps = {
  money: RequestMoneySummary;
};

export default function RequestCardMoney({ money }: RequestCardMoneyProps) {
  const { t } = useTranslation();

  return (
    <Group gap="xl">
      <div>
        <Text size="xs" c="dimmed">
          {t('orders.money.issued')}
        </Text>
        <Text fw={600}>{formatMoney(money.issued, money.currency)}</Text>
      </div>

      <div>
        <Text size="xs" c="dimmed">
          {t('orders.money.paid')}
        </Text>

        <Text fw={600}>{formatMoney(money.paid, 'RUB')}</Text>
      </div>

      <div>
        <Text size="xs" c="dimmed">
          {t('orders.money.percent')}
        </Text>

        <Text fw={600}>{money.paidPercent}%</Text>
      </div>
    </Group>
  );
}
