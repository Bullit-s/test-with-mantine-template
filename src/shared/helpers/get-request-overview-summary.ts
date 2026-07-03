import type { ProposalLineItem, RequestOverviewItem } from '@shared/api/request-overview';
import i18n from '@/i18n';
import {
  getDisplayStatusKey,
  ORDER_STAGE_KEYS,
  REQUEST_STAGE_KEYS,
  STAGE_STATUS_MAP,
  type DisplayStatusKey,
  type RequestStageKey,
} from './customer-status';
import { formatMoney, formatRelativeDays } from '../lib/format';

const MOCK_EUR_TO_RUB_RATE = 100;

export type RequestOverviewSummary = {
  id: string;
  contractNumber: string;
  managerName: string;
  brand: string;
  product: string;
  qty: number;
  qtyUnits: string;
  proposalNumber: string;
  displayStatus: DisplayStatusKey;
  stageKey: RequestStageKey;
  hasOrder: boolean;
  unread: boolean;
  updatedLabel: string;
  shippingLabel: string;
  sumRub: number | null;
  sumLabel: string;
  proposalLines: ProposalLineItem[];
};

function getProposalTotalEur(proposalLines: ProposalLineItem[]): number {
  return proposalLines.reduce((sum, line) => sum + line.line, 0);
}

function getSumRub(request: RequestOverviewItem): number | null {
  if (request.invoiceTotalRub !== null) {
    return request.invoiceTotalRub;
  }

  if (request.proposalLines.length > 0) {
    return getProposalTotalEur(request.proposalLines) * MOCK_EUR_TO_RUB_RATE;
  }

  return null;
}

function getShippingLabel(request: RequestOverviewItem): string {
  if (!request.shippingMin && !request.shippingMax) {
    return '—';
  }

  return i18n.t('home.table.shippingRange', {
    min: request.shippingMin,
    max: request.shippingMax,
  });
}

export function getRequestOverviewSummary(request: RequestOverviewItem): RequestOverviewSummary {
  const sumRub = getSumRub(request);
  const stageKey = STAGE_STATUS_MAP[request.customerStatus];

  return {
    id: request.id,
    contractNumber: request.contractNumber,
    managerName: request.managerName,
    brand: request.brand,
    product: request.product,
    qty: request.qty,
    qtyUnits: request.qtyUnits,
    proposalNumber: request.proposalNumber,
    displayStatus: getDisplayStatusKey(request.customerStatus, request.invoicePaidPercent),
    stageKey,
    hasOrder: ORDER_STAGE_KEYS.includes(stageKey),
    unread: request.unread,
    updatedLabel: formatRelativeDays(request.changed),
    shippingLabel: getShippingLabel(request),
    sumRub,
    sumLabel: sumRub !== null ? formatMoney(sumRub, 'RUB') : '—',
    proposalLines: request.proposalLines,
  };
}

export type StageCounts = Record<RequestStageKey | 'all', { total: number; unread: number }>;

export function getStageCounts(requests: RequestOverviewItem[]): StageCounts {
  const counts = {
    all: { total: 0, unread: 0 },
  } as StageCounts;

  for (const stage of REQUEST_STAGE_KEYS) {
    counts[stage] = { total: 0, unread: 0 };
  }

  for (const request of requests) {
    const stage = STAGE_STATUS_MAP[request.customerStatus];
    counts[stage].total += 1;
    counts.all.total += 1;

    if (request.unread) {
      counts[stage].unread += 1;
      counts.all.unread += 1;
    }
  }

  return counts;
}

export function getStageShares(counts: StageCounts): Record<RequestStageKey, number> {
  const total = counts.all.total || 1;

  return REQUEST_STAGE_KEYS.reduce(
    (acc, stage) => {
      acc[stage] = (counts[stage].total / total) * 100;
      return acc;
    },
    {} as Record<RequestStageKey, number>
  );
}
