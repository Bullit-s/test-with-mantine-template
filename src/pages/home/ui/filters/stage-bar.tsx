import { REQUEST_STAGE_KEYS, STAGE_CHIP_COLORS, type RequestStageKey } from '@shared/helpers';
import { Progress } from '@mantine/core';

type StageBarProps = {
  shares: Record<RequestStageKey, number>;
  activeStage: RequestStageKey | 'all';
  disable?: boolean;
};

export default function StageBar({ shares, activeStage, disable }: StageBarProps) {
  return (
    <Progress.Root size="lg" radius="xl">
      {REQUEST_STAGE_KEYS.filter((stage) => shares[stage] > 0).map((stage) => (
        <Progress.Section
          key={stage}
          value={shares[stage]}
          color={STAGE_CHIP_COLORS[stage]}
          opacity={!disable && (activeStage === 'all' || activeStage === stage) ? 1 : 0.35}
        />
      ))}
    </Progress.Root>
  );
}
