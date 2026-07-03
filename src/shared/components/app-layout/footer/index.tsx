import { useTranslation } from 'react-i18next';
import { Anchor, Divider, Group, Stack, Text } from '@mantine/core';

export const Footer = () => {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <Stack gap={0}>
      <Divider />

      <Group justify="space-between" px="md" py="xs" wrap="nowrap">
        <Text size="xs" c="dimmed" truncate="end">
          {t('footer.copyright', { year, brand: t('app.brand') })}
        </Text>

        <Group gap="md" wrap="nowrap">
          <Anchor href="tel:+78005002104" size="xs" c="dimmed" underline="hover">
            {t('footer.supportPhone')}
          </Anchor>

          <Anchor
            href="mailto:info@snabsystem.ru"
            size="xs"
            c="dimmed"
            underline="hover"
            visibleFrom="xs"
          >
            {t('footer.supportEmail')}
          </Anchor>
        </Group>
      </Group>
    </Stack>
  );
};
