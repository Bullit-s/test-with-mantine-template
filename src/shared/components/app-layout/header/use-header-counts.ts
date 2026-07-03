import { useQuery } from '@tanstack/react-query';
import { fetchRequestOverview } from '@shared/api/request-overview';

export function useHeaderCounts() {
  const query = useQuery({ queryKey: ['request-overview'], queryFn: fetchRequestOverview });
  const requests = query.data?.requests ?? [];

  return {
    customer: query.data?.customer ?? null,
    home: {
      total: requests.length,
      unread: requests.filter((request) => request.unread).length,
    },
  };
}
