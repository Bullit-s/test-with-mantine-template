import type { Invoice, InvoiceProduct } from './types';

export function getActiveInvoiceProducts(invoice: Pick<Invoice, 'invoiceProducts'>): InvoiceProduct[] {
  return invoice.invoiceProducts.filter((product) => product.active);
}

export function getInvoiceTotal(products: InvoiceProduct[]): number {
  return products.reduce((acc, product) => acc + product.line, 0);
}

export function getInvoiceCurrency(products: InvoiceProduct[]): string {
  return products[0]?.currency ?? 'RUB';
}
