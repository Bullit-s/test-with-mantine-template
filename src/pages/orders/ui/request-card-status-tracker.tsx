import { useTranslation } from 'react-i18next';
import { Stepper } from '@mantine/core';
import { TRACKER_STEP_KEYS, type TrackerStepIndex } from '../model/constants';

type RequestCardStatusTrackerProps = {
  activeStep: TrackerStepIndex;
};

export default function RequestCardStatusTracker({ activeStep }: RequestCardStatusTrackerProps) {
  const { t } = useTranslation();

  return (
    <Stepper active={activeStep}>
      {TRACKER_STEP_KEYS.map((key, index) => (
        <Stepper.Step key={key} label={t(`orders.status.${TRACKER_STEP_KEYS[index]}`)} />
      ))}
    </Stepper>
  );
}
