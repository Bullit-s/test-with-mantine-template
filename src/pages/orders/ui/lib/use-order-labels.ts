import { useTranslation } from 'react-i18next';
import type { RequestProductsSummary } from '../../model/types';

export function useProductsLabel(products: RequestProductsSummary): string {
  const { t } = useTranslation();

  if (products.type === 'pending') {
    return t('orders.products.pending');
  }

  return products.items
    .map((item) => {
      const units = t(`orders.units.${item.unitsKey}`, { defaultValue: item.unitsKey });

      return t('orders.products.item', {
        title: item.title,
        qty: item.qty,
        units,
      });
    })
    .join(', ');
}
