import { useState } from 'react';
import {
  getActiveInvoiceProducts,
  getInvoiceCurrency,
  getInvoiceTotal,
  type Invoice,
} from '@shared/api/cabinet';
import { formatMoney, formatUnixDate } from '@shared/lib/format';
import { useTranslation } from 'react-i18next';
import { Collapse, Stack, Text, UnstyledButton } from '@mantine/core';
import DocumentCard from './document-card';

type RequestInvoicesProps = {
  invoices: Invoice[];
};

function InvoiceCard({ invoice }: { invoice: Invoice }) {
  const { t } = useTranslation();
  const [opened, setOpened] = useState(false);
  const products = getActiveInvoiceProducts(invoice);
  const total = getInvoiceTotal(products);
  const currency = getInvoiceCurrency(products);
  const lastPayment = invoice.invoicePayments.at(-1);

  return (
    <DocumentCard title={t('request.documents.invoiceTitle', { number: invoice.invoiceNumber })}>
      <Stack gap="xs">
        <Text size="sm">
          {t('request.invoice.total', {
            amount: formatMoney(total, currency),
            percent: invoice.paid,
          })}
        </Text>

        {invoice.prepaid > 0 ? (
          <Text size="sm" c="dimmed">
            {t('request.invoice.prepaid', { percent: invoice.prepaid })}
          </Text>
        ) : null}

        {lastPayment ? (
          <Text size="sm" c="dimmed">
            {t('request.invoice.payment', {
              amount: formatMoney(lastPayment.paidInput, 'RUB'),
              date: formatUnixDate(lastPayment.paymentDate),
            })}
          </Text>
        ) : null}

        {invoice.actuality ? (
          <Text size="sm" c="dimmed">
            {invoice.actuality}
          </Text>
        ) : null}

        {invoice.shippingTime ? (
          <Text size="sm" c="dimmed">
            {t('request.invoice.shippingTime', { time: invoice.shippingTime })}
          </Text>
        ) : null}

        {products.length > 0 ? (
          <>
            <UnstyledButton onClick={() => setOpened((value) => !value)}>
              <Text size="sm" c="blue">
                {opened ? t('request.invoice.hideLines') : t('request.invoice.showLines')}
              </Text>
            </UnstyledButton>

            <Collapse expanded={opened}>
              <Stack gap="xs">
                {products.map((product) => (
                  <Text key={product.id} size="sm">
                    {t('request.invoice.line', {
                      title: product.title,
                      qty: product.qty,
                      amount: formatMoney(product.line, product.currency),
                    })}
                  </Text>
                ))}
              </Stack>
            </Collapse>
          </>
        ) : null}
      </Stack>
    </DocumentCard>
  );
}

export default function RequestInvoices({ invoices }: RequestInvoicesProps) {
  if (invoices.length === 0) {
    return null;
  }

  return (
    <Stack gap="md">
      {invoices.map((invoice) => (
        <InvoiceCard key={invoice.id} invoice={invoice} />
      ))}
    </Stack>
  );
}
