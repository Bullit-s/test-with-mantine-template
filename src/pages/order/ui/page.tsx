import { useTranslation } from 'react-i18next';
import { Link, getRouteApi } from '@tanstack/react-router';
import { Alert, Anchor, Loader, Stack, Text } from '@mantine/core';
import {
  RequestHeader,
  RequestMoney,
  RequestProducts,
  RequestStatusTracker,
} from '@shared/components';
import { useOrderPage } from '../model';
import RequestAccount from './request-account';
import RequestInvoices from './request-invoices';
import RequestOrders from './request-orders';
import RequestUpds from './request-upds';

const routeApi = getRouteApi('/orders/$id');

export default function OrderPage() {
  const { t } = useTranslation();
  const { id } = routeApi.useParams();
  const { request, summary, isLoading, isError, notFound } = useOrderPage(id);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Alert color="red">{t('orders.loadError')}</Alert>;
  }

  if (notFound || !request || !summary) {
    return <Alert color="yellow">{t('request.notFound')}</Alert>;
  }

  return (
    <Stack gap="lg">
      <Anchor component={Link} to="/" size="sm">
        {t('request.back')}
      </Anchor>

      <RequestHeader summary={summary} />
      <RequestProducts products={summary.products} />
      <RequestStatusTracker activeStep={summary.trackerStep} />

      {summary.money ? <RequestMoney money={summary.money} /> : null}

      <Text size="sm" c="blue">
        {t(`orders.nextStep.${summary.nextStepKey}`)}
      </Text>

      <RequestInvoices invoices={request.invoices} />
      <RequestOrders orders={request.orders} />
      <RequestUpds upds={request.upds} />

      {request.customerAccount ? <RequestAccount account={request.customerAccount} /> : null}
    </Stack>
  );
}
