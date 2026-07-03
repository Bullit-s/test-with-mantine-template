import { useState } from 'react';
import type { RequestOverviewSummary } from '@shared/helpers';
import { IconChevronDown, IconFileTypePdf } from '@tabler/icons-react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { ActionIcon, Anchor, Collapse, Group, Table, Text, Tooltip } from '@mantine/core';
import LineItems from './line-items';
import StatusBadge from './status-badge';
import styles from './styles.module.css';

type RequestsTableRowProps = {
  request: RequestOverviewSummary;
  defaultOpened?: boolean;
};

export default function RequestsTableRow({
  request,
  defaultOpened = false,
}: RequestsTableRowProps) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(defaultOpened);
  const hasLines = request.proposalLines.length > 0;

  return (
    <>
      <Table.Tr
        className={hasLines ? styles.clickableRow : undefined}
        onClick={hasLines ? () => setOpened((value) => !value) : undefined}
      >
        <Table.Td>
          {request.hasOrder ? (
            <Link
              to="/orders/$id"
              params={{ id: request.id }}
              onClick={(event) => event.stopPropagation()}
            >
              <Anchor component="span" size="sm" fw={request.unread ? 700 : 400}>
                {request.contractNumber || request.id}
              </Anchor>
            </Link>
          ) : (
            <Text size="sm" fw={request.unread ? 700 : 400}>
              {request.contractNumber || request.id}
            </Text>
          )}
        </Table.Td>

        <Table.Td>
          <Text size="sm" c="dimmed">
            {request.proposalNumber || '—'}
          </Text>
        </Table.Td>

        <Table.Td>
          {request.proposalNumber ? (
            <Tooltip label={t('request.upd.downloadHint')} disabled={!request.proposalNumber}>
              <ActionIcon variant="subtle" color="dimmed" disabled={!request.proposalNumber}>
                <IconFileTypePdf size={18} stroke={1.6} />
              </ActionIcon>
            </Tooltip>
          ) : (
            '—'
          )}
        </Table.Td>

        <Table.Td>
          <Text size="sm">{request.product}</Text>
        </Table.Td>

        <Table.Td>
          <Text size="sm">{request.brand}</Text>
        </Table.Td>

        <Table.Td>
          <Text size="sm">
            {request.qty} {t('orders.units.pcs')}
          </Text>
        </Table.Td>

        <Table.Td>
          <Text size="sm" fw={500}>
            {request.sumLabel}
          </Text>
        </Table.Td>

        <Table.Td>
          <Text size="sm">{request.shippingLabel}</Text>
        </Table.Td>

        <Table.Td>
          <Group justify="space-between" wrap="nowrap">
            <StatusBadge status={request.displayStatus} />
            {hasLines ? (
              <IconChevronDown
                size={16}
                stroke={1.8}
                style={{ transform: opened ? 'rotate(180deg)' : undefined }}
              />
            ) : null}
          </Group>
        </Table.Td>
      </Table.Tr>

      {hasLines ? (
        <Table.Tr>
          <Table.Td colSpan={9} p={0}>
            <Collapse expanded={opened}>
              <LineItems lines={request.proposalLines} />
            </Collapse>
          </Table.Td>
        </Table.Tr>
      ) : null}
    </>
  );
}
