import type { NextStepKey, TrackerStepIndex } from './constants';

export type RequestSummary = {
  id: string;
  createdLabel: string;
  products: RequestProductsSummary;
  trackerStep: TrackerStepIndex;
  money: RequestMoneySummary | null;
  nextStepKey: NextStepKey;
  managerName: string;
};

export type RequestMoneySummary = {
  issued: number;
  paid: number;
  paidPercent: number;
  currency: string;
};

export type RequestProductLine = {
  title: string;
  qty: number;
  unitsKey: string;
};

export type RequestProductsSummary =
  | { type: 'pending' }
  | { type: 'list'; items: RequestProductLine[] };
