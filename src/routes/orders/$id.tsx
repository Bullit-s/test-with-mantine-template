import { createFileRoute } from '@tanstack/react-router';
import { OrderPage } from '@pages/order';

export const Route = createFileRoute('/orders/$id')({
  component: OrderPage,
});
