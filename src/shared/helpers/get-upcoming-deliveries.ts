import type { RequestOverviewItem } from '@shared/api/request-overview';
import { STAGE_STATUS_MAP } from './customer-status';

const WEEK_SECONDS = 7 * 24 * 60 * 60;
const DAY_SECONDS = 24 * 60 * 60;

export type DeliveryEstimate = {
  id: string;
  contractNumber: string;
  product: string;
  brand: string;
  daysLeft: number;
};

export function getUpcomingDeliveries(
  requests: RequestOverviewItem[],
  limit = 5
): DeliveryEstimate[] {
  const nowSeconds = Date.now() / 1000;

  return requests
    .filter((request) => {
      const stage = STAGE_STATUS_MAP[request.customerStatus];
      return stage !== 'shipped' && stage !== 'cancelled';
    })
    .map((request) => {
      const estimatedDate = request.changed + request.shippingMax * WEEK_SECONDS;

      return {
        id: request.id,
        contractNumber: request.contractNumber,
        product: request.product,
        brand: request.brand,
        daysLeft: Math.round((estimatedDate - nowSeconds) / DAY_SECONDS),
      };
    })
    .sort((a, b) => a.daysLeft - b.daysLeft)
    .slice(0, limit);
}
