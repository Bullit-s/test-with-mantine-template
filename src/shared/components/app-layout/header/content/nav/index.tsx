import { IconFileText, IconFolder, IconLayoutGrid, IconTruck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Group } from '@mantine/core';
import { useHeaderCounts } from '../../use-header-counts';
import HeaderNavItem from './nav-item';

export default function HeaderNav() {
  const { t } = useTranslation();
  const { home } = useHeaderCounts();
  const comingSoon = t('common.comingSoon');

  return (
    <Group gap={4} wrap="nowrap" visibleFrom="md">
      <HeaderNavItem
        icon={<IconLayoutGrid size={18} stroke={1.8} />}
        label={t('home.title')}
        to="/"
        total={home.total}
        unread={home.unread}
      />

      <HeaderNavItem
        icon={<IconTruck size={18} stroke={1.8} />}
        label={t('header.nav.orders')}
        to="/requests"
        onClick={close}
      />

      <HeaderNavItem
        icon={<IconFileText size={18} stroke={1.8} />}
        label={t('header.nav.proposals')}
        disabledHint={comingSoon}
      />

      <HeaderNavItem
        icon={<IconFolder size={18} stroke={1.8} />}
        label={t('header.nav.documents')}
        disabledHint={comingSoon}
      />
    </Group>
  );
}
