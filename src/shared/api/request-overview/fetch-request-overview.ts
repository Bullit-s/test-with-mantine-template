import requestOverviewMock from '../../../../examples/request-overview-response.json';
import type { RequestOverviewResponse } from './types';

export async function fetchRequestOverview(): Promise<RequestOverviewResponse> {
  return Promise.resolve(requestOverviewMock as RequestOverviewResponse);
}
