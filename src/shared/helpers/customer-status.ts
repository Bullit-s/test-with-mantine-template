import type { MantineColor } from '@mantine/core';

export const CUSTOMER_STATUS_KEYS = [
  'forming',
  'proposalPreparing',
  'clarificationToClient',
  'clarificationToSupplier',
  'proposalSent',
  'invoiceSent',
  'ordered',
  'partiallyInTransit',
  'inTransit',
  'partiallyShipped',
  'shipped',
  'cancelled',
] as const;

export type CustomerStatusKey = (typeof CUSTOMER_STATUS_KEYS)[number];

export const CUSTOMER_STATUS_BADGE_COLORS = {
  forming: 'orange',
  proposalPreparing: 'blue',
  clarificationToClient: 'orange',
  clarificationToSupplier: 'orange',
  proposalSent: 'blue',
  invoiceSent: 'blue',
  ordered: 'blue',
  partiallyInTransit: 'grape',
  inTransit: 'cyan',
  partiallyShipped: 'grape',
  shipped: 'green',
  cancelled: 'pink',
} as const satisfies Record<CustomerStatusKey, MantineColor>;

export type DisplayStatusKey = CustomerStatusKey | 'invoicePaid';

export const DISPLAY_STATUS_BADGE_COLORS = {
  ...CUSTOMER_STATUS_BADGE_COLORS,
  invoicePaid: 'green',
} as const satisfies Record<DisplayStatusKey, MantineColor>;

export function getDisplayStatusKey(
  status: CustomerStatusKey,
  invoicePaidPercent: number | null
): DisplayStatusKey {
  if (status === 'invoiceSent' && invoicePaidPercent === 100) {
    return 'invoicePaid';
  }

  return status;
}

export const REQUEST_STAGE_KEYS = [
  'processing',
  'clarification',
  'proposalSent',
  'toPay',
  'inTransit',
  'shipped',
  'cancelled',
] as const;

export type RequestStageKey = (typeof REQUEST_STAGE_KEYS)[number];

export const STAGE_CHIP_COLORS = {
  processing: 'indigo.4',
  clarification: 'orange.4',
  proposalSent: 'blue.4',
  toPay: 'yellow.4',
  inTransit: 'cyan.4',
  shipped: 'green.4',
  cancelled: 'pink.4',
} as const satisfies Record<RequestStageKey, MantineColor>;

export const ORDER_STAGE_KEYS: RequestStageKey[] = ['inTransit', 'shipped'];

export const STAGE_STATUS_MAP = {
  forming: 'processing',
  proposalPreparing: 'processing',
  clarificationToClient: 'clarification',
  clarificationToSupplier: 'clarification',
  proposalSent: 'proposalSent',
  invoiceSent: 'toPay',
  ordered: 'inTransit',
  partiallyInTransit: 'inTransit',
  inTransit: 'inTransit',
  partiallyShipped: 'shipped',
  shipped: 'shipped',
  cancelled: 'cancelled',
} as const satisfies Record<CustomerStatusKey, RequestStageKey>;
