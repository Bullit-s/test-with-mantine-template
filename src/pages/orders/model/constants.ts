export const TRACKER_STEP_KEYS = ['processing', 'proposal', 'delivery', 'completed'] as const;

export type TrackerStepKey = (typeof TRACKER_STEP_KEYS)[number];

export type TrackerStepIndex = 0 | 1 | 2 | 3;

export const NEXT_STEP_KEYS = [
  'awaitingProposal',
  'awaitingInvoice',
  'awaitingPayment',
  'paymentReceivedPreparingOrder',
  'inTransit',
  'requestCompleted',
] as const;

export type NextStepKey = (typeof NEXT_STEP_KEYS)[number];
