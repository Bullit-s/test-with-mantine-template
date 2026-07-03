import { useMemo, useState } from 'react';
import { fetchRequestOverview } from '@shared/api/request-overview';
import {
  getKpiSummary,
  getManagerSummaries,
  getRecentActivity,
  getRequestOverviewSummary,
  getStageCounts,
  getStageShares,
  getUpcomingDeliveries,
  type RequestStageKey,
} from '@shared/helpers';
import { useQuery } from '@tanstack/react-query';
import { getRouteApi } from '@tanstack/react-router';

const routeApi = getRouteApi('/');

export function useRequestsQuery() {
  const query = useQuery({ queryKey: ['request-overview'], queryFn: fetchRequestOverview });
  const { q } = routeApi.useSearch();
  const [activeStage, setActiveStage] = useState<RequestStageKey | 'all'>('all');

  const rawRequests = query.data?.requests ?? [];

  const searchedRequests = useMemo(() => {
    if (!q) {
      return rawRequests;
    }

    const needle = q.trim().toLowerCase();

    return rawRequests.filter(
      (request) =>
        request.contractNumber.toLowerCase().includes(needle) ||
        request.brand.toLowerCase().includes(needle) ||
        request.product.toLowerCase().includes(needle)
    );
  }, [rawRequests, q]);

  const summaries = useMemo(
    () => searchedRequests.map(getRequestOverviewSummary),
    [searchedRequests]
  );

  const stageCounts = useMemo(() => getStageCounts(searchedRequests), [searchedRequests]);
  const stageShares = useMemo(() => getStageShares(stageCounts), [stageCounts]);

  const kpiSummary = useMemo(() => getKpiSummary(searchedRequests), [searchedRequests]);
  const recentActivity = useMemo(() => getRecentActivity(searchedRequests), [searchedRequests]);
  const upcomingDeliveries = useMemo(
    () => getUpcomingDeliveries(searchedRequests),
    [searchedRequests]
  );
  const managerSummaries = useMemo(
    () => getManagerSummaries(searchedRequests),
    [searchedRequests]
  );

  const filteredRequests = useMemo(
    () =>
      activeStage === 'all'
        ? summaries
        : summaries.filter((request) => request.stageKey === activeStage),
    [summaries, activeStage]
  );

  const footerSumRub = filteredRequests.reduce((sum, request) => sum + (request.sumRub ?? 0), 0);

  return {
    isLoading: query.isLoading,
    isError: query.isError,
    requests: filteredRequests,
    stageCounts,
    stageShares,
    activeStage,
    setActiveStage,
    footerCount: filteredRequests.length,
    footerSumRub,
    kpiSummary,
    recentActivity,
    upcomingDeliveries,
    managerSummaries,
  };
}
