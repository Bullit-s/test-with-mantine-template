import type { ReactNode } from 'react';
import type { KpiSummary } from '@shared/helpers';
import { formatMoney } from '@shared/lib/format';
import { useTranslation } from 'react-i18next';
import { Box, Group, Paper, Text } from '@mantine/core';

type KpiStripProps = {
  kpi: KpiSummary;
};

type KpiItemProps = {
  dotColor: string;
  label: string;
  value: string;
};

function KpiItem({ dotColor, label, value }: KpiItemProps): ReactNode {
  return (
    <Group gap={8} wrap="nowrap">
      <Box w={8} h={8} bg={dotColor} bdrs="50%" flex="0 0 auto" />

      <div>
        <Text size="xs" c="dimmed">
          {label}
        </Text>
        <Text size="lg" fw={700}>
          {value}
        </Text>
      </div>
    </Group>
  );
}

export default function KpiStrip({ kpi }: KpiStripProps) {
  const { t } = useTranslation();

  return (
    <Paper withBorder radius="md" p="md">
      <Group gap="xl" wrap="wrap">
        <KpiItem
          dotColor="blue.5"
          label={t('home.overview.kpi.issued')}
          value={formatMoney(kpi.issuedRub, 'RUB')}
        />
        <KpiItem
          dotColor="green.5"
          label={t('home.overview.kpi.paid')}
          value={formatMoney(kpi.paidRub, 'RUB')}
        />
        <KpiItem
          dotColor="orange.5"
          label={t('home.overview.kpi.duePay')}
          value={formatMoney(kpi.duePayRub, 'RUB')}
        />
      </Group>
    </Paper>
  );
}
