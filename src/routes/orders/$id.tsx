import { OrderPage } from '@pages/order';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/orders/$id')({
  component: () => <OrderPage />,
});
