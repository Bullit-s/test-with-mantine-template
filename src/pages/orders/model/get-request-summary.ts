import {
  getActiveInvoiceProducts,
  getInvoiceCurrency,
  getInvoiceTotal,
  type RequestAggregate,
} from '@shared/api/cabinet';
import { formatUnixDate } from '@shared/lib/format';
import type { NextStepKey, TrackerStepIndex } from './constants';
import type { RequestCardSummary, RequestMoneySummary, RequestProductsSummary } from './types';

function getTrackerStep(request: RequestAggregate): TrackerStepIndex {
  if (request.upds.length > 0) {
    return 3;
  }

  if (request.orders.length > 0) {
    return 2;
  }

  if (request.invoices.length > 0 || request.proposals.length > 0) {
    return 1;
  }

  return 0;
}

function getNextStepKey(request: RequestAggregate, trackerStep: TrackerStepIndex): NextStepKey {
  const invoice = request.invoices.at(-1);

  if (trackerStep === 0) {
    return 'awaitingProposal';
  }

  if (trackerStep === 1) {
    if (!invoice) {
      return 'awaitingInvoice';
    }

    if (invoice.paid < 100) {
      return 'awaitingPayment';
    }

    return 'paymentReceivedPreparingOrder';
  }

  if (trackerStep === 2) {
    return 'inTransit';
  }

  return 'requestCompleted';
}

function getMoneySummary(request: RequestAggregate): RequestMoneySummary | null {
  const invoice = request.invoices.at(-1);

  if (!invoice) {
    return null;
  }

  const activeProducts = getActiveInvoiceProducts(invoice);

  return {
    issued: getInvoiceTotal(activeProducts),
    paid: invoice.paidInput,
    paidPercent: invoice.paid,
    currency: getInvoiceCurrency(activeProducts),
  };
}

function getProductsSummary(request: RequestAggregate): RequestProductsSummary {
  if (request.productsRequested.length === 0) {
    return { type: 'pending' };
  }

  return {
    type: 'list',
    items: request.productsRequested.map((product) => ({
      title: product.model || product.brandterm.name,
      qty: product.qty,
      unitsKey: product.qtyUnits,
    })),
  };
}

export function getRequestSummary(request: RequestAggregate): RequestCardSummary {
  const trackerStep = getTrackerStep(request);

  return {
    id: request.id,
    createdLabel: formatUnixDate(request.created),
    products: getProductsSummary(request),
    trackerStep,
    money: getMoneySummary(request),
    nextStepKey: getNextStepKey(request, trackerStep),
    managerName: request.manager.name,
  };
}
