import { useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { TextInput, Tooltip } from '@mantine/core';

export default function GlobalSearch() {
  const { t } = useTranslation();
  const [value, setValue] = useState('');

  const handleChange = (next: string) => {
    setValue(next);
  };

  return (
    <Tooltip
      label={t('header.searchTooltip')}
      multiline
      w={200}
      withArrow
      transitionProps={{ duration: 200 }}
    >
      <TextInput
        value={value}
        onChange={(event) => handleChange(event.currentTarget.value)}
        placeholder={t('header.searchPlaceholder')}
        leftSection={<IconSearch size={16} stroke={1.8} />}
        radius="xl"
        variant="filled"
        w={220}
      />
    </Tooltip>
  );
}
