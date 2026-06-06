import { useQuery } from '@tanstack/react-query';
import { fetchCabinet } from '@shared/api/cabinet';
import { getRequestSummary } from '@shared/helpers';

export function useOrderPage(id: string) {
  const query = useQuery({
    queryKey: ['cabinet'],
    queryFn: fetchCabinet,
  });

  const request = query.data?.requests.find((item) => item.id === id);
  const summary = request ? getRequestSummary(request) : null;

  return {
    request,
    summary,
    isLoading: query.isLoading,
    isError: query.isError,
    notFound: !query.isLoading && !query.isError && !request,
  };
}
