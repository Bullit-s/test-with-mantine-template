import { useQuery } from '@tanstack/react-query';
import { fetchCabinet } from '@shared/api/cabinet';
import { getRequestSummary } from './get-request-summary';
import type { RequestCardSummary } from './types';

export function useOrdersPage() {
  const query = useQuery({
    queryKey: ['cabinet'],
    queryFn: fetchCabinet,
  });

  const requests: RequestCardSummary[] =
    query.data?.requests.map(getRequestSummary) ?? [];

  return {
    requests,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
