import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';
import { TextInput } from '@mantine/core';

export default function Search() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState('');

  const handleChange = (next: string) => {
    setValue(next);

    if (location.pathname === '/') {
      void navigate({
        to: '/',
        search: { q: next || undefined },
        replace: false,
        resetScroll: false,
      });
    }
  };

  useEffect(() => {
    void navigate({
      to: '/',
      search: {},
      replace: false,
      resetScroll: false,
    });
  }, []);

  return (
    <TextInput
      value={value}
      onChange={(event) => handleChange(event.currentTarget.value)}
      placeholder={t('home.searchRequest')}
      leftSection={<IconSearch size={16} stroke={1.8} />}
      radius="xl"
      variant="filled"
      w={220}
    />
  );
}
