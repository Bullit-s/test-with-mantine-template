import { TRACKER_STEP_KEYS, type TrackerStepIndex } from '@shared/helpers';
import { useTranslation } from 'react-i18next';
import { Stepper } from '@mantine/core';

type RequestStatusTrackerProps = {
  activeStep: TrackerStepIndex;
};

export default function RequestStatusTracker({ activeStep }: RequestStatusTrackerProps) {
  const { t } = useTranslation();

  return (
    <Stepper active={activeStep}>
      {TRACKER_STEP_KEYS.map((key, index) => (
        <Stepper.Step key={key} label={t(`orders.status.${TRACKER_STEP_KEYS[index]}`)} />
      ))}
    </Stepper>
  );
}
