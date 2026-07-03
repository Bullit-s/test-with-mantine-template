import { Group } from '@mantine/core';
import Search from '../../../../pages/home/ui/search';
import BrandLogo from './content/brand-logo';
import Contact from './content/contant';
import GlobalSearch from './content/global-search';
import HeaderNav from './content/nav';
import HeaderMobileNav from './content/nav/mobile-nav';
import Notifications from './content/notifications';
import UserProfile from './content/user-profile';

export const Header = () => {
  return (
    <>
      <Group h="100%" px="md" justify="space-between" wrap="nowrap" gap="lg">
        <Group gap="sm" wrap="nowrap" miw={0}>
          <HeaderMobileNav />

          <BrandLogo />

          <GlobalSearch />
        </Group>

        <HeaderNav />

        <Group gap="lg" wrap="nowrap" justify="flex-end" miw={0}>
          <Group gap={4} wrap="nowrap" visibleFrom="md" align="center">
            <Notifications />

            <Contact />
          </Group>

          <UserProfile />
        </Group>
      </Group>
    </>
  );
};
