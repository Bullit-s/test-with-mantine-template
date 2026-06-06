import type { RequestSummary } from '@shared/helpers';
import { RequestHeader, RequestMoney, RequestProducts, RequestStatusTracker } from '@shared/components';
import { Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { Paper, Stack, Text } from '@mantine/core';
import styles from './styles.module.css';

type RequestCardProps = {
  request: RequestSummary;
};

export default function RequestCard({ request }: RequestCardProps) {
  const { t } = useTranslation();

  return (
    <Link to="/orders/$id" params={{ id: request.id }} className={styles.cardLink}>
      <Paper withBorder radius="md" shadow="sm" p="lg" className={styles.card}>
        <Stack gap="md">
          <RequestHeader summary={request} />
          <RequestProducts products={request.products} />
          <RequestStatusTracker activeStep={request.trackerStep} />
          {request.money ? <RequestMoney money={request.money} /> : null}
          <Text size="sm" c="blue">
            {t(`orders.nextStep.${request.nextStepKey}`)}
          </Text>
        </Stack>
      </Paper>
    </Link>
  );
}
