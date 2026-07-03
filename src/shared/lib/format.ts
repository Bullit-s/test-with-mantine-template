import i18n from '@/i18n';

export function formatUnixDate(seconds: number): string {
  if (!seconds) {
    return '—';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }).format(new Date(seconds * 1000));
}

export function formatMoney(
  amount: number,
  currency: string,
  options?: { maximumFractionDigits?: number }
): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    maximumFractionDigits: options?.maximumFractionDigits ?? 0,
  }).format(amount);
}

export function formatRelativeDays(seconds: number): string {
  const days = Math.max(0, Math.floor((Date.now() / 1000 - seconds) / 86_400));

  return i18n.t('common.daysAgo', { count: days });
}
