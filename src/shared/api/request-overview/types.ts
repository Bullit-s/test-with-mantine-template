import type { CustomerStatusKey } from '@shared/helpers/customer-status';

export type ProposalLineItem = {
  id: string;
  title: string;
  qty: number;
  currency: string;
  unit: number;
  line: number;
};

export type RequestOverviewItem = {
  id: string;
  contractNumber: string;
  changed: number;
  customerStatus: CustomerStatusKey;
  isCancelled: boolean;
  unread: boolean;
  managerName: string;
  brand: string;
  product: string;
  qty: number;
  qtyUnits: string;
  shippingMin: number;
  shippingMax: number;
  proposalNumber: string;
  proposalLines: ProposalLineItem[];
  invoiceTotalRub: number | null;
  invoicePaidPercent: number | null;
};

export type RequestOverviewCustomer = {
  name: string;
  company: string;
};

export type RequestOverviewResponse = {
  customer: RequestOverviewCustomer;
  requests: RequestOverviewItem[];
};
