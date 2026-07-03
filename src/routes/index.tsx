import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@pages/home';

type HomeSearch = {
  q?: string;
};

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): HomeSearch => ({
    q: typeof search.q === 'string' ? search.q : undefined,
  }),
  component: HomePage,
});
