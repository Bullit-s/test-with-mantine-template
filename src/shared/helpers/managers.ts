import type { RequestOverviewItem } from '@shared/api/request-overview';

export type ManagerContact = {
  name: string;
  role: string;
  phone: string;
  email: string;
};

export const MANAGER_DIRECTORY: Record<string, ManagerContact> = {
  'Анна Петрова': {
    name: 'Анна Петрова',
    role: 'Менеджер по снабжению',
    phone: '+7 (495) 123-45-01',
    email: 'a.petrova@snabsystem.ru',
  },
  'Ольга Кузнецова': {
    name: 'Ольга Кузнецова',
    role: 'Менеджер по снабжению',
    phone: '+7 (495) 123-45-02',
    email: 'o.kuznetsova@snabsystem.ru',
  },
  'Сергей Иванов': {
    name: 'Сергей Иванов',
    role: 'Менеджер по снабжению',
    phone: '+7 (495) 123-45-03',
    email: 's.ivanov@snabsystem.ru',
  },
};

export type ManagerSummary = ManagerContact & { activeRequests: number };

export function getManagerSummaries(requests: RequestOverviewItem[]): ManagerSummary[] {
  const counts = new Map<string, number>();

  for (const request of requests) {
    if (request.isCancelled) {
      continue;
    }

    counts.set(request.managerName, (counts.get(request.managerName) ?? 0) + 1);
  }

  return Object.values(MANAGER_DIRECTORY)
    .map((manager) => ({ ...manager, activeRequests: counts.get(manager.name) ?? 0 }))
    .sort((a, b) => b.activeRequests - a.activeRequests);
}
