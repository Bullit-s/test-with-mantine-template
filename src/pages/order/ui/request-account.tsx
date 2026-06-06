import { useTranslation } from 'react-i18next';
import { Stack, Text } from '@mantine/core';
import type { CustomerAccount } from '@shared/api/cabinet';
import DocumentCard from './document-card';

type RequestAccountProps = {
  account: CustomerAccount;
};

export default function RequestAccount({ account }: RequestAccountProps) {
  const { t } = useTranslation();

  const fields = [
    { label: t('request.account.buyer'), value: account.buyer },
    { label: t('request.account.inn'), value: account.inn },
    { label: t('request.account.kpp'), value: account.kpp },
    { label: t('request.account.bank'), value: account.bank },
    { label: t('request.account.rs'), value: account.rs },
    { label: t('request.account.bik'), value: account.bik },
    { label: t('request.account.address'), value: account.formalAddress },
  ].filter((field) => field.value);

  return (
    <DocumentCard title={t('request.documents.account')}>
      <Stack gap="xs">
        {fields.map((field) => (
          <Text key={field.label} size="sm">
            <Text span c="dimmed">
              {field.label}:{' '}
            </Text>
            {field.value}
          </Text>
        ))}
      </Stack>
    </DocumentCard>
  );
}
