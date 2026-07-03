import { IconHeadset, IconMessageCircle, IconPhoneCall } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Group, Menu, UnstyledButton } from '@mantine/core';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <Menu position="bottom-end" withArrow shadow="md">
      <Menu.Target>
        <UnstyledButton>
          <Group gap={6} wrap="nowrap" c="gray.6">
            <IconHeadset size={24} stroke={1.8} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconPhoneCall size={16} stroke={1.8} />} disabled>
          {t('header.contact.callManager')}
        </Menu.Item>
        <Menu.Item leftSection={<IconMessageCircle size={16} stroke={1.8} />} disabled>
          {t('header.contact.chat')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
