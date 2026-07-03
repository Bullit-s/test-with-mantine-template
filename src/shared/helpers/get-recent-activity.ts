import type { RequestOverviewItem } from '@shared/api/request-overview';
import { formatRelativeDays } from '../lib/format';
import { getDisplayStatusKey, type DisplayStatusKey } from './customer-status';

export type ActivityItem = {
  id: string;
  contractNumber: string;
  displayStatus: DisplayStatusKey;
  updatedLabel: string;
  unread: boolean;
};

export function getRecentActivity(requests: RequestOverviewItem[], limit = 5): ActivityItem[] {
  return [...requests]
    .sort((a, b) => b.changed - a.changed)
    .slice(0, limit)
    .map((request) => ({
      id: request.id,
      contractNumber: request.contractNumber,
      displayStatus: getDisplayStatusKey(request.customerStatus, request.invoicePaidPercent),
      updatedLabel: formatRelativeDays(request.changed),
      unread: request.unread,
    }));
}
