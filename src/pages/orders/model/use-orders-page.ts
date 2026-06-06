import { fetchCabinet } from '@shared/api/cabinet';
import { getRequestSummary, type RequestSummary } from '@shared/helpers';
import { useQuery } from '@tanstack/react-query';

export function useOrdersPage() {
  const query = useQuery({
    queryKey: ['cabinet'],
    queryFn: fetchCabinet,
  });

  const requests: RequestSummary[] = query.data?.requests.map(getRequestSummary) ?? [];

  return {
    requests,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
