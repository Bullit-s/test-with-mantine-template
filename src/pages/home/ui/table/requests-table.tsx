import type { RequestOverviewSummary } from '@shared/helpers';
import { useTranslation } from 'react-i18next';
import { Table, Text } from '@mantine/core';
import RequestsTableRow from './table-row';

type RequestsTableProps = {
  items: RequestOverviewSummary[];
};

export default function RequestsTable({ items }: RequestsTableProps) {
  const { t } = useTranslation();

  if (items.length === 0) {
    return (
      <Text c="dimmed" ta="center" py="xl">
        {t('home.empty')}
      </Text>
    );
  }

  const firstUnreadId = items.find((item) => item.unread)?.id ?? items[0]?.id;

  return (
    <Table.ScrollContainer minWidth={960}>
      <Table verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>{t('home.table.headers.request')}</Table.Th>
            <Table.Th>{t('home.table.headers.proposal')}</Table.Th>
            <Table.Th>{t('home.table.headers.proposalPdf')}</Table.Th>
            <Table.Th>{t('home.table.headers.product')}</Table.Th>
            <Table.Th>{t('home.table.headers.brand')}</Table.Th>
            <Table.Th>{t('home.table.headers.qty')}</Table.Th>
            <Table.Th>{t('home.table.headers.sum')}</Table.Th>
            <Table.Th>{t('home.table.headers.shippingTerm')}</Table.Th>
            <Table.Th>{t('home.table.headers.status')}</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {items.map((item) => (
            <RequestsTableRow
              key={item.id}
              request={item}
              defaultOpened={item.id === firstUnreadId}
            />
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
}
