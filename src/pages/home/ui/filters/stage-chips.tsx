import {
  REQUEST_STAGE_KEYS,
  STAGE_CHIP_COLORS,
  type RequestStageKey,
  type StageCounts,
} from '@shared/helpers';
import { IconFilter } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import {
  Badge,
  Button,
  Chip,
  Group,
  Indicator,
  Menu,
  Text,
  type MantineColor,
} from '@mantine/core';
import { useChipOverflow } from './use-chip-overflow';
import styles from './styles.module.css';

type StageChipsProps = {
  activeStage: RequestStageKey | 'all';
  onChange: (stage: RequestStageKey | 'all') => void;
  counts: StageCounts;
};

type ChipItem = {
  key: RequestStageKey | 'all';
  label: string;
  total: number;
  unread: number;
  color: MantineColor;
};

type ChipLabelProps = {
  label: string;
  total: number;
  unread: number;
};

function ChipLabel({ label, total, unread }: ChipLabelProps) {
  return (
    <Group gap={6} wrap="nowrap" align="center">
      <Text size="sm" fw={400}>
        {label}
      </Text>

      <Text size="xs" fw={700} c="dimmed">
        {total}
      </Text>

      {unread > 0 ? (
        <Badge size="xs" circle variant="filled" color="red">
          {unread}
        </Badge>
      ) : null}
    </Group>
  );
}

export default function StageChips({ activeStage, onChange, counts }: StageChipsProps) {
  const { t } = useTranslation();

  const items = [
    {
      key: 'all',
      label: t('home.stages.all'),
      total: counts.all.total,
      unread: counts.all.unread,
      color: 'blue.4',
    },
    ...REQUEST_STAGE_KEYS.map((stage) => ({
      key: stage,
      label: t(`home.stages.${stage}`),
      total: counts[stage].total,
      unread: counts[stage].unread,
      color: STAGE_CHIP_COLORS[stage],
    })),
  ].filter((el) => el.key === 'all' || el.total) as ChipItem[];

  const { containerRef, setMeasureRef, visibleCount } = useChipOverflow(items.length);
  const visibleItems = items.slice(0, visibleCount);
  const overflowItems = items.slice(visibleCount);
  const activeOverflowItem = overflowItems.find((item) => item.key === activeStage);

  return (
    <>
      <Group ref={containerRef} gap="xs" wrap="nowrap">
        {visibleItems.map((item) => (
          <Chip
            key={item.key}
            variant="outline"
            color={item.color}
            checked={item.key === activeStage}
            onChange={(checked) => checked && onChange(item.key)}
          >
            <ChipLabel label={item.label} total={item.total} unread={item.unread} />
          </Chip>
        ))}

        {overflowItems.length > 0 ? (
          <Menu position="bottom-start" withArrow shadow="md">
            <Menu.Target>
              <Indicator
                label={overflowItems.length}
                size={16}
                disabled={!activeOverflowItem}
                offset={4}
              >
                <Button
                  size="xs"
                  radius="xl"
                  variant={activeOverflowItem ? 'filled' : 'default'}
                  color={activeOverflowItem?.color}
                  leftSection={<IconFilter size={14} stroke={1.8} />}
                >
                  {activeOverflowItem ? activeOverflowItem.label : t('home.filters.button')}
                </Button>
              </Indicator>
            </Menu.Target>

            <Menu.Dropdown>
              {overflowItems.map((item) => (
                <Menu.Item key={item.key} onClick={() => onChange(item.key)}>
                  <ChipLabel label={item.label} total={item.total} unread={item.unread} />
                </Menu.Item>
              ))}
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </Group>

      <Group gap="xs" wrap="nowrap" className={styles.measure} aria-hidden>
        {items.map((item, index) => (
          <Chip key={item.key} variant="filled" color={item.color} rootRef={setMeasureRef(index)}>
            <ChipLabel label={item.label} total={item.total} unread={item.unread} />
          </Chip>
        ))}
      </Group>
    </>
  );
}
