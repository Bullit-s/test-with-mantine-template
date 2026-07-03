import type { ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Badge, Box, Group, Text, Tooltip } from '@mantine/core';
import styles from './styles.module.css';

type HeaderNavItemProps = {
  icon: ReactNode;
  label?: string;
  to?: string;
  total?: number;
  unread?: number;
  disabledHint?: string;
  onClick?: () => void;
};

export default function HeaderNavItem({
  icon,
  label,
  to,
  total,
  unread,
  disabledHint,
  onClick,
}: HeaderNavItemProps) {
  const content = (
    <>
      {icon}

      {label && (
        <Text size="sm" fw={500}>
          {label}
        </Text>
      )}

      {total !== undefined && (
        <Group gap={4} wrap="nowrap">
          <Text size="xs" fw={700} c="dimmed">
            {total}
          </Text>

          {!!unread && (
            <Badge size="xs" circle variant="filled" color="red">
              {unread}
            </Badge>
          )}
        </Group>
      )}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={styles.navItem}
        activeProps={{ className: `${styles.navItem} ${styles.navItemActive}` }}
        activeOptions={{ exact: true }}
        onClick={onClick}
      >
        {content}
      </Link>
    );
  }

  return (
    <Tooltip label={disabledHint} disabled={!disabledHint} withArrow>
      <Box className={`${styles.navItem} ${styles.navItemDisabled}`}>{content}</Box>
    </Tooltip>
  );
}
