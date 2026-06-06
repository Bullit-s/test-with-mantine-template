import cabinetMock from '../../../../examples/cabinet-response.json';
import type { CustomerCabinet } from './types';

export async function fetchCabinet(): Promise<CustomerCabinet> {
  return Promise.resolve(cabinetMock as CustomerCabinet);
}
