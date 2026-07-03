import type { ProposalLineItem } from '@shared/api/request-overview';
import { formatMoney } from '@shared/lib/format';
import { useTranslation } from 'react-i18next';
import { Group, Stack, Text } from '@mantine/core';

type RequestLineItemsProps = {
  lines: ProposalLineItem[];
};

export default function LineItems({ lines }: RequestLineItemsProps) {
  const { t } = useTranslation();

  return (
    <Stack gap={4} p="md" bg="gray.0">
      {lines.map((line) => (
        <Group key={line.id} justify="space-between" wrap="nowrap">
          <Text size="sm">{t('home.table.lineItem', { title: line.title, qty: line.qty })}</Text>
          <Text size="sm" fw={500}>
            {formatMoney(line.line, line.currency, { maximumFractionDigits: 2 })}
          </Text>
        </Group>
      ))}
    </Stack>
  );
}
