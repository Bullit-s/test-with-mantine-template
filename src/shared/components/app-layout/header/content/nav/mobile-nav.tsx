import { IconFileText, IconFolder, IconLayoutGrid, IconTruck } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Burger, Drawer, Flex, Stack, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useHeaderCounts } from '../../use-header-counts';
import BrandLogo from '../brand-logo';
import HeaderNavItem from './nav-item';

export default function HeaderMobileNav() {
  const { t } = useTranslation();
  const { home } = useHeaderCounts();
  const [opened, { open, close }] = useDisclosure(false);
  const comingSoon = t('common.comingSoon');

  return (
    <>
      <Burger
        opened={opened}
        onClick={open}
        size="sm"
        hiddenFrom="md"
        aria-label={t('header.menu')}
      />

      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Flex align="center" gap={8}>
            <BrandLogo />

            <Text size="md" fw={600} c="dark" textWrap="nowrap">
              {t('app.brand')}
            </Text>
          </Flex>
        }
        padding="md"
        size="xs"
      >
        <Stack gap={4}>
          <HeaderNavItem
            icon={<IconLayoutGrid size={18} stroke={1.8} />}
            label={t('home.title')}
            to="/"
            total={home.total}
            unread={home.unread}
            onClick={close}
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

          {/* <Divider my={4} /> */}

          {/* <Link to="/requests" className={styles.navItem} onClick={close}>
            {t('nav.requests')}
          </Link> */}
        </Stack>
      </Drawer>
    </>
  );
}
