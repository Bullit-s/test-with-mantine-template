import type { ReactNode } from 'react';
import { Paper, Stack, Title } from '@mantine/core';

type DocumentCardProps = {
  title: string;
  children: ReactNode;
};

export default function DocumentCard({ title, children }: DocumentCardProps) {
  return (
    <Paper withBorder radius="md" p="md">
      <Stack gap="sm">
        <Title order={5}>{title}</Title>
        {children}
      </Stack>
    </Paper>
  );
}
