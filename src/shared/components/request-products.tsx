import { useRequestProductsLabel, type RequestProductsSummary } from '@shared/helpers';
import { Text } from '@mantine/core';

type RequestProductsProps = {
  products: RequestProductsSummary;
};

export default function RequestProducts({ products }: RequestProductsProps) {
  const label = useRequestProductsLabel(products);

  return (
    <Text size="sm" c="dark">
      {label}
    </Text>
  );
}
