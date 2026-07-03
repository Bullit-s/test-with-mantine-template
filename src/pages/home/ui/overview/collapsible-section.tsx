import type { ReactNode } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { useLocalStorage } from '@mantine/hooks';
import { Collapse, Group, Stack, Title, UnstyledButton } from '@mantine/core';

type CollapsibleSectionProps = {
  title: string;
  storageKey: string;
  children: ReactNode;
};

export default function CollapsibleSection({
  title,
  storageKey,
  children,
}: CollapsibleSectionProps) {
  const [opened, setOpened] = useLocalStorage({ key: storageKey, defaultValue: true });

  return (
    <Stack gap="md">
      <UnstyledButton onClick={() => setOpened((value) => !value)} w="fit-content">
        <Group gap={6} wrap="nowrap">
          <Title order={3}>{title}</Title>

          <IconChevronDown
            size={20}
            stroke={1.8}
            style={{ transform: opened ? 'rotate(180deg)' : undefined }}
          />
        </Group>
      </UnstyledButton>

      <Collapse expanded={opened}>
        <Stack gap="md">{children}</Stack>
      </Collapse>
    </Stack>
  );
}
