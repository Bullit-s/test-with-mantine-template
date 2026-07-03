import { createTheme, Stepper } from '@mantine/core';
import styles from './theme.module.css';

export const theme = createTheme({
  components: {
    Stepper: Stepper.extend({
      defaultProps: {
        color: 'green',
        size: 'sm',
      },
      classNames: {
        root: styles.stepperRoot,
        step: styles.stepperStep,
        stepIcon: styles.stepperStepIcon,
        stepCompletedIcon: styles.stepperStepCompletedIcon,
        stepLabel: styles.stepperStepLabel,
        separator: styles.stepperSeparator,
      },
    }),
  },
});
