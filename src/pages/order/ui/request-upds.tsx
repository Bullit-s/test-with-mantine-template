import type { Upd } from '@shared/api/cabinet';
import { formatUnixDate } from '@shared/lib/format';
import { useTranslation } from 'react-i18next';
import { Stack, Text } from '@mantine/core';
import DocumentCard from './document-card';

type RequestUpdsProps = {
  upds: Upd[];
};

export default function RequestUpds({ upds }: RequestUpdsProps) {
  const { t } = useTranslation();

  if (upds.length === 0) {
    return null;
  }

  return (
    <Stack gap="md">
      {upds.map((upd) => (
        <DocumentCard
          key={upd.id}
          title={t('request.documents.updTitle', {
            number: upd.number,
            date: formatUnixDate(upd.date),
          })}
        >
          <Text size="sm" c="dimmed">
            {t('request.upd.downloadHint')}
          </Text>
        </DocumentCard>
      ))}
    </Stack>
  );
}
