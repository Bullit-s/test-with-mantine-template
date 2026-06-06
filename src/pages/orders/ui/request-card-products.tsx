import { Text } from '@mantine/core';
import type { RequestProductsSummary } from '../model/types';
import { useProductsLabel } from './lib/use-order-labels';

type RequestCardProductsProps = {
  products: RequestProductsSummary;
};

export default function RequestCardProducts({ products }: RequestCardProductsProps) {
  const label = useProductsLabel(products);

  return (
    <Text size="sm" c="dark">
      {label}
    </Text>
  );
}
