import { useTranslation } from 'react-i18next';
import { Paper, Stack, Text } from '@mantine/core';
import type { RequestCardSummary } from '../../model/types';
import RequestCardHeader from '../request-card-header';
import RequestCardMoney from '../request-card-money';
import RequestCardProducts from '../request-card-products';
import RequestCardStatusTracker from '../request-card-status-tracker';
import styles from './styles.module.css';

type RequestCardProps = {
  request: RequestCardSummary;
};

export default function RequestCard({ request }: RequestCardProps) {
  const { t } = useTranslation();
  return (
    <Paper withBorder radius="md" shadow="sm" p="lg" className={styles.card}>
      <Stack gap="md">
        <RequestCardHeader request={request} />
        <RequestCardProducts products={request.products} />
        <RequestCardStatusTracker activeStep={request.trackerStep} />
        {request.money ? <RequestCardMoney money={request.money} /> : null}
        <Text size="sm" c="blue">
          {t(`orders.nextStep.${request.nextStepKey}`)}
        </Text>{' '}
      </Stack>
    </Paper>
  );
}
