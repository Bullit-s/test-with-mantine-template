import { useTranslation } from 'react-i18next';
import { Stack, Text } from '@mantine/core';
import type { Order } from '@shared/api/cabinet';
import { formatUnixDate } from '@shared/lib/format';
import DocumentCard from './document-card';

type RequestOrdersProps = {
  orders: Order[];
};

export default function RequestOrders({ orders }: RequestOrdersProps) {
  const { t } = useTranslation();

  if (orders.length === 0) {
    return null;
  }

  return (
    <Stack gap="md">
      {orders.map((order) => {
        const shipping = order.shippings.at(-1);

        return (
          <DocumentCard key={order.id} title={t('request.documents.order')}>
            <Stack gap="xs">
              <Text size="sm">
                {t('request.order.status', {
                  status: t(`request.order.received.${order.received}`, {
                    defaultValue: order.received,
                  }),
                })}
              </Text>

              {order.postDate ? (
                <Text size="sm" c="dimmed">
                  {t('request.order.ordered', { date: formatUnixDate(order.postDate) })}
                </Text>
              ) : null}

              {shipping?.shippingGroup.postDate ? (
                <Text size="sm" c="dimmed">
                  {t('request.order.shipped', {
                    date: formatUnixDate(shipping.shippingGroup.postDate),
                  })}
                </Text>
              ) : null}

              {shipping?.shippingGroup.gtd ? (
                <Text size="sm" c="dimmed">
                  {t('request.order.gtd', { gtd: shipping.shippingGroup.gtd })}
                </Text>
              ) : null}
            </Stack>
          </DocumentCard>
        );
      })}
    </Stack>
  );
}
