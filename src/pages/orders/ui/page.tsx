import { useTranslation } from 'react-i18next';
import { Alert, Loader, Stack, Text, Title } from '@mantine/core';
import { useOrdersPage } from '../model';
import RequestCard from './request-card';

export default function OrdersPage() {
  const { t } = useTranslation();
  const { requests, isLoading, isError } = useOrdersPage();

  return (
    <>
      {isLoading ? <Loader /> : null}

      {!isLoading && isError ? <Alert color="red">{t('orders.loadError')}</Alert> : null}

      {!isLoading && !isError && (
        <Stack gap="lg">
          <Title order={2}>{t('orders.title')}</Title>

          {requests.length === 0 ? (
            <Text c="dimmed">{t('orders.empty')}</Text>
          ) : (
            <Stack gap="md">
              {requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
}
