import type { RequestOverviewItem } from '@shared/api/request-overview';

export type KpiSummary = {
  issuedRub: number;
  paidRub: number;
  duePayRub: number;
};

export function getKpiSummary(requests: RequestOverviewItem[]): KpiSummary {
  return requests.reduce<KpiSummary>(
    (acc, request) => {
      if (request.invoiceTotalRub === null) {
        return acc;
      }

      const paid = request.invoiceTotalRub * ((request.invoicePaidPercent ?? 0) / 100);

      acc.issuedRub += request.invoiceTotalRub;
      acc.paidRub += paid;
      acc.duePayRub += request.invoiceTotalRub - paid;

      return acc;
    },
    { issuedRub: 0, paidRub: 0, duePayRub: 0 }
  );
}
